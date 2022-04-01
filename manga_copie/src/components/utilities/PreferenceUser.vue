<template>
  <v-item-group active-class="primary">
    <v-container>
      <v-row>
        <v-col v-for="n in 10" :key="n" cols="12" md="4">
          <v-item v-slot="{ active, toggle }">
            <v-card
              class="d-flex align-center"
              dark
              height="200"
              @click="toggle"
            >
              <v-scroll-y-transition>
                <div v-if="active" class="text-h2 flex-grow-1 text-center">
                  Active
                </div>
              </v-scroll-y-transition>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>

<script>
export default {
  name: 'PreferenceUser',
  data: () => ({
    mangas: [
      {
        title: 'Berserk',
        id: 2,
        themes: ['Gore', 'Military', 'Survival'],
        author: 'Miura, Kentarou',
        image: 'https://cdn.myanimelist.net/images/manga/1/157897.jpg'
      },
      { title: 'fdsfsdf', id: 132 },
      { title: 'Berqsdfqsdfqsqserk', id: 1243122 },
      { title: 'sdfdsfsdf', id: 2432 },
      { title: 'vcbvcxb', id: 232 },
      { title: 'vcxvvvv', id: 22 }
    ]
  })
}
</script>
