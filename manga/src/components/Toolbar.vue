<template>
  <v-toolbar dense>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

    <v-toolbar-title>Title</v-toolbar-title>

    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon href="/Panier">
      <v-icon>mdi-cart</v-icon>
    </v-btn>

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
  components: {store},
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
    toggleBudget: true,
  }),
  props: {
    budget: {
      required: true,
      default: null,
    },
    watch: {
      group() {
        this.drawer = false;
      },
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