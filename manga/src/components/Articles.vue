<template>
  <ArticleChoice @getNewArticle="getArticle" :articles="articles" />
  <RecapTextArticles :recapArticle="recapArticle" :totalPrice="totalPrice" />
  <TotalPrice :totalPrice="totalPrice"
    ><template v-if="totalPrice > 0" v-slot:totalPrice>
      <div class="center">
        <h1>{{ totalPrice }} euro</h1>
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
</template>

<script>
import CreateArticle from "../components/CreateArticle.vue";
import ArticleChoice from "../components/ArticleChoice.vue";
import RecapTextArticles from "../components/RecapTextArticles.vue";
import TotalPrice from "../components/TotalPrice.vue";
import store from "../store/index.js";
import { mapState } from "vuex";
export default {
  components: {
    CreateArticle,
    ArticleChoice,
    RecapTextArticles,
    TotalPrice,
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
    };
  },
  watch: {
    "recapArticle.length": function () {},
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
  methods: {
    getArticle: function (name, price) {
      store.commit("getArticle", { name, price });
    },
    createArticle: function (name, price) {
      this.articles.push({
        id: function () {
          store.getters("getLastId");
        },
        about: name,
        price: price,
        number: 0,
      });
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
input[type="number"],
input[type="text"] {
  background-color: #5271ff;
  margin: 5px;
  padding: 4px;
}
input:focus {
  color: #fff;
  background-color: blue;
  border: 2px solid #fff;
}
</style>