import _ from 'lodash';
import {DO, RE, MI, FA, SOL, LA, SI, Note, ACCIDENTALS} from './notes.js';

const NEXT_NATURAL_NOTES = new Map([
	[DO , [RE , 2]],
	[RE , [MI , 2]],
	[MI , [FA , 1]],
	[FA , [SOL, 2]],
	[SOL, [LA , 2]],
	[LA , [SI , 2]],
	[SI , [DO , 1]]
]);

export function heptatonicScaleNotes(scale, tonic) {
	const notes = [tonic];
	const bitstring = scale.bitstring.slice(1);
	let currentNote = tonic;
	let semitones = tonic.accidental.length * (tonic.accidental.indexOf("♯") != -1 ? 1 : -1);
	let numAccidentals = semitones;
	for (let bit of bitstring) {
		semitones += 1;
		if (bit == "1") {
			const [nextNaturalNote, semitonesToNextNaturalNote] = NEXT_NATURAL_NOTES.get(currentNote.naturalNote);
			const index = (currentNote.index + semitones - numAccidentals) % 12;
			numAccidentals = semitones - semitonesToNextNaturalNote;
			currentNote = new Note(index, nextNaturalNote, ACCIDENTALS.get(numAccidentals));
			notes.push(currentNote);
			semitones = numAccidentals;
		}
	}
	return notes;
}

export function subScaleNotes(baseScale, degrees) {
	return function(scale, tonic) {
		return baseScale.notes(tonic).filter(
			(note, i) => _.includes(degrees, i+1)
		);
	};
}

export function alteredNotes(noteAlgorithm, alterations) {
	return function(scale, tonic) {
		const notes = noteAlgorithm(scale, tonic);
		for (let [i, alteration] of alterations) {
			notes[i-1] = notes[i-1].alter(alteration);
		}
		return notes;
	};
}
