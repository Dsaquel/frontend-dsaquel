<template>
  <v-container>
    <h1>LOGIN</h1>
    <LoginComponent />
  </v-container>
</template>

<script>
import LoginComponent from '../components/LoginComponent'
export default {
  name: 'Login',
  components: {
    LoginComponent
  }
}
</script>
