<template>
  <section v-if="pianoKeysPressed">
    <section class="tabs">
      <Tab :tab="this.$store.state.scales"></Tab>
      <Tab :tab="this.$store.state.chords"></Tab>
    </section>
    <section v-if="noResultsFound">
      <p>{{ this.$store.state.activeTab.noResultsText() }}</p>
    </section>
    <section v-else v-for="category in results" :key="category.slug">
      <Category :category="category"></Category>
      <div v-if="category.isShown" class="keys">
        <Result v-for="keyResult in category.results" :keyResult="keyResult" :key="keyResult.slug()"></Result>
      </div>
    </section>
  </section>
</template>

<script>
import _ from 'lodash';
import Tab from './Tab.vue';
import Category from './Category.vue';
import Result from './Result.vue';

export default {
	name: "Results",
	computed: {
		results() {
			return this.$store.state.activeTab.results();
		},
		noResultsFound() {
			return _.every(this.results, category => category.results.length == 0);
		},
		pianoKeysPressed() {
			return _.some(this.$store.state.piano);
		}
	},
	components: {
		Tab,
		Category,
		Result
	}
};
</script>

<style scoped lang="scss">
.tabs {
	display: flex;
}
.tab {
	flex-grow: 1;
}
@media only screen and (max-width : 900px) {
	.keys {
		display: flex;
		flex-wrap: wrap;
	}
}
</style>
