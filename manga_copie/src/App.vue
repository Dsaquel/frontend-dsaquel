<template>
  <v-app id="app">
    <v-app-bar clipped-left app>
      <v-app-bar-nav-icon @click="isOpened = !isOpened" />

      <v-toolbar-title>Dsaquel</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn @click="dialog = true">
        <v-icon class="mr-2">mdi-account-circle</v-icon>
        Se connecter
      </v-btn>

      <template v-slot:extension>
        <v-tabs v-model="tab" align-with-title>
          <v-tabs-slider color="green"></v-tabs-slider>
          <v-tab v-for="tab in tabs" :key="tab.name" :to="tab.to">
            {{ tab.name }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="isOpened" clipped app>
      <v-list>
        <v-list-item v-for="item in menus" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div v-if="isUserConnected" class="pa-2">
          <v-btn block> Logout </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main>
      <v-dialog
        style="transform-origin: center center"
        persistent
        v-model="dialog"
        max-width="500"
      >
        <v-card v-show="index">
          <v-card-title class="flex-nowrap align-start">
            {{ etatStep }}
            <v-spacer></v-spacer>
            <v-btn @click="dialog = false" icon
              ><v-icon>mdi-close</v-icon></v-btn
            >
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-container>
              <v-window v-model="step">
                <v-window-item value="index">
                  <div
                    class="d-flex flex-column justify-space-between"
                    style="min-height: 100%"
                  ></div>
                  <p class="mb-5 font-weight-medium grey--text text--darken-1">
                    Login
                  </p>
                  <v-form v-model="valid" ref="form" lazy-validation>
                    <v-text-field
                      v-model="email"
                      :rules="emailRules"
                      label="E-mail"
                      required
                    ></v-text-field>

                    <v-text-field
                      v-model="password"
                      type="password"
                      :rules="passwordRules"
                      label="password"
                      required
                    ></v-text-field>

                    <v-card-actions class="justify-space-between">
                      <div
                        @click="step = 'resetPassword'"
                        style="cursor: pointer"
                        class="
                          app-link
                          text-decoration-none
                          primary--text
                          font-weight-medium
                          d-inline-block
                        "
                        replace
                      >
                        forgot password ?
                      </div>
                      <v-btn
                        :disabled="!valid"
                        color="success"
                        class="mr-4"
                        @click="validate"
                        >login</v-btn
                      >
                    </v-card-actions>
                  </v-form>
                  <v-divider></v-divider>
                  <div class="d-flex flex-column text-center body-2">
                    <span class="my-5">No account ?</span>
                    <v-btn @click="step = 'createAccount'" color="warning"
                      >create account</v-btn
                    >
                  </div>
                </v-window-item>
                <v-window-item value="createAccount">
                  <v-form ref="form" v-model="valid">
                    <v-text-field
                      v-model="email"
                      :rules="emailRules"
                      label="E-mail"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="password"
                      type="password"
                      :rules="passwordRules"
                      label="Mot de passe"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="pseudo"
                      :rules="pseudoRules"
                      :counter="32"
                      label="Pseudo"
                      required
                    ></v-text-field>
                  </v-form>
                  <v-card-actions class="justify-end px-0 pb-0">
                    <v-btn @click="step = 'index'">back off</v-btn>
                    <v-btn color="warning" @click="validate">Register</v-btn>
                  </v-card-actions>
                </v-window-item>
                <v-window-item value="resetPassword">
                  <v-form v-model="valid">
                    <v-col>
                      <v-row align="center">
                        <v-text-field
                          v-model="email"
                          :rules="emailRules"
                          label="E-mail"
                          required
                        ></v-text-field>
                      </v-row>
                    </v-col>
                    <v-card-actions class="justify-end px-0 pb-0">
                      <v-btn @click="step = 'index'">back off</v-btn>
                      <v-btn
                        :disabled="!valid"
                        color="success"
                        class="mr-4"
                        @click="validate"
                      >
                        Send
                      </v-btn>
                    </v-card-actions>
                  </v-form>
                </v-window-item>
              </v-window>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
      <router-view :key="$route.path" />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      tabs: [
        { name: 'Home', to: '/' },
        { name: 'Anime', to: '/anime' },
        { name: 'Manga', to: '/manga' }
      ],
      index: 1,
      step: 'index',
      tab: null,
      isUserConnected: true,
      isOpened: false,
      valid: false,
      email: '',
      dialog: false,
      password: '',
      passwordRules: [
        (v) => !!v || 'Mot de passe requis',
        (v) => v.length >= 4 || 'Mot de passe supérieur à 8 caractères'
      ],
      emailRules: [
        (v) => !!v || 'E-mail requis',
        (v) => /.+@.+/.test(v) || 'E-mail doit etre valide'
      ],
      pseudo: '',
      pseudoRules: [
        (v) => !!v || 'Pseudo requis',
        (v) => v.length <= 32 || 'Pseudo inférieur à 32 caractères'
      ]
    }
  },
  methods: {
    validate () {
      this.$refs.form.validate()
      const payload = { email: this.email, password: this.password }
      this.$store.dispatch('checkUserExist', payload)
    },
    dialogSystem (open, close) {
      this.close = false
    }
  },
  computed: {
    menus () {
      const menus = [{ title: 'Suggestion', icon: 'mdi-gavel' }]
      if (this.isUserConnected) {
        menus.push(
          { title: 'Account', icon: 'mdi-account-box' },
          { title: 'Library', icon: 'mdi-view-dashboard' }
        )
      }
      return menus
    },
    etatStep () {
      switch (this.step) {
        case 'index':
          return 'Sign-up'
        case 'createAccount':
          return 'Create account'
        case 'resetPassword':
          return 'Reset password'
        default:
          return 'sign-up'
      }
    }
  }
}
</script>
