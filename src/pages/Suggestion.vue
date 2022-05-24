<template>
    <v-container>
        <v-form
            ref="suggestion"
            v-model="valid"
            lazy-validation
            >
            <v-text-field
                v-model="name"
                label="name"
                :rules="nameRules"
                filled
            ></v-text-field>
            <v-textarea
                v-model="message"
                filled
                auto-grow
                name="input-7-4"
                label="Message"
            >
            </v-textarea>
            <v-btn color="success" @click="sendMessage">send</v-btn>
        </v-form>
    </v-container>
</template>

<script>
export default {
  name: 'Suggestion',

  data () {
    return {
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      message: 'I think the website may contain...'
    }
  },
  methods: {
    sendMessage () {
      if (this.$refs.suggestion.validate()) {
        this.$store.dispatch('SEND_MESSAGE', { name: this.name, message: this.message })
      }
    }
  }
}
</script>
