<template>
  <section v-show="pianoKeysPressed">
    <section v-if="noResultsFound" class="no-results">
      <p>{{ this.$store.state.activeTab.noResultsText() }}</p>
    </section>
    <section v-else v-for="category in results" :key="category.slug" :class="[`keys-${category.slug}`]">
      <Category :category="category"></Category>
      <template v-if="category.isShown">
        <div v-if="category.results.length > 0" class="keys">
          <Result v-for="keyResult in category.results" :keyResult="keyResult" :key="keyResult.slug()"></Result>
        </div>
        <div v-else class="no-category-results">Aucun résultat</div>
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

.no-results {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 25vh;
	p {
		font-size: 1.5rem;
		text-align: center;
	}
}
.keys {
    display: grid;
	grid-template-columns: repeat(auto-fill, minmax(115px, 1fr));
	grid-gap: $key-margin;
}
.keys-blues .keys {
	grid-template-columns: repeat(auto-fill, minmax(125px, 1fr));
}
.keys-mode .keys, .keys-otherTriad .keys {
	grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
}
.keys-pentatonic .keys, .keys-otherMinor .keys {
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
.no-category-results {
	padding-top   : $key-padding-y;
	padding-bottom: $key-padding-y;
	height: $key-height;
}
</style>
