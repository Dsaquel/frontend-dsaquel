<template>
  <v-container>
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
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail requis',
        (v) => /.+@.+/.test(v) || 'E-mail doit etre valide'
      ]
    }
  },
  methods: {
    validate () {
      this.$refs.form.validate()
    }
  }
}
</script>
