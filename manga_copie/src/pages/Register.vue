<template>
  <v-container>
    <h1>Creer un compte !</h1>
    <RegisterComponent />
  </v-container>
</template>

<script>
import RegisterComponent from '@/components/RegisterComponent'
export default {
  name: 'Register',
  components: {
    RegisterComponent
  }
}
</script>
