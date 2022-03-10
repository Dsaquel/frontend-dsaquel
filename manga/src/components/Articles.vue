<template>
  <ArticleChoice @getNewArticle="getArticle" :articles="articles" />
  <RecapTextArticles :recapArticle="recapArticle" :totalPrice="totalPrice" />
  <h3 class="error" v-if="error">
    Erreur de budget, veuillez augmenté votre budget pour ajouter l'article
  </h3>
  <TotalPrice
    ><template :totalPrice="totalPrice" v-if="totalPrice > 0" v-slot:totalPrice>
      <div class="center">
        <h1>montant: {{ totalPrice }} $</h1>
        <router-link to="/panier">Consulter le panier</router-link>
      </div>
    </template>
    <template v-else v-slot:text>
      <div class="center">
        <h1>Aucun article au panier</h1>
      </div>
    </template>
  </TotalPrice>
  <CreateArticle
    @createNewArticle="createArticle"
    :newArticleName="newName"
    :newArticlePrice="newPrice"
  />
  <v-container>
    <v-btn @click="toggleBudget = !toggleBudget"
      >Ouvrir la modification de budget</v-btn
    >
    <v-container v-show="toggleBudget">
      <Budget :budget="budget" @newBudget="newBudget" />
    </v-container>

    <h3 v-if="budget !== null">Il vous reste {{ budget }}$</h3>
    <h3 v-else>Pour ajouter des articles veuillez configurer votre budget</h3>
  </v-container>
</template>

<script>
import CreateArticle from "../components/CreateArticle.vue";
import ArticleChoice from "../components/ArticleChoice.vue";
import RecapTextArticles from "../components/RecapTextArticles.vue";
import TotalPrice from "../components/TotalPrice.vue";
import Budget from "../components/Budget.vue";
import store from "../store/index.js";
import { mapGetters, mapState } from "vuex";
export default {
  components: {
    CreateArticle,
    ArticleChoice,
    RecapTextArticles,
    TotalPrice,
    Budget,
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
          this.getLastId
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

<style>
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  overflow: unset;
}
.article {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-width: 5px;
  border-style: solid;
  border-top-color: #5271ff;
  border-bottom-color: #ffbd59;
  border-left-color: #5271ff;
  border-right-color: #ffbd59;
  text-align: center;
  margin: 5px;
  border-radius: 10px;
}
.floatTopRight {
  display: inline-block;
  right: 0;
}
.center {
  text-align: center;
}

.error {
  display: flex;
  justify-content: center;
  font-family: "Times New Roman", Times, serif;
  border: 2px solid red;
  color: red;
}
</style>