<script>
export default {
  name: 'EmailConfirmation',
  beforeMount () {
    this.$store.dispatch('Account/EMAIL_CONFIRMATION', this.$route.params)
  }
}
</script>
