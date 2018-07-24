import {subScaleNotes, alteredNotes} from './strategies.js';
import {Scale, MAJOR_SCALE, MINOR_SCALE, MIXOLYDIAN, HARMONIC_MINOR, LOCRIAN} from './scales.js';

const Chord = Scale;

const MAJOR_CHORD = new Chord("100010010000", note => `${note} majeur`, "chord", {noteAlgorithm: subScaleNotes(MAJOR_SCALE, [1, 3, 5])});
const MINOR_CHORD = new Chord("100100010000", note => `${note} mineur`, "chord", {noteAlgorithm: subScaleNotes(MINOR_SCALE, [1, 3, 5])});

const DIMINISHED_CHORD = new Chord("100100100000", note => `${note} diminué` , "otherTriad", {noteAlgorithm: alteredNotes(subScaleNotes(MINOR_SCALE, [1, 3, 5]), [[3, -1]])});
const AUGMENTED_CHORD  = new Chord("100010001000", note => `${note} augmenté`, "otherTriad", {noteAlgorithm: alteredNotes(subScaleNotes(MAJOR_SCALE, [1, 3, 5]), [[3, +1]])});

const SUS4 = new Chord("100001010000", note => `${note} <sup>sus4</sup>`, "suspended", {noteAlgorithm: subScaleNotes(MAJOR_SCALE, [1, 4, 5])});
const SUS2 = new Chord("101000010000", note => `${note} <sup>sus2</sup>`, "suspended", {noteAlgorithm: subScaleNotes(MAJOR_SCALE, [1, 2, 5])});

const DOMINANT_SEVENTH = new Chord("100010010010", note => `septième de dominante de ${note}`, "seventh", {noteAlgorithm: subScaleNotes(MIXOLYDIAN, [1, 3, 5, 7]), shortName: note => `${note}<sup>7</sup>`});

const MAJOR_SEVENTH           = new Chord("100010010001", note => `septième majeure de ${note}`                    , "otherSeventh", {noteAlgorithm: subScaleNotes(MAJOR_SCALE   , [1, 3, 5, 7])                   , shortName: note => `${note} maj<sup>7</sup>`});
const AUGMENTED_MAJOR_SEVENTH = new Chord("100010001001", note => `septième majeure et quinte augmentée de ${note}`, "otherSeventh", {noteAlgorithm: alteredNotes(MAJOR_SEVENTH.noteAlgorithm, [[3, +1]])          , shortName: note => `${note} aug<sup>maj7</sup>`});
const MINOR_MAJOR_SEVENTH     = new Chord("100100010001", note => `septième majeure et parfait mineur de ${note}`  , "otherSeventh", {noteAlgorithm: subScaleNotes(HARMONIC_MINOR, [1, 3, 5, 7])                   , shortName: note => `${note} min<sup>maj7</sup>`});
const MINOR_SEVENTH           = new Chord("100100010010", note => `septième mineure de ${note}                 `   , "otherSeventh", {noteAlgorithm: subScaleNotes(MINOR_SCALE   , [1, 3, 5, 7])                   , shortName: note => `${note} min<sup>7</sup>`});
const HALF_DIMINISHED_SEVENTH = new Chord("100100100010", note => `septième mineure et quinte diminuée de ${note}` , "otherSeventh", {noteAlgorithm: subScaleNotes(LOCRIAN       , [1, 3, 5, 7])                   , shortName: note => `${note}<sup>ø7</sup>`});
const DIMINISHED_SEVENTH      = new Chord("100100100100", note => `septième diminuée de ${note}                `   , "otherSeventh", {noteAlgorithm: alteredNotes(HALF_DIMINISHED_SEVENTH.noteAlgorithm, [[4, -1]]), shortName: note => `${note}<sup>o7</sup>`});

export const CHORD_CATEGORIES = {
	"chord": [MAJOR_CHORD, MINOR_CHORD],
	"otherTriad": [DIMINISHED_CHORD, AUGMENTED_CHORD],
	"suspended": [SUS4, SUS2],
	"seventh": [DOMINANT_SEVENTH],
	"otherSeventh": [AUGMENTED_MAJOR_SEVENTH, MAJOR_SEVENTH, MINOR_MAJOR_SEVENTH, MINOR_SEVENTH, HALF_DIMINISHED_SEVENTH, DIMINISHED_SEVENTH]
};
