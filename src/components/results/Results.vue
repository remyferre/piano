<template>
  <section v-if="pianoKeysPressed">
    <section v-if="noResultsFound">
      <p>{{ this.$store.state.activeTab.noResultsText() }}</p>
    </section>
    <section v-else v-for="category in results" :key="category.slug">
      <Category :category="category"></Category>
      <template v-if="category.isShown">
        <div v-if="category.results.length > 0" class="keys">
          <Result v-for="keyResult in category.results" :keyResult="keyResult" :key="keyResult.slug()"></Result>
        </div>
        <div v-else>Aucun résultat</div>
      </template>
    </section>
  </section>
</template>

<script>
import _ from 'lodash';
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
		Category,
		Result
	}
};
</script>

<style scoped lang="scss">
.keys {
    display: flex;
    flex-wrap: no-wrap;
    overflow-x: auto;
}
.key {
    flex: 0 0 auto;
}
</style>
