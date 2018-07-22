import _ from 'lodash';
import Vue from 'vue';
import Vuex from 'vuex';
import {SCALE_CATEGORIES} from './key_finder/scales.js';
import {CHORD_CATEGORIES} from './key_finder/chords.js';
import {findKeys} from './key_finder/main.js';

Vue.use(Vuex);

function activeCategories(state) {
	if (state.activeTab == "SCALE") {
		return SCALE_CATEGORIES;
	} else {
		return CHORD_CATEGORIES;
	}
}

function firstFilteredKey(state) {
	for (let category in activeCategories(state)) {
		if (state.filters[category] && state.results[category].length > 0)
			return state.results[category][0];
	}
	return null;
}

function keyInResults(state, key) {
	if (!key) {
		return false;
	}

	for (let category in activeCategories(state)) {
		if (state.filters[category])
			for (let k of state.results[category]) {
				if (k.equals(key)) {
					return true;
				}
			}
	}
	return false;
}

function updateSelectedKey(state) {
	const firstKey = firstFilteredKey(state);
	if (firstKey && !keyInResults(state, state.selectedKey)) {
		state.selectedKey = firstKey;
	}
}

export default new Vuex.Store({
	state: {
		piano: Array(12).fill(false),
		activeTab: "SCALE",
		selectedKey: null,
		results: {
			main: [],
			otherMinor: [],
			pentatonic: [],
			mode: [],
			chord: [],
			blues: [],
			otherTriad: [],
			suspended: [],
			seventh: [],
			otherSeventh: []
		},
		filters: {
			main: true,
			otherMinor: false,
			pentatonic: false,
			mode: false,
			blues: false,
			chord: true,
			otherTriad: false,
			suspended: false,
			seventh: false,
			otherSeventh: false
		}
	},
	mutations: {
		pressKey(state, keyIndex) {
			Vue.set(state.piano, keyIndex, !state.piano[keyIndex]);
			const bitstring = state.piano.map(key => key ? "1" : "0").join("");
			for (let categories of [SCALE_CATEGORIES, CHORD_CATEGORIES]) {
				_.forIn(categories, (scales, category) => {
					Vue.set(state.results, category, findKeys(bitstring, scales));
				});
			}
			updateSelectedKey(state);
		},
		changeTab(state, tab) {
			state.activeTab = tab;
			updateSelectedKey(state);
		},
		filterKeys(state, category) {
			Vue.set(state.filters, category, !state.filters[category]);
			updateSelectedKey(state);
		},
		selectKey(state, key) {
			state.selectedKey = key;
		}
	},
	actions: {

	}
});
