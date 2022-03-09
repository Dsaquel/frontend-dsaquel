<template>
  <RecapCardArticle
    :recapArticle="recapArticle"
    @deleteArticle="deleteArticle"
  />
  <TotalPrice :totalPrice="totalPrice">
    <template v-slot:totalPrice v-if="totalPrice > 0">
      <div class="center">
        <h1>{{ totalPrice }} euro</h1>
        <router-link to="../">Rajouter des articles</router-link>
      </div>
    </template>
    <template v-slot:text v-else>
      <div class="center">
        <h1>Plus aucun article dans votre panier</h1>
        <router-link to="../">home</router-link>
      </div>
    </template>
  </TotalPrice>
</template>

<script>
import RecapCardArticle from "../components/RecapCardArticle.vue";
import TotalPrice from "../components/TotalPrice.vue";
import store from "../store/index.js";
import { mapState } from "vuex";

export default {
  name: "about",
  components: {
    RecapCardArticle,
    TotalPrice,
  },
  methods: {
    deleteArticle: function (id, price, numberLeft) {
      store.commit("deleteArticle", { id, price, numberLeft });
    },
  },
  computed: {
    ...mapState([
      "secondId",
      "recapArticle",
      "totalPrice",
      "newName",
      "newPrice",
      "numberOfArticle",
    ]),
  },
};
</script>
