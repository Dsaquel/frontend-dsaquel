<template>
  <EmailPasswordForm>
    <template v-slot:pseudo>
      <v-text-field
        v-model="pseudo"
        :rules="pseudoRules"
        :counter="32"
        label="Pseudo"
        required
      ></v-text-field>
    </template>
  </EmailPasswordForm>
</template>

<script>
import EmailPasswordForm from '@/components/EmailPasswordForm.vue'
export default {
  name: 'RegisterComponent',
  components: {
    EmailPasswordForm
  },
  data: () => ({
    valid: false,
    pseudo: '',
    pseudoRules: [
      (v) => !!v || 'Pseudo requis',
      (v) => v.length <= 32 || 'Pseudo inférieur à 32 caractères'
    ]
  })
}
</script>
