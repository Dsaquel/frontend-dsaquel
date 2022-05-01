<template>
  <v-row align="center">
    <div class="title">
      Pick your manga favorites or select one who have your gender favorites ;)
    </div>
    <v-col v-for="manga in pickMangas" :key="manga.id" cols="12" md="4">
      <v-card class="d-flex align-center">
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-img
              v-on="on"
              class="blur"
              v-bind="attrs"
              :src="manga.image.jpg.medium"
              @click="sendPicking(manga.id, manga.title.default)"
              style="cursor: pointer"
            />
          </template>
          <v-card>
            <v-card-title>Information {{ manga.title.default }}</v-card-title>
            <v-card-text>
              <p>
              author:
              <template v-for="author in manga.authors">
                {{ author.name }}
                <template v-if="manga.authors.slice(-1)[0] !== author">
                  |
                </template>
              </template>
              </p>
              <p>score: {{ manga.score }}</p>
              <br />
            </v-card-text>
            <v-card-text
              >genres:
              <template v-for="genre in manga.genres">
                {{ genre.name }}
                <template v-if="manga.genres.slice(-1)[0] !== genre">
                  |
                </template>
              </template>
            </v-card-text>
          </v-card>
        </v-tooltip>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'PickManga',
  data: () => ({
    isBlur: false,
    mangas: [
      {
        id: 2,
        title: 'Berserk',
        score: '10 (personnal)',
        author: 'Miura, Kentarou',
        image: 'https://cdn.myanimelist.net/images/manga/1/157897.jpg',
        themes: ['Gore', 'Military', 'Survival']
      },
      {
        id: 16765,
        title: 'Kingdom',
        score: '10 (personnal)',
        author: 'Hara, Yasuhisa',
        image: 'https://cdn.myanimelist.net/images/manga/2/171872.jpg',
        themes: ['Historical', 'Military']
      },
      {
        id: 656,
        title: 'Vagabond',
        score: '10 (personnal)',
        author: 'Inoue, Takehiko',
        image: 'https://cdn.myanimelist.net/images/manga/1/259070.jpg',
        themes: [' Action', 'Adventure', 'Drama', 'Historical', 'Samurai']
      },
      {
        id: 1,
        title: 'Monster',
        score: '9.12',
        author: 'Urasawa, Naoki',
        image: 'https://cdn.myanimelist.net/images/manga/3/258224.jpg',
        themes: ['Drama', 'Mystery', 'Adult Cast', 'Psychological']
      },
      {
        id: 13,
        title: 'One piece',
        score: '9.18',
        author: 'Oda, Eiichiro',
        image: 'https://cdn.myanimelist.net/images/manga/2/253146.jpg',
        themes: ['Action', 'Adventure', 'Fantasy']
      },
      {
        id: 78523,
        title: 'ReLIFE',
        score: '8.66',
        author: 'Yayoi, Sou',
        image: 'https://cdn.myanimelist.net/images/manga/2/171573.jpg',
        themes: ['School', 'Comedy', 'Drama', 'Romance']
      },
      {
        id: 42451,
        title: 'Horimiya',
        score: '8.45',
        author: 'Hagiwara, Daisuke',
        image: 'https://cdn.myanimelist.net/images/manga/2/245008.jpg',
        themes: ['Comedy', 'Romance', 'Slice of Life']
      },
      {
        id: 7,
        title: 'Hajime no Ippo',
        score: '8.67',
        author: 'Morikawa, George',
        image: 'https://cdn.myanimelist.net/images/manga/2/250313.jpg',
        themes: ['Action', 'Comedy', 'Drama', 'Sports']
      },
      {
        id: 50265,
        title: 'Spy x Family',
        score: '9.09',
        author: 'Endou, Tatsuya',
        image: 'https://cdn.myanimelist.net/images/manga/3/219741.jpg',
        themes: ['childcare']
      }
    ]
  }),
  watch: {
    pickMangas: {
      immediate: true,
      handler (newVal, oldVal) {
        newVal
          .map(value => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value)
      }
    }
  },
  methods: {
    sendPicking (idManga, title) {
      this.$store.state.Manga.currentRecommendationTitle = title
      this.$emit('sendPicking', idManga)
    }
  },
  computed: {
    ...mapState({
      pickMangas: (state) => state.Manga.pickMangas
    })
  }
}
</script>

<style scoped>
.blur {
  transition: all 1s ease-out;
}
.blur:hover {
  filter: blur(4px);
  -webkit-filter: blur(4px);
  opacity: 0.87;
}
</style>
