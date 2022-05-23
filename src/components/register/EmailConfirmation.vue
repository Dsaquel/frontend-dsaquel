<script>
export default {
  name: 'EmailConfirmation',
  beforeMount: function () {
    this.$store.dispatch('Account/EMAIL_CONFIRMATION', this.$route.params)
  }
}
</script>
