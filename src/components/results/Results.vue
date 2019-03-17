<template>
  <section v-show="pianoKeysPressed">
    <section v-if="noResultsFound">
      <p>{{ this.$store.state.activeTab.noResultsText() }}</p>
    </section>
    <section v-else v-for="category in results" :key="category.slug">
      <Category :category="category"></Category>
      <template v-if="category.isShown">
        <div v-if="category.results.length > 0" class="keys">
          <Result v-for="keyResult in category.results" :keyResult="keyResult" :key="keyResult.slug()"></Result>
        </div>
        <div v-else class="no-results">Aucun résultat</div>
      </template>
    </section>
  </section>
</template>

<script>
import _ from 'lodash';
import { mapState, mapGetters } from 'vuex';
import Category from './Category.vue';
import Result from './Result.vue';

export default {
	name: "Results",
	computed: {
		noResultsFound() {
			return _.every(this.results, category => category.results.length == 0);
		},
		...mapState({
			results: state => state.activeTab.results(),
		}),
		...mapGetters(['pianoKeysPressed'])
	},
	components: {
		Category,
		Result
	}
};
</script>

<style scoped lang="scss">
@import "@/css/_globals.scss";

.keys {
    display: flex;
    flex-wrap: wrap;
}
.no-results {
	padding-top: $key-padding-y;
	padding-bottom: $key-padding-y;
	margin-bottom: $key-margin;
}
</style>
