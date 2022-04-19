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
          v-model="pseudo"
          :disabled="!isEditing"
          color="white"
          label="Pseudo"
        ></v-text-field>
        <v-text-field
          v-model="email"
          disabled
          color="white"
          label="email"
        ></v-text-field>
        <v-text-field
          v-model="password"
          type="password"
          disabled
          color="white"
          label="Password"
        ></v-text-field>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
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
      hasSaved: false,
      isEditing: null,
      model: null
    }
  },

  methods: {
    save () {
      this.isEditing = !this.isEditing
      this.hasSaved = true
    }
  },
  computed: {
    ...mapState({
      pseudoState: (state) => state.user.pseudo,
      email: (state) => state.user.email,
      password: (state) => state.user.password
    }),
    pseudo: {
      get () {
        return this.pseudoState
      },
      set (newPseudo) {
        this.$store.state.user.pseudo = newPseudo
      }
    }
  }
}
</script>
