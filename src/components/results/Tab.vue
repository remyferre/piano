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
.tab {
	padding: 1rem !important;
	border: 1px solid #222 !important;
	&:hover {
		background-color: rgba(34, 34, 34, 0.1);
	}
	&.selected {
		color: #feead4;
		background-color: #222;
	}
}
</style>
