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
  data: () => ({
    pageWanted: 1
  }),

  methods: {
    getPagination: function () {
      this.$emit('getPagination', this.pageWanted)
    }
  },
  computed: {
    page: {
      get: function () {
        const query = this.$route.query.filter
        const params = new URLSearchParams(query)
        const page = (params.get('page')) ? parseInt(params.get('page'), 10) : 1
        return page
      },
      set: function (newValue) {
        this.pageWanted = newValue
      }
    }
  }
}
</script>
