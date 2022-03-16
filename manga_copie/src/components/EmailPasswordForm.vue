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
      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="validate"
      >
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
      valid: true,
      password: '',
      passwordRules: [
        (v) => !!v || 'Mot de passe requis',
        (v) => v.length >= 8 || 'Mot de passe supérieur à 8 caractères'
      ],
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
