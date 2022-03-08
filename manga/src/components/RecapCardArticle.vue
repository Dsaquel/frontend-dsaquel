<template>
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
</template>

<script>
export default {
  props: {
    recapArticle: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    deleteArticle: function (id, price, number) {
      this.$emit("deleteArticle", id, price, number);
    },
  },
};
</script>