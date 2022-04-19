<template>
  <div class="text-center">
    <v-pagination
      v-model="page"
      :length="lastPageVisible"
      :total-visible="7"
      @input="getPagination"
    />
  </div>
</template>

<script>
export default {
  name: 'pagination',
  emits: ['getPagination'],
  props: {
    lastPageVisible: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      page: 1
    }
  },

  methods: {
    getPagination () {
      this.$emit('getPagination', this.page)
    }
  }
}
</script>
