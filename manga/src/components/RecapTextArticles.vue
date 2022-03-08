<template>
  <div v-if="recapArticle.length > 0">
    Article ajouter :
    <strong v-for="article in recapArticle" :key="article"
      >{{ article.about
      }}<strong v-if="article.number !== 0">({{ article.number }})</strong>,
    </strong>
  </div>
  <h1>{{ totalPrice }} e</h1>
  
</template>

<script>
export default {
  name: "RecapTextArticles",
  props: {
    recapArticle: {
      type: Array,
      required: true,
    },
    totalPrice: {
      type: Number,
      default: 0,
      required: true,
    }
  },
    data(){return{}},
}
</script>