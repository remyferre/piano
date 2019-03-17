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
@import "@/css/_colors.scss";
@import "@/css/_globals.scss";

.key {
	padding: $key-padding-y $key-padding-x !important;
	background-color: white;
	border-radius: 50px;
	margin-right: $key-margin;
	margin-bottom: $key-margin;
	&:not(.selected):hover {
		background-color: $black-hover;
	}
	&.selected {
		color: $background-color;
		background-color: $black;
	}
}
</style>
