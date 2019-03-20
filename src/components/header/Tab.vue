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
			this.$emit('tab-click');
		}
	}
};
</script>
