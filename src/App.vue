<template>
  <v-app id="app">
    <v-app-bar clipped-left app>
      <v-app-bar-nav-icon @click="isOpened = !isOpened" />

      <v-toolbar-title>Dsaquel</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu v-if="isUserConnected === true" bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item-group>
            <v-list-item
              v-for="(item, i) in dropdownProfileConnected"
              :key="i"
              :to="item.to"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon" />
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.title" />
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>

      <v-btn v-else @click="dialog = true">
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
        <v-list-item v-for="item in menus" :key="item.title" link :to="item.to">
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
          <v-btn block @click="logout"> Logout </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main>
      <v-dialog
        style="transform-origin: center center"
        persistent
        v-if="isUserConnected === false"
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
                  <v-form v-model="userLogin" ref="login" lazy-validation>
                    <v-text-field
                      v-model="emailLogin"
                      :rules="emailRules"
                      label="E-mail"
                      required
                    ></v-text-field>

                    <v-text-field
                      v-model="passwordLogin"
                      :rules="passwordRules"
                      label="password"
                      required
                      :type="toggleShowPassword ? 'text' : 'password'"
                      :append-icon="
                        toggleShowPassword
                          ? 'mdi-eye-outline'
                          : 'mdi-eye-off-outline'
                      "
                      @click:append="toggleShowPassword = !toggleShowPassword"
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
                        :disabled="!userLogin"
                        color="success"
                        class="mr-4"
                        @click="login"
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
                  <v-form lazy-validation ref="register" v-model="register">
                    <v-text-field
                      v-model="emailRegister"
                      :rules="emailRules"
                      label="E-mail"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="passwordRegister"
                      :rules="passwordRules"
                      :type="toggleShowPassword ? 'text' : 'password'"
                      :append-icon="
                        toggleShowPassword
                          ? 'mdi-eye-outline'
                          : 'mdi-eye-off-outline'
                      "
                      @click:append="toggleShowPassword = !toggleShowPassword"
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
                    <v-card-actions class="justify-end px-0 pb-0">
                      <v-btn @click="step = 'index'">back off</v-btn>
                      <v-btn
                        color="warning"
                        class="mr-4"
                        :disabled="!register"
                        @click="signup"
                        >Register</v-btn
                      >
                    </v-card-actions>
                  </v-form>
                </v-window-item>
                <v-window-item value="resetPassword">
                  <v-form
                    lazy-validation
                    ref="resetPassword"
                    v-model="resetPassword"
                  >
                    <v-text-field
                      v-model="emailResetPassword"
                      :rules="emailRules"
                      label="E-mail"
                      required
                    ></v-text-field>
                    <v-card-actions class="justify-end px-0 pb-0">
                      <v-btn @click="step = 'index'">back off</v-btn>
                      <v-btn
                        :disabled="!resetPassword"
                        color="success"
                        class="mr-4"
                        @click="linkPasswordReset"
                      >
                        Send
                      </v-btn>
                    </v-card-actions>
                  </v-form>
                </v-window-item>
                <v-window-item value="emailSend">
                  <h2>Email envoyé à {{ emailRegister }}</h2>
                  <v-btn @click="resendLink">resend email</v-btn>
                </v-window-item>
              </v-window>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
      <router-view :key="$route.fullPath" />
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'app',
  data () {
    return {
      index: 1,
      step: 'index',
      tab: null,
      resetPassword: true,
      isOpened: false,
      register: true,
      userLogin: true,
      toggleShowPassword: false,
      emailLogin: '',
      emailResetPassword: '',
      emailRegister: '',
      dialog: false,
      passwordLogin: '',
      passwordRegister: '',
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
      ],
      dropdownProfileConnected: [
        {
          icon: 'mdi-account',
          title: 'Account',
          to: '/account/personnal-informations'
        },
        { title: 'Library', icon: 'mdi-view-dashboard', to: 'library' },
        { title: 'Suggestion', icon: 'mdi-gavel' }
      ]
    }
  },
  beforeMount () {
    this.checkCookie('user')
  },
  methods: {
    login () {
      if (this.$refs.login.validate()) {
        const payload = {
          email: this.emailLogin,
          password: this.passwordLogin
        }
        this.$store.dispatch('login', payload)
      }
    },
    signup () {
      if (this.$refs.register.validate()) {
        this.step = 'emailSend'
        const newUser = { email: this.emailRegister, password: this.passwordRegister, pseudo: this.pseudo }
        this.$store.dispatch('signUp', newUser)
      }
    },
    resendLink () {
      const newUser = { email: this.emailRegister, password: this.passwordRegister, pseudo: this.pseudo }
      this.$store.dispatch('resendLink', newUser)
    },
    linkPasswordReset () {
      this.$store.dispatch('linkPasswordReset', this.emailResetPassword)
    },
    logout () {
      this.$store.dispatch('logout')
      this.dialog = false
    },
    checkResetPassword () {
      if (this.$refs.resetPassword.validate()) {
        this.$refs.resetPassword.validate()
      }
    },
    setCookie (cname, cvalue, exdays) {
      const d = new Date()
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
      const expires = 'expires=' + d.toUTCString()
      document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
    },
    getCookie (cname) {
      const name = cname + '='
      const decodedCookie = decodeURIComponent(document.cookie)
      const ca = decodedCookie.split(';')
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) === ' ') {
          c = c.substring(1)
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length)
        }
      }
      return ''
    },
    checkCookie (cname) {
      const user = this.getCookie(cname)
      if (user !== '') {
        this.$store.dispatch('stayUserConnected', user)
      } else {
        console.log('go se connecter bg')
      }
    }
  },
  computed: {
    menus () {
      const menus = [{ title: 'Suggestion', icon: 'mdi-gavel' }]
      if (this.isUserConnected) {
        menus.push(
          {
            title: 'Account',
            icon: 'mdi-account-box',
            to: '/account/personnal-informations'
          },
          { title: 'Library', icon: 'mdi-view-dashboard', to: 'library' }
        )
      }
      return menus
    },
    tabs () {
      const tabs = [
        { name: 'Home', to: '/' },
        { name: 'Anime', to: '/anime' },
        { name: 'Manga', to: '/manga' }
      ]
      if (this.isUserConnected) {
        tabs.push(
          { name: 'Library', to: '/library' })
      }
      return tabs
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
    },
    ...mapState({
      isUserConnected: (state) => state.isUserConnected
    })
  }
}
</script>
