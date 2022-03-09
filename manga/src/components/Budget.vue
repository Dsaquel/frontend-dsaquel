<template>
  <div>
    <v-text-field
      type="number"
      hint="Fixer un budget pour ajouter des articles !"
      v-model="budget"
    >
    </v-text-field>
    <v-btn @click="newBudget"> Ajouter un budget </v-btn>
  </div>
</template>

<script>
export default {
  emits: ["newBudget"],
  props: {
    budget: {
      required: true,
      default: null,
    },
  },
  methods: {
    newBudget: function () {
      this.$emit("newBudget", this.budget);
    },
  },
};
</script>