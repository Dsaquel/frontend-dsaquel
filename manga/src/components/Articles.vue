<template>
  <Toolbar :budget="budget" @newBudget="newBudget" :totalPrice="totalPrice" />
  <AllArticle
    @getNewArticle="getArticle"
    :articles="articles"
    @createNewArticle="createArticle"
    :newArticleName="newName"
    :newArticlePrice="newPrice"
  />
  <RecapTextArticles :recapArticle="recapArticle" :totalPrice="totalPrice" />

  <v-alert type="error" v-if="error">
    Erreur de budget, veuillez augmenté votre budget pour ajouter l'article
  </v-alert>
  
</template>

<script>
import AllArticle from "./articles/AllArticle.vue";
import RecapTextArticles from "../components/articles/RecapTextArticles.vue";
import TotalPrice from "../components/TotalPrice.vue";
import Toolbar from "../components/Toolbar.vue";
import store from "../store/index.js";
import { mapGetters, mapState } from "vuex";
export default {
  components: {
    AllArticle,
    RecapTextArticles,
    TotalPrice,
    Toolbar,
    store,
  },
  data() {
    let id = 0;
    return {
      articles: [
        { id: id++, about: "Brosse à dent", price: 3, number: 1 },
        { id: id++, about: "Sèche cheveux", price: 53, number: 1 },
        { id: id++, about: "babybel x20", price: 4, number: 1 },
        { id: id++, about: "Ordinateur puissant", price: 1200, number: 1 },
      ],
      toggleBudget: false,
    };
  },
  watch: {
    budget: function () {
      store.state.error = false;
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
      "budget",
      "error",
    ]),
    ...mapGetters(["getLastId"]),
  },
  methods: {
    getArticle: function (name, price) {
      store.commit("getArticle", { name, price });
    },
    createArticle: function (name, price) {
      this.articles.push({
        id: function () {
          this.getLastId;
        },
        about: name,
        price: price,
        number: 0,
      });
    },
    newBudget: (budget) => {
      store.commit("newBudget", budget);
    },
  },
};
</script>


<style lang="scss">
.center {
  align-items: center;
}
</style>