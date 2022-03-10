<template>
  <v-container>
    <v-row class="center">
      <v-card
        v-for="article in articles"
        :key="article"
        class="mx-auto my-12"
        max-width="374"
      >
        <v-card-title>{{ article.about }}</v-card-title>
        <v-card-text>
          <div class="my-4 text-subtitle-1">{{ article.price }} $</div>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-card-actions>
          <v-btn
            color="deep-purple lighten-2"
            text
            @click="getNewArticle(article.about, article.price, article)"
          >
            Acheter
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-btn
        v-if="toggleNewCard == false"
        @click="toggleNewCard = !toggleNewCard"
        class="mx-2"
        fab
        dark
        color="indigo"
      >
        <v-icon dark> mdi-plus </v-icon>
      </v-btn>

      <!-- TODO:New component -->

      <v-card v-else elevation="2">
        <v-btn icon fab @click="toggleNewCard = !toggleNewCard">
          <v-icon>mdi-minus</v-icon>
        </v-btn>
        <v-card-title>Creer un article !</v-card-title>
        <v-container>
          <v-text-field
            label="Nom de l'article"
            hide-details="auto"
            v-model="newArticleName"
          />
          <v-text-field label="Prix" type="number" v-model="newArticlePrice" />
        </v-container>
        <v-card-actions>
          <v-btn color="success" @click="createNewArticle"> Creer</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AllArticle",
  emits: ["getNewArticle", "createNewArticle"],
  data() {
    return {
      toggleNewCard: false,
    };
  },
  watch: {},
  props: {
    articles: {
      type: Array,
      required: true,
    },
    newArticleName: {
      type: String,
      default: "Toto",
    },
    newArticlePrice: {
      type: Number,
      default: 32,
    },
  },
  methods: {
    getNewArticle: function (name, price) {
      this.$emit("getNewArticle", name, price);
    },
    createNewArticle: function () {
      this.$emit("createNewArticle", this.newArticleName, this.newArticlePrice);
    },
  },
};
</script>
