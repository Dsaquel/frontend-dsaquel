<template>
  <div class="container">
    <div v-for="article in articles" class="article" :key="article">
      <h4>{{ article.about }}</h4>
      <p>{{ article.price }} $</p>
      <v-btn @click="getNewArticle(article.about, article.price)"
        >Ajouter au panier</v-btn
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleChoice",
  props: {
    articles: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getNewArticle: function (name, price) {
      this.$emit("getNewArticle", name, price);
    },
  },
};
</script>
