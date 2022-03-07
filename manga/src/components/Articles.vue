<template>
  <ArticleChoice @getNewArticle="getArticle" :articles="articles"/>
  <h2 v-if="recapArticle.length > 0" >
    Article ajouter :
    <strong v-for="article in recapArticle" :key="article"
      >{{ article.about
      }}<strong v-if="article.number !== 0">({{ article.number }})</strong>,
    </strong>
  </h2>
  <h1>{{ totalPrice }} e</h1>
  <div v-if="recapArticle.length > 0" class="container">
    <div
      class="article"
      v-for="articleAdded in recapArticle"
      :key="articleAdded"
    >
      <h4>{{ articleAdded.about }}</h4>
      <small class="floatTopRight"> quantité : {{ articleAdded.number }}</small>
      <p>{{ articleAdded.price }} $</p>
      <small v-show="false">{{ articleAdded.id }}</small>
      <v-btn
        @click="
          deleteArticle(
            articleAdded.id,
            articleAdded.price,
            articleAdded.number
          )
        "
      >
        Retirer article
      </v-btn>
    </div>
  </div>

  <CreateArticle @createNewArticle="createArticle" :newArticleName="newName" :newArticlePrice="newPrice" />
</template>

<script>
import CreateArticle from "../components/CreateArticle.vue";
import ArticleChoice from "../components/ArticleChoice.vue";
export default {
  components: {
    CreateArticle, ArticleChoice
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
      secondId: 0,
      recapArticle: [],
      totalPrice: 0,
      newName: "Micro",
      newPrice: 60,
      numberOfArticle: 0,
    };
  },
  watch: {
    "recapArticle.length": function () {},
  },
  methods: {
    getArticle: function (name, price) {
      let isNameMatched = this.recapArticle.find(function (article) {
        return article.about === name;
      });
      if (isNameMatched) {
        isNameMatched.number++;
      } else {
        this.recapArticle.push({
          id: this.secondId++,
          about: name,
          price: price,
          number: 1,
        });
      }
      this.totalPrice += Number(price);
    },
    deleteArticle: function (id, price, numberLeft) {
      if (numberLeft > 1) {
        const article = this.recapArticle.find((article) => article.id == id);
        article.number--;
      } else {
        //removing article from DOM
        this.recapArticle = this.recapArticle.filter((arr) => arr.id != id);
      }
      this.totalPrice -= Number(price);
    },
    createArticle: function (name, price) {
      this.articles.push({
        id: this.secondId++,
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

h1 {
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