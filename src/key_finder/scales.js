import _ from 'lodash';
import {heptatonicScaleNotes, subScaleNotes} from './strategies.js';
import {NOTES, NotePattern} from './notes.js';

export class Scale extends NotePattern {
	constructor(bitstring, name, slug, options={}) {
		options.noteAlgorithm = options.noteAlgorithm || heptatonicScaleNotes;
		super(bitstring, name, slug, options);
	}

	slug() {
		return `${this._slug}-scale`;
	}
}

export const MAJOR_SCALE = new Scale("101011010101", note => `${note} majeur`, "major");
export const MINOR_SCALE = new Scale("101101011010", note => `${note} mineur`, "minor");

export const HARMONIC_MINOR = new Scale("101101011001", note => `${note} mineur harmonique`, "harmonic-minor");
export const MELODIC_MINOR  = new Scale("101101010101", note => `${note} mineur mélodique` , "melodic-minor");

export const DORIAN     = new Scale("101101010110", note => `${note} dorien`    , "dorian");
export const PHRYGIAN   = new Scale("110101011010", note => `${note} phrygien`  , "phrygian");
export const LYDIAN     = new Scale("101010110101", note => `${note} lydien`    , "lydian");
export const MIXOLYDIAN = new Scale("101011010110", note => `${note} mixolydien`, "mixolydian");
export const LOCRIAN    = new Scale("110101101010", note => `${note} locrien`   , "locrian");

export const PENTATONIC_MAJOR = new Scale("101010010100", note => `${note} pentatonique majeur`, "major-pentatonic", {noteAlgorithm: subScaleNotes(MAJOR_SCALE, [1, 2, 3, 5, 6])});
export const PENTATONIC_MINOR = new Scale("100101010010", note => `${note} pentatonique mineur`, "minor-pentatonic", {noteAlgorithm: subScaleNotes(MINOR_SCALE, [1, 3, 4, 5, 7])});

export const BLUES_SCALE = new Scale("100101110010", note => `Blues de ${note}`, "blues", {
	noteAlgorithm(scale, tonic) {
		const notes = PENTATONIC_MINOR.notes(tonic);
		const useSharps = _.some(
			notes.map(note => note.accidental),
			accidental => accidental == "♯" || accidental == "♯♯");
		const blueNotes = NOTES[(tonic.index + 6) % 12];
		const naturalBlueNote = _.find(blueNotes, note => note.accidental == "");
		const flattedBlueNote = _.find(blueNotes, note => note.accidental == "♭");
		const sharpedBlueNote = _.find(blueNotes, note => note.accidental == "♯");
		const blueNote = naturalBlueNote || (useSharps ? sharpedBlueNote : flattedBlueNote);
		notes.splice(3, 0, blueNote);
		if (blueNote == flattedBlueNote) {
			notes[4].accidental = "♮";
		}
		return notes;
	}
});

export const SCALE_CATEGORIES = {
	"main"      : [MAJOR_SCALE, MINOR_SCALE],
	"otherMinor": [HARMONIC_MINOR, MELODIC_MINOR,],
	"mode"      : [DORIAN, PHRYGIAN, LYDIAN, MIXOLYDIAN, LOCRIAN],
	"pentatonic": [PENTATONIC_MAJOR, PENTATONIC_MINOR],
	"blues": [BLUES_SCALE]
};
