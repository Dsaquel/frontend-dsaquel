<template>
  <v-container>
    <v-card class="overflow-hidden">
      <v-toolbar flat>
        <v-icon>mdi-account</v-icon>
        <v-toolbar-title class="font-weight-light">
          User Profile
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
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
          label="Pseudo"
        ></v-text-field>
        <v-text-field
         id="email"
          :value="emailState"
          disabled
          label="email"
        ></v-text-field>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn @click="resetPassword">Reset password here</v-btn>
        <v-snackbar v-model="hasSend" :timeout="2000" absolute bottom left>
        Mail envoyé pour reset votre mdp
      </v-snackbar>
      <v-btn @click="deleteAccount" :loading="loader.deleteAccountLoad" color="error" plain>delete account</v-btn>
        <v-spacer></v-spacer>
        <v-btn :disabled="!isEditing" :loading="loader.editUserProfile" color="success" @click="editUserAccount">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'EditUserProfile',
  data: () => ({
    model: null,
    email: '',
    pseudo: '',
    hasSaved: false,
    hasSend: false,
    isEditing: null
  }),
  beforeMount: function () {
    this.$store.dispatch('Account/GET_USER_PROFILE')
  },
  methods: {
    editUserAccount: function () {
      this.isEditing = !this.isEditing
      this.hasSaved = true
      const pseudo = document.getElementById('pseudo').value
      this.$store.dispatch('Account/EDIT_USER_PROFILE', { pseudo })
    },
    resetPassword: function () {
      this.hasSend = true
      this.$store.dispatch('Account/LINK_PASSWORD_RESET', this.emailState)
    },
    deleteAccount: function () {
      this.$store.dispatch('Account/DELETE_ACCOUNT', this.emailState)
    }
  },
  computed: {
    ...mapState({
      loader: (state) => state.Account.loader,
      emailState: (state) => state.Account.email,
      pseudoState: (state) => state.Account.pseudo
    })
  }
}
</script>
