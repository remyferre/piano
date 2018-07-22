<template>
  <section v-if="pianoKeysPressed">
    <section class="tabs">
      <button class="reset tab" @click="changeTab('SCALE')" :class="{ selected: this.$store.state.activeTab == 'SCALE' }">Gammes</button>
      <button class="reset tab" @click="changeTab('CHORD')" :class="{ selected: this.$store.state.activeTab == 'CHORD' }">Accords</button>
    </section>
    <section v-for="category in results" :key="category.slug">
      <Category :category="category"></Category>
      <div v-if="category.shown" class="keys">
        <Result v-for="keyResult in category.keys" :keyResult="keyResult" :key="keyResult.name()"></Result> <!-- name is an invalid key -->
      </div>
    </section>
  </section>
</template>

<script>
import _ from 'lodash';
import {SCALE_CATEGORIES} from '../../key_finder/scales.js';
import {CHORD_CATEGORIES} from '../../key_finder/chords.js';
import Result from './Result.vue';
import Category from './Category.vue';

export default {
	name: "Results",
	computed: {
		results() {
			if (this.$store.state.activeTab == "SCALE") {
				return this.scales;
			} else {
				return this.chords;
			}
		},
		scales() {
			const NAMES = {
				"main": "Majeures et mineures",
				"otherMinor": "Autres gammes mineures",
				"pentatonic": "Gamme pentatoniques",
				"mode": "Modes",
				"blues": "Blues"
			};
			return Object.keys(SCALE_CATEGORIES).map(category => ({
				slug: category,
				name: NAMES[category],
				shown: this.$store.state.filters[category],
				keys: this.$store.state.results[category]
			}));
		},
		chords() {
			const NAMES = {
				"chord": "Majeurs et mineurs",
				"otherTriad": "Triades augmentées/diminuées",
				"suspended": "Suspendus",
				"seventh": "Septièmes de dominante",
				"otherSeventh": "Septièmes d'espèces"
			};
			return Object.keys(CHORD_CATEGORIES).map(category => ({
				slug: category,
				name: NAMES[category],
				shown: this.$store.state.filters[category],
				keys: this.$store.state.results[category]
			}));
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
