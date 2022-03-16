<template>
  <v-container>
    <EmailPasswordForm />
    <router-link
      to="/reset-password"
      class="
        app-link
        text-decoration-none
        primary--text
        font-weight-medium
        d-inline-block
      "
      replace
      >Mot de passe oublié</router-link
    >
  </v-container>
</template>

<script>
import EmailPasswordForm from '@/components/EmailPasswordForm'
export default {
  name: 'LoginComponent',
  components: {
    EmailPasswordForm
  }
}
</script>
