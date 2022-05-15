<template>
  <v-container>
    <v-form ref="resetPassword" v-model="valid">
      <v-text-field
        v-model="password"
        :rules="passwordRules"
        label="password"
        required
      ></v-text-field>
      <v-btn :disabled="!valid" :loading="resetPasswordLoad" color="success" class="mr-4" @click="validate">
        Envoyer
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ResetPassword',
  data () {
    return {
      valid: false,
      password: '',
      passwordRules: [
        (v) => !!v || 'Mot de passe requis',
        (v) => v.length >= 4 || 'Mot de passe supérieur à 4 caractères'
      ]
    }
  },
  methods: {
    validate () {
      if (this.$refs.resetPassword.validate()) {
        this.$route.params.password = this.password
        this.$store.dispatch('Account/RESET_PASSWORD', this.$route.params)
      }
    }
  },
  computed: {
    ...mapState({
      resetPasswordLoad: (state) => state.Account.loader.resetPasswordLoad
    })
  }
}
</script>
