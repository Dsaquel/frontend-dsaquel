
<script>
export default {
  name: 'EmailConfirmation',
  beforeMount () {
    this.$store.dispatch('emailConfirmation', this.$route.params)
  }
}
</script>
