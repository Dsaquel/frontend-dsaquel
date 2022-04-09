<template>
  <v-card>
    <v-card-title class="flex-nowrap align-start">
      Connexion
      <v-spacer></v-spacer>
      <v-btn icon><v-icon>mdi-close</v-icon></v-btn>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-container>
        <div class="d-flex flex-column justify-space-between" style="min-height: 100%;"></div>
        <p class="mb-5 font-weight-medium grey--text text--darken-1">Login</p>
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
            label="Mot de passe"
            required
          ></v-text-field>

          <v-card-action>
            <router-link
              to="/reset-password"
              class="
                app-link
                text-decoration-none
                primary--text
                font-weight-medium
                d-inline-block
              "
              replace
              >Mot de passe oublié</router-link
            >
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="validate"
              >Se connecter</v-btn
            >
          </v-card-action>
        </v-form>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'LoginComponent',
  components: {},
  data () {
    return {
      valid: true,
      email: '',
      password: '',
      passwordRules: [
        (v) => !!v || 'Mot de passe requis',
        (v) => v.length >= 4 || 'Mot de passe supérieur à 8 caractères'
      ],
      emailRules: [
        (v) => !!v || 'E-mail requis',
        (v) => /.+@.+/.test(v) || 'E-mail doit etre valide'
      ]
    }
  },
  methods: {
    validate () {
      this.$refs.form.validate()
      const payload = { email: this.email, password: this.password }
      this.$store.dispatch('checkUserExist', payload)
    }
  }
}
</script>
