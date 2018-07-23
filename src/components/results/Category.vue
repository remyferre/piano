<template>
  <button class="reset" @click="filterKeys(category)">
    <h4>
      {{ category.name }} ({{category.keys.length}})
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
		icon() {
			if (this.$store.state.filters[this.category.slug]) {
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
