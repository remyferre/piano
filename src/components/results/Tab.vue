<template>
	<button class="reset tab" @click="changeTab()" :class="{ selected: isSelected }">
      {{ tab.name() }}
    </button>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: "Tab",
	props: ['tab'],
	computed: mapState({
		isSelected(state) {
			return state.activeTab == this.tab;
		}
	}),
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

.tab {
	@extend %title-font;
	font-size: 1.4rem;
	padding: 0 0.5rem;

	border-bottom: 5px solid transparent;
	&.selected {
		border-bottom: 5px solid $black;
	}

	&:hover {
		background-color: $white-hover;
	}
}
</style>
