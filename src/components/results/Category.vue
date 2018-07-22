<template>
  <button class="reset" @click="filterKeys(category)">
    <h4>
      {{ category.name }} ({{category.keys.length}})
      <i v-if="isActive"  class="fas fa-angle-down"></i>
      <i v-if="!isActive" class="fas fa-angle-up"></i>
    </h4>
  </button>
</template>

<script>
export default {
	name: "Category",
	props: ['category'],
	methods: {
		filterKeys(category) {
			this.$store.commit('filterKeys', category.slug);
		},
	},
	computed: {
		isActive() {
			return this.$store.state.filters[this.category.slug];
		}
	}
};
</script>

<style scoped lang="scss">

</style>
