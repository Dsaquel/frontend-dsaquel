<template>
  <v-container>
    <v-form ref="resetPassword" v-model="valid">
      <v-text-field
        v-model="password"
        :rules="passwordRules"
        label="password"
        required
      ></v-text-field>
      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
        Envoyer
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: 'ResetPassword',
  data () {
    return {
      valid: false,
      password: '',
      passwordRules: [
        (v) => !!v || 'Mot de passe requis',
        (v) => v.length >= 8 || 'Mot de passe supérieur à 8 caractères'
      ]
    }
  },
  methods: {
    validate () {
      if (this.$refs.resetPassword.validate()) {
        this.$route.params.password = this.password
        this.$store.dispatch('resetPassword', this.$route.params)
      }
    }
  }
}
</script>
