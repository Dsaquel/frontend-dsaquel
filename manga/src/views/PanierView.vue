<template>
  <RecapCardArticle
    :recapArticle="recapArticle"
    @deleteArticle="deleteArticle"
  />
</template>

<script>
import RecapTextArticles from "../components/RecapTextArticles.vue";
import RecapCardArticle from "../components/RecapCardArticle.vue";
import store from "../store/index.js";
import { mapState } from "vuex";

export default {
  name: "about",
  components: {
    RecapTextArticles,
    RecapCardArticle,
  },
  methods: {
    deleteArticle : function (id, price, number) {
      store.commit('deleteArticle', {id, price, number})
    }
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
