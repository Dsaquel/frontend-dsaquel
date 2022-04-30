<template>
  <v-container>
    <v-card class="overflow-hidden">
      <v-toolbar flat color="orange">
        <v-icon>mdi-account</v-icon>
        <v-toolbar-title class="font-weight-light">
          User Profile
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          color="purple darken-3"
          fab
          small
          @click="isEditing = !isEditing"
        >
          <v-icon v-if="isEditing"> mdi-close </v-icon>
          <v-icon v-else> mdi-pencil </v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-text-field
        id="pseudo"
          :value="pseudoState"
          :disabled="!isEditing"
          color="white"
          label="Pseudo"
        ></v-text-field>
        <v-text-field
         id="email"
          :value="emailState"
          disabled
          color="white"
          label="email"
        ></v-text-field>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn @click="resetPassword">Reset password here</v-btn>
        <v-snackbar v-model="hasSend" :timeout="2000" absolute bottom left>
        Mail envoyé pour reset votre mdp
      </v-snackbar>
        <v-spacer></v-spacer>
        <v-btn :disabled="!isEditing" color="success" @click="save">
          Save
        </v-btn>
      </v-card-actions>
      <v-snackbar v-model="hasSaved" :timeout="2000" absolute bottom left>
        Your profile has been updated
      </v-snackbar>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'EditUserProfile',
  data () {
    return {
      model: null,
      email: '',
      pseudo: '',
      hasSaved: false,
      hasSend: false,
      isEditing: null
    }
  },
  beforeMount () {
    this.$store.dispatch('User/getUserProfile')
  },
  methods: {
    save () {
      this.isEditing = !this.isEditing
      this.hasSaved = true
      const pseudo = document.getElementById('pseudo').value
      const payload = {}
      payload.pseudo = pseudo
      this.$store.dispatch('editUserProfile', payload)
    },
    resetPassword () {
      this.hasSend = true
      this.$store.dispatch('linkPasswordReset', this.emailState)
    }
  },
  computed: {
    ...mapState({
      pseudoState: (state) => state.User.pseudo,
      emailState: (state) => state.User.email
    })
  }
}
</script>
