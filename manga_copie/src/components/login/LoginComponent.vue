<template>
  <v-container>
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-col>
        <v-row align="center">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-row>

        <v-row align="center">
          <v-text-field
            v-model="password"
            type="password"
            :rules="passwordRules"
            label="Mot de passe"
            required
          ></v-text-field>
        </v-row>
      </v-col>
      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Se connecter</v-btn>
    </v-form>

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
  </v-container>
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
