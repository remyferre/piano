<template>
  <button class="key reset" @click="selectKey()" :class="{ selected: isSelected }">
	<span v-html="keyResult.shortName()"></span>
  </button>
</template>

<script>
export default {
	name: "Result",
	props: ['keyResult'],
	methods: {
		selectKey() {
			this.$store.commit('selectKey', this.keyResult);
		}
	},
	computed: {
		isSelected() {
			const selectedKey = this.$store.state.selectedKey;
			return selectedKey && this.keyResult.equals(selectedKey);
		}
	}
};
</script>

<style scoped lang="scss">
@import "@/css/_mixins.scss";

.key {
	padding: 0.5rem !important;
	@extend %selected;
}

@media only screen and (max-width : 900px) {
	.key {
		flex-grow: 1;
		text-align: left;
	}
}
</style>
