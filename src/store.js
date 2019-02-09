import _ from 'lodash';
import Vue from 'vue';
import Vuex from 'vuex';
import {
	MAJOR_SCALE, MINOR_SCALE,
	HARMONIC_MINOR, MELODIC_MINOR,
	DORIAN, PHRYGIAN, LYDIAN, MIXOLYDIAN, LOCRIAN,
	PENTATONIC_MAJOR, PENTATONIC_MINOR,
	BLUES_SCALE
} from './key_finder/scales.js';
import {
	MAJOR_CHORD, MINOR_CHORD,
	DIMINISHED_CHORD, AUGMENTED_CHORD,
	SUS4, SUS2,
	DOMINANT_SEVENTH, MAJOR_SEVENTH, AUGMENTED_MAJOR_SEVENTH,
	MINOR_MAJOR_SEVENTH, MINOR_SEVENTH, HALF_DIMINISHED_SEVENTH,
	DIMINISHED_SEVENTH
} from './key_finder/chords.js';
import {findKeys} from './key_finder/main.js';

Vue.use(Vuex);

class Tab {
	constructor(categories) {
		this.categories = categories;
	}
	results() {
		return this.categories;
	}
	*activeCategories() {
		for (let [, category] of Object.entries(this.categories)) {
			if (category.isShown)
				yield category;
		}
	}
}

class ScaleTab extends Tab {
	constructor() {
		super({
			main: {
				slug: "main",
				name: "Majeures et mineures",
				isShown: true,
				results: [],
				items: [MAJOR_SCALE, MINOR_SCALE]
			},
			otherMinor: {
				slug: "otherMinor",
				name: "Autres gammes mineures",
				isShown: false,
				results: [],
				items: [HARMONIC_MINOR, MELODIC_MINOR]
			},
			pentatonic: {
				slug: "pentatonic",
				name: "Gammes pentatoniques",
				isShown: false,
				results: [],
				items: [PENTATONIC_MAJOR, PENTATONIC_MINOR]
			},
			mode: {
				slug: "mode",
				name: "Modes",
				isShown: false,
				results: [],
				items: [DORIAN, PHRYGIAN, LYDIAN, MIXOLYDIAN, LOCRIAN]
			},
			blues: {
				slug: "blues",
				name: "Blues",
				isShown: false,
				results: [],
				items: [BLUES_SCALE]
			}
		});
	}
	name() {
		return "Gammes";
	}
	usage() {
		return "Appuyez sur les touches du piano pour afficher les gammes correspondantes.";
	}
	noResultsText() {
		return "Aucune gamme n'a été trouvée";
	}
}

class ChordTab extends Tab {
	constructor() {
		super({
			chord: {
				slug: "chord",
				name: "Majeurs et mineurs",
				isShown: true,
				results: [],
				items: [MAJOR_CHORD, MINOR_CHORD]
			},
			otherTriad: {
				slug: "otherTriad",
				name: "Triades augmentées/diminuées",
				isShown: false,
				results: [],
				items: [DIMINISHED_CHORD, AUGMENTED_CHORD]
			},
			suspended: {
				slug: "suspended",
				name: "Suspendus",
				isShown: false,
				results: [],
				items: [SUS4, SUS2]
			},
			seventh: {
				slug: "seventh",
				name: "Septièmes de dominante",
				isShown: false,
				results: [],
				items: [DOMINANT_SEVENTH]
			},
			otherSeventh: {
				slug: "otherSeventh",
				name: "Septièmes d'espèces",
				isShown: false,
				results: [],
				items: [MAJOR_SEVENTH, AUGMENTED_MAJOR_SEVENTH, MINOR_MAJOR_SEVENTH,
						MINOR_SEVENTH, HALF_DIMINISHED_SEVENTH, DIMINISHED_SEVENTH]
			}
		});
	}
	name() {
		return "Accords";
	}
	usage() {
		return "Appuyez sur les touches du piano pour afficher les accords correspondants.";
	}
	noResultsText() {
		return "Aucun accord n'a été trouvé";
	}
}

function firstFilteredKey(state) {
	for (let category of state.activeTab.activeCategories()) {
		if (category.results.length > 0)
			return category.results[0];
	}
	return null;
}

function keyInResults(state, key) {
	if (!key) {
		return false;
	}

	for (let category of state.activeTab.activeCategories()) {
		for (let k of category.results) {
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

function pianoKeysPressed(state) {
	return _.some(state.piano);
}

const SCALE_TAB = new ScaleTab();
const CHORD_TAB = new ChordTab();

export default new Vuex.Store({
	state: {
		piano: Array(12).fill(false),
		selectedKey: null,
		activeTab: SCALE_TAB,
		scales: SCALE_TAB,
		chords: CHORD_TAB
	},
	mutations: {
		pressKey(state, keyIndex) {
			Vue.set(state.piano, keyIndex, !state.piano[keyIndex]);
			const bitstring = state.piano.map(key => key ? "1" : "0").join("");
			for (let tab of [SCALE_TAB, CHORD_TAB]) {
				for (let [, category] of Object.entries(tab.categories)) {
					Vue.set(category, 'results', findKeys(bitstring, category.items));
				}
			}
			updateSelectedKey(state);
		},
		changeTab(state, tab) {
			state.activeTab = tab;
			if (pianoKeysPressed(state))
				updateSelectedKey(state);
			else
				state.selectedKey = null;
		},
		filterKeys(state, slug) {
			const category = state.activeTab.categories[slug];
			Vue.set(category, 'isShown', !category.isShown);
			updateSelectedKey(state);
		},
		selectKey(state, key) {
			state.selectedKey = key;
		}
	},
	getters: {
		pianoKeysPressed,
	}
});
