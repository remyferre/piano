<template>
	<button class="reset tab" @click="changeTab()" :class="{ selected: isSelected }">{{ tab.name() }}</button>
</template>

<script>
export default {
	name: "Tab",
	props: ['tab'],
	computed: {
		isSelected() {
			return this.$store.state.activeTab == this.tab;
		}
	},
	methods: {
		changeTab() {
			this.$store.commit('changeTab', this.tab);
		}
	}
};
</script>

<style scoped lang="scss">
@import "@/css/_colors.scss";
@import "@/css/_fonts.scss";
@import "@/css/_mixins.scss";

.tab {
	@extend %title-font;
	@extend %selected;
	padding: 1rem !important;
	border: 1px solid $black !important;
}
</style>
