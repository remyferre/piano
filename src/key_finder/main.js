import _ from 'lodash';
import {NOTES} from './notes.js';

class Key {

	constructor(tonic, scale) {
		this.tonic = tonic;
		this.scale = scale;
		this.notes = this.scale.notes(this.tonic);
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
		return this.scale.category == other.scale.category && this.name() == other.name();
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
					if (!key.isTheoretical())
						enharmonicKeys.push(key);
				}
				// if (enharmonicKeys.length > 0)
				// keys.push(enharmonicKeys[0]);
				keys.push(...enharmonicKeys);
			}
		}
	});
	return keys;
}
