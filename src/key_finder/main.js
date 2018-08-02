import _ from 'lodash';
import {NOTES} from './notes.js';
import {Scale} from './scales.js';

class Key {

	constructor(tonic, scale) {
		this.tonic = tonic;
		this.scale = scale;
		this.notes = this.scale.notes(this.tonic);
	}

	slug() {
		return `${this.tonic.englishName().toLowerCase()}-${this.scale.slug()}`;
	}

	shortName() {
		return this.scale.shortName(this.tonic.name());
	}

	name() {
		return this.scale.name(this.tonic.name());
	}

	isTheoretical() {
		for (let note of this.notes)
			if (note.accidental.length > 1)
				return true;
		return false;
	}

	equals(other) {
		return this.slug() == other.slug();
	}
}

export function findKeys(notes, scales) {
	if (notes == "000000000000")
		return [];

	const modes = _.times(12, (i) => {
		const bitstring = notes.slice(i, 12) + notes.slice(0, i);
		return parseInt(bitstring, 2);
	});

	const keys = [];
	modes.forEach((mode, i) => {
		for (var scale of scales) {
			if (scale.match(mode)) {
				const enharmonicKeys = [];
				for (let note of NOTES[i]) {
					const key = new Key(note, scale);
					if (!key.tonic.hasAccidental() || !key.isTheoretical())
						enharmonicKeys.push(key);
				}
				if (enharmonicKeys.length == 1) {
					keys.push(enharmonicKeys[0]);
				}
				else if (enharmonicKeys.length == 2) {
					if (scale instanceof Scale) {
						const firstKey = enharmonicKeys[0];
						const secondKey = enharmonicKeys[1];
						if (!firstKey.tonic.hasAccidental() && secondKey.tonic.hasAccidental())
							keys.push(firstKey);
						else {
							const firstKeyAccidentals = firstKey.notes.filter(note => note.hasAccidental()).length;
							const secondKeyAccidentals = secondKey.notes.filter(note => note.hasAccidental()).length;
							if (firstKeyAccidentals == secondKeyAccidentals)
								keys.push(...enharmonicKeys);
							else if (firstKeyAccidentals < secondKeyAccidentals)
								keys.push(firstKey);
							else
								keys.push(secondKey);
						}
					}
					else {
						keys.push(...enharmonicKeys);
					}
				}
			}
		}
	});
	return keys.sort((k1, k2) => k1.tonic.naturalNote.index - k2.tonic.naturalNote.index);
}
