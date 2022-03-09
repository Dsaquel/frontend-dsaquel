<template>
  <RecapCardArticle
    :recapArticle="recapArticle"
    @deleteArticle="deleteArticle"
  />
  
</template>

<script>
import RecapCardArticle from "../components/RecapCardArticle.vue";
import store from "../store/index.js";
import { mapState } from "vuex";

export default {
  name: "about",
  components: {
    RecapCardArticle,
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
