<template>
  <section v-if="pianoKeysPressed">
    <section class="tabs">
      <button class="reset tab" @click="changeTab('scales')" :class="{ selected: this.$store.state.activeTab == 'scales' }">Gammes</button>
      <button class="reset tab" @click="changeTab('chords')" :class="{ selected: this.$store.state.activeTab == 'chords' }">Accords</button>
    </section>
    <section v-for="category in results" :key="category.slug">
      <Category :category="category"></Category>
      <div v-if="category.isShown" class="keys">
        <Result v-for="keyResult in category.results" :keyResult="keyResult" :key="keyResult.name()"></Result> <!-- name is an invalid key -->
      </div>
    </section>
  </section>
</template>

<script>
import _ from 'lodash';
import Result from './Result.vue';
import Category from './Category.vue';

export default {
	name: "Results",
	computed: {
		results() {
			return this.$store.state[this.$store.state.activeTab];
		},
		pianoKeysPressed() {
			return _.some(this.$store.state.piano);
		}
	},
	methods: {
		changeTab(tab) {
			this.$store.commit('changeTab', tab);
		}
	},
	components: {
		Result,
		Category
	},
};
</script>

<style scoped lang="scss">
.tabs {
	display: flex;
}
.tab {
	flex-grow: 1;
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
@media only screen and (max-width : 900px) {
	.keys {
		display: flex;
		flex-wrap: wrap;
	}
}
</style>
