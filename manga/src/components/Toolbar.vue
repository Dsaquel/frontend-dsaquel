<template>
  <v-toolbar dense>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

    <v-toolbar-title>Title</v-toolbar-title>

    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on"> Button </v-btn>
      </template>
      <span>Tooltip</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-on="on" v-bind="attrs">
          <v-icon>mdi-cart</v-icon>
        </v-btn>
      </template>
      <v-card v-model="group">
        <v-container>
          <h1>Aucun article au panier</h1>
          <v-card-title>montant: {{ totalPrice }} $</v-card-title>
          <router-link to="/panier">Consulter le panier</router-link>
        </v-container>
      </v-card>
    </v-tooltip>

    <v-btn icon>
      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-toolbar>
  <v-navigation-drawer v-model="drawer" absolute temporary>
    <h3>C'est ici que tu peux ajouter de l'argent pour acheter des articles</h3>
    <v-card v-model="group">
      <v-text-field
        type="number"
        hint="Fixer un budget pour ajouter des articles !"
        v-model="budget"
      >
      </v-text-field>
      <v-card-actions>
        <v-btn @click="newBudget"> Ajouter un budget </v-btn>
      </v-card-actions>
    </v-card>
    <h4 class="d-flex justify-center">Porte-monnaie: {{ budget }}$</h4>
  </v-navigation-drawer>
  <v-breadcrumbs
    class="d-flex justify-center"
    :items="items"
    divider="/"
  ></v-breadcrumbs>
</template>

<script>
import { mapState } from "vuex";
import store from "../store/index.js";

export default {
  emits: ["showAppBar", "newBudget"],
  components: { store },
  data: () => ({
    items: [
      {
        text: "Home",
        disabled: false,
        href: "/home",
      },
    ],
    drawer: false,
    group: null,
  }),
  props: {
    budget: {
      required: true,
      default: null,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  computed: {
    ...mapState(["totalPrice"]),
  },
  methods: {
    showAppBar: function () {
      this.$emit("showAppBar");
    },
    newBudget: function () {
      this.$emit("newBudget", this.budget);
    },
  },
};
</script>