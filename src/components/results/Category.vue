<template>
  <button v-if="count > 0 || category.isShown" class="reset" @click="filterKeys(category)">
    <h4>
      {{ category.name }} ({{ count }})
      <FontAwesomeIcon :icon="icon"></FontAwesomeIcon>
    </h4>
  </button>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faAngleDown, faAngleUp);

export default {
	name: "Category",
	props: ['category'],
	methods: {
		filterKeys(category) {
			this.$store.commit('filterKeys', category.slug);
		},
	},
	computed: {
		count() {
			return this.category.results.length;
		},
		icon() {
			if (this.category.isShown) {
				return faAngleDown;
			} else {
				return faAngleUp;
			}
		}
	},
	components: {
		FontAwesomeIcon
	}
};
</script>

<style scoped lang="scss">

</style>
