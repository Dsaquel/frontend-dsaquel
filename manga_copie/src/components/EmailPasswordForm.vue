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
        <v-row>
          <slot name="pseudo" />
        </v-row>
      </v-col>
      <v-btn :disabled="!valid" color="success" class="mr-4" @click="envoyer">
        Envoyer
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: 'EmailPasswordForm',
  data () {
    return {
      email: '',
      password: '',
      valid: true,
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
    envoyer () {
      const payload = { email: this.email, password: this.password }
      this.$store.dispatch('checkUserExist', payload)
      console.log("juste avant d'envoyer les data dans vuex")
    },
    validate () {
      this.$refs.form.validate()
    }
  }
}
</script>
