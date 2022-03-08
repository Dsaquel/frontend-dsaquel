<template>
  <div class="createArticle">
    <h3>Creer un article !</h3>
    <input type="text" v-model="newArticleName" />
    <input type="number" v-model="newArticlePrice" />
    <v-btn @click="createNewArticle">Creer</v-btn>
  </div>
</template>

<script>
export default {
  name: "CreateArticle",
  inheritAttrs: false,
  methods: {
    createNewArticle: function () {
      this.$emit("createNewArticle", this.newArticleName, this.newArticlePrice);
    },
  },
  props: {
    newArticleName: {
      type: String,
      default: "Toto",
    },
    newArticlePrice: {
      type: Number,
      default: 32,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.createArticle {
  margin: auto;
  width: min-content;
  padding: 10px;
  border: 2px solid black;
}
</style>
