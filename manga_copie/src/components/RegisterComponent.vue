<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-col>
      <v-row>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>
      </v-row>

      <v-row>
        <v-text-field
          v-model="password"
          type="password"
          :rules="passwordRules"
          label="Mot de passe"
          required
        ></v-text-field>
      </v-row>
      <v-row>
        <v-text-field
          v-model="pseudo"
          :rules="pseudoRules"
          :counter="32"
          label="Pseudo"
          required
        ></v-text-field>
      </v-row>
    </v-col>
    <v-btn color="success" class="mr-4" @click="validate" :disabled="!valid"
      >S'enregistrer</v-btn
    >
  </v-form>
</template>

<script>
export default {
  watch: {},
  name: 'RegisterComponent',
  components: {},
  data: () => ({
    valid: true,
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail requis',
      (v) => /.+@.+/.test(v) || 'E-mail doit etre valide'
    ],
    password: '',
    passwordRules: [
      (v) => !!v || 'Mot de passe requis',
      (v) => v.length >= 4 || 'Mot de passe supérieur à 8 caractères'
    ],
    pseudo: '',
    pseudoRules: [
      (v) => !!v || 'Pseudo requis',
      (v) => v.length <= 32 || 'Pseudo inférieur à 32 caractères'
    ]
  }),
  methods: {
    validate () {
      this.$refs.form.validate()
      const payload = { email: this.email, password: this.password, pseudo: this.pseudo }
      this.$store.dispatch('insertUser', payload)
    }
  }
}
</script>
