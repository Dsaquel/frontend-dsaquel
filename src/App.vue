<template>
  <v-app
    id="app"
    :style="{background: $vuetify.theme.themes[theme].background}"
  >
    <v-app-bar
      clipped-left
      app
    >
      <v-app-bar-nav-icon @click="isOpened = !isOpened" />

      <v-toolbar-title>Dsaquel</v-toolbar-title>

      <v-spacer></v-spacer>
        <v-btn @click="switchTheme" icon>
          <v-icon>mdi-theme-light-dark</v-icon>
        </v-btn>
      <v-menu
        v-if="token !== null"
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
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

      <v-btn
        v-else
        @click="dialog = true"
      >
        <v-icon class="mr-2">mdi-account-circle</v-icon>
        login
      </v-btn>

      <template v-slot:extension>
        <v-tabs
          v-model="tab"
          centered
          center-active
        >
          <v-tabs-slider color="green"></v-tabs-slider>
          <v-tab
            v-for="tab in tabs"
            :key="tab.name"
            :to="tab.to"
          >
            {{ tab.name }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-navigation-drawer
      v-model="isOpened"
      clipped
      app
    >
      <v-list>
        <v-list-item
          v-for="item in menus"
          :key="item.title"
          link
          :to="item.to"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div
          v-if="token"
          class="pa-2"
        >
          <v-btn
            block
            @click="logout"
          > Logout </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main>
      <v-dialog
        style="transform-origin: center center"
        persistent
        v-if="token === null"
        v-model="dialog"
        max-width="500"
      >
        <v-card v-show="index">
          <v-card-title class="flex-nowrap align-start">
            {{ etatStep }}
            <v-spacer></v-spacer>
            <v-btn
              @click="clearDialog"
              icon
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
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
                  <v-form
                    v-model="userLogin"
                    ref="login"
                    lazy-validation
                  >
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
                        :loading="loader.loginLoad"
                        color="success"
                        class="mr-4"
                        @click="login"
                      >login</v-btn>
                    </v-card-actions>
                  </v-form>
                  <v-divider></v-divider>
                  <div class="d-flex flex-column text-center body-2">
                    <span class="my-5">No account ?</span>
                    <v-btn
                      @click="step = 'createAccount'"
                      color="warning"
                    >create account</v-btn>
                  </div>
                </v-window-item>
                <v-window-item value="createAccount">
                  <v-form
                    lazy-validation
                    ref="register"
                    v-model="register"
                  >
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
                        :loading="loader.registerLoad"
                        @click="signup"
                      >Register</v-btn>
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
                        :loading="loader.linkPasswordResetLoad"
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
                  <v-btn @click="resendLink" :loading="loader.resendLinkLoad">resend email</v-btn>
                </v-window-item>
                <v-window-item value="recupAccountPassword">
                  <h2>Recup your account if you send the correct password</h2>
                  <v-form lazy-validation ref="checkPasswordValid" v-model="checkPasswordValid">
                    <v-text-field disabled :value="emailRecupAccount"></v-text-field>
                    <v-text-field v-model="passwordRecupAccount" :rules="passwordRules" required label="password"></v-text-field>
                  </v-form>
                  <v-btn @click="sendPasswordRecupAccount" :disabled="!checkPasswordValid" :loading="loader.recupAccountByPasswordLoad" color="success">send</v-btn>
                </v-window-item>
                <v-window-item value="recupAccountBtn">
                  <h2>Do you want recup this account ?</h2>
                  <v-text-field disabled :value="emailRecupAccount"></v-text-field>
                  <v-btn @click="sendChoiceRecupAccount" :loading="loader.recupAccountByBtnLoad" color="success">yes</v-btn>
                  <v-btn @click="clearDialog" color="error">No</v-btn>
                </v-window-item>
              </v-window>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-snackbar
        v-model="successSnackbar"
        :timeout="2000"
        color="success"
      >{{
        message
      }}</v-snackbar>
      <v-snackbar
        v-model="errorSnackbar"
        :timeout="2000"
        color="red accent-2"
      >{{ message }}</v-snackbar>
      <router-view :key="$route.fullPath" />
    </v-main>
    <v-card>
      <v-footer padless>
        <v-card
          flat
          tile
          width="100%"
          class="lighten-1 text-center"
        >
          <v-card-text>
            <v-btn
              v-for="content, i in footersContent"
              :key="i"
              class="mx-4"
              icon
              :to="content.to"
            >
              <v-icon size="24px">
                {{ content.icon }}
              </v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-footer>
    </v-card>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import Cookies from 'js-cookie'
export default {
  name: 'app',
  metaInfo: {
    titleTemplate: 'Dsaquel'
  },
  data () {
    return {
      isDark: true,
      footersContent: [
        { icon: 'mdi-home', to: '/' },
        { icon: 'mdi-bullseye-arrow', to: '/objective' },
        { icon: 'mdi-mail', to: '/suggestion' }
      ],
      index: 1,
      step: 'index',
      tab: null,
      resetPassword: true,
      isOpened: false,
      register: true,
      userLogin: true,
      checkPasswordValid: true,
      passwordRecupAccount: '',
      toggleShowPassword: false,
      emailLogin: '',
      emailResetPassword: '',
      emailRegister: '',
      dialog: false,
      passwordLogin: '',
      passwordRegister: '',
      passwordRules: [
        (v) => !!v || 'password required',
        (v) => v.length >= 4 || 'password need to be more than 8 character'
      ],
      emailRules: [
        (v) => !!v || 'E-mail required',
        (v) => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      pseudo: '',
      pseudoRules: [
        (v) => !!v || 'Pseudo required',
        (v) => v.length <= 32 || 'pseudonyme need to be more than 8 character'
      ],
      dropdownProfileConnected: [
        {
          icon: 'mdi-account',
          title: 'Account',
          to: '/account/personnal-informations'
        },
        { title: 'Library', icon: 'mdi-view-dashboard', to: 'library' },
        { title: 'Suggestion', icon: 'mdi-mail', to: '/suggestion' }
      ]
    }
  },
  mounted () {
    window.addEventListener('userStuff', (event) => {
      this.dialog = true
    })
  },

  beforeMount () {
    this.checkCookie('user')
  },
  methods: {
    clearDialog () {
      this.dialog = false
      this.step = 'index'
      this.emailLogin = ''
      this.emailRegister = ''
      this.emailResetPassword = ''
      this.passwordLogin = ''
      this.passwordRegister = ''
      this.pseudo = ''
    },
    login () {
      if (this.$refs.login.validate()) {
        const payload = {
          email: this.emailLogin,
          password: this.passwordLogin
        }
        this.$store.dispatch('Account/LOGIN', payload)
      }
    },
    signup () {
      if (this.$refs.register.validate()) {
        const newUser = {
          email: this.emailRegister,
          password: this.passwordRegister,
          pseudo: this.pseudo
        }
        this.$store.dispatch('Account/SIGN_UP', newUser)
      }
    },
    resendLink () {
      const newUser = {
        email: this.emailRegister,
        password: this.passwordRegister,
        pseudo: this.pseudo
      }
      this.$store.dispatch('Account/RESEND_LINK', newUser)
    },
    linkPasswordReset () {
      this.$store.dispatch(
        'Account/LINK_PASSWORD_RESET',
        this.emailResetPassword
      )
    },
    logout () {
      this.$store.dispatch('Account/LOGOUT', 'Disconnected')
      this.dialog = false
    },
    checkCookie () {
      const user = Cookies.get('user')
      if (user !== undefined) {
        this.$store.dispatch('Account/STAY_USER_CONNECTED', user)
      }
    },
    switchTheme () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      this.$vuetify.theme.light = !this.$vuetify.theme.light
    },
    sendPasswordRecupAccount () {
      if (this.$refs.checkPasswordValid.validate()) {
        this.$store.dispatch('Account/RECUP_ACCOUNT_BY_PASSWORD', { email: this.emailRecupAccount, password: this.passwordRecupAccount })
      }
    },
    sendChoiceRecupAccount () {
      this.$store.dispatch('Account/RECUP_ACCOUNT_BY_BTN', this.emailRecupAccount)
    }
  },
  watch: {
    newStep: {
      handler (newvalue) {
        console.log(newvalue)
        this.step = newvalue
      },
      deep: true
    },
    '$route' (to, from) {
      if (this.$route.query.account === 'deleted') {
        this.dialog = false
        this.emailLogin = ''
        this.passwordLogin = ''
      }
    }
  },
  computed: {
    menus () {
      const menus = [
        { title: 'Suggestion', icon: 'mdi-mail', to: '/suggestion' }
      ]
      if (this.token !== null) {
        menus.push(
          {
            title: 'Account',
            icon: 'mdi-account-box',
            to: '/account/personnal-informations'
          },
          { title: 'Library', icon: 'mdi-view-dashboard', to: '/library' }
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
      if (this.token !== null) {
        tabs.push({ name: 'Library', to: '/library' })
      }
      return tabs
    },
    etatStep () {
      switch (this.step) {
        case 'index':
          return 'Sign-in'
        case 'createAccount':
          return 'Create account'
        case 'resetPassword':
          return 'Reset password'
        case 'recupAccountPassword' || 'recupAccountBtn':
          return 'Recup account'
        default:
          return 'sign-in'
      }
    },
    theme () {
      return this.$vuetify.theme.dark ? 'dark' : 'light'
    },
    ...mapState({
      message: (state) => state.message,
      token: (state) => state.Account.token,
      newStepStore: (state) => state.Account.newStep,
      loader: (state) => state.Account.loader,
      successSnackbarStore: (state) => state.successSnackbar,
      emailRecupAccount: (state) => state.Account.emailRecupAccount,
      errorSnackbarStore: (state) => state.errorSnackbar
    }),
    newStep: {
      get () {
        return this.newStepStore
      },
      set (newStep) {
        return newStep
      }
    },
    successSnackbar: {
      get () {
        return this.successSnackbarStore
      },
      set (newStatue) {
        return newStatue
      }
    },
    errorSnackbar: {
      get () {
        return this.errorSnackbarStore
      },
      set (newStatue) {
        return newStatue
      }
    }
  }
}
</script>
