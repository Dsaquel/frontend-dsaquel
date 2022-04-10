<template>
  <v-form ref="form" v-model="checkValid">
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
    <v-text-field
      v-model="pseudo"
      :rules="pseudoRules"
      :counter="32"
      label="Pseudo"
      required
    ></v-text-field>
    <v-card-actions class="justify-end px-0 pb-0">
      <v-btn @click="changeStep">back off</v-btn>
      <v-btn color="warning" @click="validate">Register</v-btn>
    </v-card-actions>
  </v-form>
</template>
<script>
export default {
  name: 'LoginComponent',
  props: {
    valid: {
      type: Boolean
    }
  },
  data () {
    return {}
  },
  methods: {
    changeStep () {
      this.$emit('changeStep', 'index')
    },
    validate () {
      this.$emit('validate')
    }
  },
  computed: {
    checkValid: {
      get () {
        return this.valid
      },
      set (value) {
        this.$emit('updateValid', value)
      }
    }
  }
}
</script>
