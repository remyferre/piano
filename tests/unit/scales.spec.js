import _ from 'lodash';
import {
	MAJOR_SCALE, MINOR_SCALE, HARMONIC_MINOR, MELODIC_MINOR, DORIAN, PHRYGIAN,
	LYDIAN, MIXOLYDIAN, LOCRIAN, PENTATONIC_MAJOR, PENTATONIC_MINOR, BLUES_SCALE
} from '@/key_finder/scales.js';
import { findKeys } from '@/key_finder/main.js';

export function assertKeysFound(scale, pianoNotes, expectedKeys) {
	const keys = findKeys(pianoNotes, [scale]);
	for (let [key, [expectedKey, expectedNotes]] of _.zip(keys, expectedKeys)) {
		expect(key && key.name()).toEqual(expectedKey);
		expect(key.notes.map(note => note.name())).toEqual(expectedNotes);
	}
}

test('Major', () => {
	assertKeysFound(MAJOR_SCALE, "101011010101", [
		["Do majeur", ["Do", "Ré", "Mi", "Fa", "Sol", "La", "Si"]],
	]);
	assertKeysFound(MAJOR_SCALE, "101010110101", [
		["Sol majeur", ["Sol", "La", "Si", "Do", "Ré", "Mi", "Fa♯"]],
	]);
	assertKeysFound(MAJOR_SCALE, "011010110101", [
		["Ré majeur", ["Ré", "Mi", "Fa♯", "Sol", "La", "Si", "Do♯"]],
	]);
	assertKeysFound(MAJOR_SCALE, "011010101101", [
		["La majeur", ["La", "Si", "Do♯", "Ré", "Mi", "Fa♯", "Sol♯"]],
	]);
	assertKeysFound(MAJOR_SCALE, "010110101101", [
		["Mi majeur", ["Mi", "Fa♯", "Sol♯", "La", "Si", "Do♯", "Ré♯"]],
	]);
	assertKeysFound(MAJOR_SCALE, "010110101011", [
		["Si majeur" , ["Si", "Do♯", "Ré♯", "Mi", "Fa♯", "Sol♯", "La♯"]],
		// ["Do♭ majeur", ["Do♭", "Ré♭", "Mi♭", "Fa♭", "Sol♭", "La♭", "Si♭"]],
	]);
	assertKeysFound(MAJOR_SCALE, "010101101011", [
		["Fa♯ majeur" , ["Fa♯", "Sol♯", "La♯", "Si", "Do♯", "Ré♯", "Mi♯"]],
		["Sol♭ majeur", ["Sol♭", "La♭", "Si♭", "Do♭", "Ré♭", "Mi♭", "Fa"]],
	]);
	assertKeysFound(MAJOR_SCALE, "110101101010", [
		// ["Do♯ majeur", ["Do♯", "Ré♯", "Mi♯", "Fa♯", "Sol♯", "La♯", "Si♯"]],
		["Ré♭ majeur", ["Ré♭", "Mi♭", "Fa", "Sol♭", "La♭", "Si♭", "Do"]],
	]);
	assertKeysFound(MAJOR_SCALE, "110101011010", [
		["La♭ majeur", ["La♭", "Si♭", "Do", "Ré♭", "Mi♭", "Fa", "Sol"]],
	]);
	assertKeysFound(MAJOR_SCALE, "101101011010", [
		["Mi♭ majeur", ["Mi♭", "Fa", "Sol", "La♭", "Si♭", "Do", "Ré"]],
	]);
	assertKeysFound(MAJOR_SCALE, "101101010110", [
		["Si♭ majeur", ["Si♭", "Do", "Ré", "Mi♭", "Fa", "Sol", "La"]],
	]);
	assertKeysFound(MAJOR_SCALE, "101011010110", [
		["Fa majeur", ["Fa", "Sol", "La", "Si♭", "Do", "Ré", "Mi"]],
	]);
});


test('Natural minor', () => {
	assertKeysFound(MINOR_SCALE, "101011010101", [
		["La mineur", ["La", "Si", "Do", "Ré", "Mi", "Fa", "Sol"]],
	]);
	assertKeysFound(MINOR_SCALE, "101010110101", [
		["Mi mineur", ["Mi", "Fa♯", "Sol", "La", "Si", "Do", "Ré"]],
	]);
	assertKeysFound(MINOR_SCALE, "011010110101", [
		["Si mineur", ["Si", "Do♯", "Ré", "Mi", "Fa♯", "Sol", "La"]],
	]);
	assertKeysFound(MINOR_SCALE, "011010101101", [
		["Fa♯ mineur", ["Fa♯", "Sol♯", "La", "Si", "Do♯", "Ré", "Mi"]],
	]);
	assertKeysFound(MINOR_SCALE, "010110101101", [
		["Do♯ mineur", ["Do♯", "Ré♯", "Mi", "Fa♯", "Sol♯", "La", "Si"]],
	]);
	assertKeysFound(MINOR_SCALE, "010110101011", [
		["Sol♯ mineur", ["Sol♯", "La♯", "Si", "Do♯", "Ré♯", "Mi", "Fa♯"]],
		// ["La♭ mineur", ["La♭", "Si♭", "Do♭", "Ré♭", "Mi♭", "Fa♭", "Sol♭"]],
	]);
	assertKeysFound(MINOR_SCALE, "010101101011", [
		["Ré♯ mineur", ["Ré♯", "Mi♯", "Fa♯", "Sol♯", "La♯", "Si", "Do♯"]],
		["Mi♭ mineur", ["Mi♭", "Fa", "Sol♭", "La♭", "Si♭", "Do♭", "Ré♭"]],
	]);
	assertKeysFound(MINOR_SCALE, "110101101010", [
		// ["La♯ mineur", ["La♯", "Si♯", "Do♯", "Ré♯", "Mi♯", "Fa♯", "Sol♯"]],
		["Si♭ mineur", ["Si♭", "Do", "Ré♭", "Mi♭", "Fa", "Sol♭", "La♭"]],
	]);
	assertKeysFound(MINOR_SCALE, "110101011010", [
		["Fa mineur", ["Fa", "Sol", "La♭", "Si♭", "Do", "Ré♭", "Mi♭"]],
	]);
	assertKeysFound(MINOR_SCALE, "101101011010", [
		["Do mineur", ["Do", "Ré", "Mi♭", "Fa", "Sol", "La♭", "Si♭"]],
	]);
	assertKeysFound(MINOR_SCALE, "101101010110", [
		["Sol mineur", ["Sol", "La", "Si♭", "Do", "Ré", "Mi♭", "Fa"]],
	]);
	assertKeysFound(MINOR_SCALE, "101011010110", [
		["Ré mineur", ["Ré", "Mi", "Fa", "Sol", "La", "Si♭", "Do"]],
	]);
});


test('Harmonic minor', () => {
	assertKeysFound(HARMONIC_MINOR, "101011001101", [
		["La mineur harmonique", ["La", "Si", "Do", "Ré", "Mi", "Fa", "Sol♯"]],
	]);
	assertKeysFound(HARMONIC_MINOR, "100110110101", [
		["Mi mineur harmonique", ["Mi", "Fa♯", "Sol", "La", "Si", "Do", "Ré♯"]],
	]);
	assertKeysFound(HARMONIC_MINOR, "011010110011", [
		["Si mineur harmonique", ["Si", "Do♯", "Ré", "Mi", "Fa♯", "Sol", "La♯"]],
	]);
	assertKeysFound(HARMONIC_MINOR, "011001101101", [
		["Fa♯ mineur harmonique", ["Fa♯", "Sol♯", "La", "Si", "Do♯", "Ré", "Mi♯"]],
	]);
	assertKeysFound(HARMONIC_MINOR, "110110101100", [
		["Do♯ mineur harmonique", ["Do♯", "Ré♯", "Mi", "Fa♯", "Sol♯", "La", "Si♯"]],
	]);
	assertKeysFound(HARMONIC_MINOR, "010110011011", [
		["La♭ mineur harmonique", ["La♭", "Si♭", "Do♭", "Ré♭", "Mi♭", "Fa♭", "Sol"]],
	]);
	assertKeysFound(HARMONIC_MINOR, "001101101011", [
		["Mi♭ mineur harmonique", ["Mi♭", "Fa", "Sol♭", "La♭", "Si♭", "Do♭", "Ré"]],
	]);
	assertKeysFound(HARMONIC_MINOR, "110101100110", [
		["Si♭ mineur harmonique", ["Si♭", "Do", "Ré♭", "Mi♭", "Fa", "Sol♭", "La"]],
	]);
	assertKeysFound(HARMONIC_MINOR, "110011011010", [
		["Fa mineur harmonique", ["Fa", "Sol", "La♭", "Si♭", "Do", "Ré♭", "Mi"]],
	]);
	assertKeysFound(HARMONIC_MINOR, "101101011001", [
		["Do mineur harmonique", ["Do", "Ré", "Mi♭", "Fa", "Sol", "La♭", "Si"]],
	]);
	assertKeysFound(HARMONIC_MINOR, "101100110110", [
		["Sol mineur harmonique", ["Sol", "La", "Si♭", "Do", "Ré", "Mi♭", "Fa♯"]],
	]);
	assertKeysFound(HARMONIC_MINOR, "011011010110", [
		["Ré mineur harmonique", ["Ré", "Mi", "Fa", "Sol", "La", "Si♭", "Do♯"]],
	]);
});


test('Melodic minor', () => {
	assertKeysFound(MELODIC_MINOR, "101010101101", [
		["La mineur mélodique", ["La", "Si", "Do", "Ré", "Mi", "Fa♯", "Sol♯"]],
	]);
	assertKeysFound(MELODIC_MINOR, "010110110101", [
		["Mi mineur mélodique", ["Mi", "Fa♯", "Sol", "La", "Si", "Do♯", "Ré♯"]],
	]);
	assertKeysFound(MELODIC_MINOR, "011010101011", [
		["Si mineur mélodique", ["Si", "Do♯", "Ré", "Mi", "Fa♯", "Sol♯", "La♯"]],
	]);
	assertKeysFound(MELODIC_MINOR, "010101101101", [
		["Fa♯ mineur mélodique", ["Fa♯", "Sol♯", "La", "Si", "Do♯", "Ré♯", "Mi♯"]],
	]);
	assertKeysFound(MELODIC_MINOR, "110110101010", [
		["Do♯ mineur mélodique", ["Do♯", "Ré♯", "Mi", "Fa♯", "Sol♯", "La♯", "Si♯"]],
		["Ré♭ mineur mélodique", ["Ré♭", "Mi♭", "Fa♭", "Sol♭", "La♭", "Si♭", "Do"]],
	]);
	assertKeysFound(MELODIC_MINOR, "010101011011", [
		["La♭ mineur mélodique", ["La♭", "Si♭", "Do♭", "Ré♭", "Mi♭", "Fa", "Sol"]],
	]);
	assertKeysFound(MELODIC_MINOR, "101101101010", [
		["Mi♭ mineur mélodique", ["Mi♭", "Fa", "Sol♭", "La♭", "Si♭", "Do", "Ré"]],
	]);
	assertKeysFound(MELODIC_MINOR, "110101010110", [
		["Si♭ mineur mélodique", ["Si♭", "Do", "Ré♭", "Mi♭", "Fa", "Sol", "La"]],
	]);
	assertKeysFound(MELODIC_MINOR, "101011011010", [
		["Fa mineur mélodique", ["Fa", "Sol", "La♭", "Si♭", "Do", "Ré", "Mi"]],
	]);
	assertKeysFound(MELODIC_MINOR, "101101010101", [
		["Do mineur mélodique", ["Do", "Ré", "Mi♭", "Fa", "Sol", "La", "Si"]],
	]);
	assertKeysFound(MELODIC_MINOR, "101010110110", [
		["Sol mineur mélodique", ["Sol", "La", "Si♭", "Do", "Ré", "Mi", "Fa♯"]],
	]);
	assertKeysFound(MELODIC_MINOR, "011011010101", [
		["Ré mineur mélodique", ["Ré", "Mi", "Fa", "Sol", "La", "Si", "Do♯"]],
	]);
});


test('Dorian', () => {
	assertKeysFound(DORIAN, "101010110101", [
		["La dorien", ["La", "Si", "Do", "Ré", "Mi", "Fa♯", "Sol"]],
	]);
	assertKeysFound(DORIAN, "011010110101", [
		["Mi dorien", ["Mi", "Fa♯", "Sol", "La", "Si", "Do♯", "Ré"]],
	]);
	assertKeysFound(DORIAN, "011010101101", [
		["Si dorien", ["Si", "Do♯", "Ré", "Mi", "Fa♯", "Sol♯", "La"]],
	]);
	assertKeysFound(DORIAN, "010110101101", [
		["Fa♯ dorien", ["Fa♯", "Sol♯", "La", "Si", "Do♯", "Ré♯", "Mi"]],
	]);
	assertKeysFound(DORIAN, "010110101011", [
		["Do♯ dorien", ["Do♯", "Ré♯", "Mi", "Fa♯", "Sol♯", "La♯", "Si"]],
		// ["Ré♭ dorien", ["Ré♭", "Mi♭", "Fa♭", "Sol♭", "La♭", "Si♭", "Do♭"]],
	]);
	assertKeysFound(DORIAN, "010101101011", [
		["Sol♯ dorien", ["Sol♯", "La♯", "Si", "Do♯", "Ré♯", "Mi♯", "Fa♯"]],
		["La♭ dorien", ["La♭", "Si♭", "Do♭", "Ré♭", "Mi♭", "Fa", "Sol♭"]],
	]);
	assertKeysFound(DORIAN, "110101101010", [
		// ["Ré♯ dorien", ["Ré♯", "Mi♯", "Fa♯", "Sol♯", "La♯", "Si♯", "Do♯"]],
		["Mi♭ dorien", ["Mi♭", "Fa", "Sol♭", "La♭", "Si♭", "Do", "Ré♭"]],
	]);
	assertKeysFound(DORIAN, "110101011010", [
		["Si♭ dorien", ["Si♭", "Do", "Ré♭", "Mi♭", "Fa", "Sol", "La♭"]],
	]);
	assertKeysFound(DORIAN, "101101011010", [
		["Fa dorien", ["Fa", "Sol", "La♭", "Si♭", "Do", "Ré", "Mi♭"]],
	]);
	assertKeysFound(DORIAN, "101101010110", [
		["Do dorien", ["Do", "Ré", "Mi♭", "Fa", "Sol", "La", "Si♭"]],
	]);
	assertKeysFound(DORIAN, "101011010110", [
		["Sol dorien", ["Sol", "La", "Si♭", "Do", "Ré", "Mi", "Fa"]],
	]);
	assertKeysFound(DORIAN, "101011010101", [
		["Ré dorien", ["Ré", "Mi", "Fa", "Sol", "La", "Si", "Do"]],
	]);
});


test('Phrygian', () => {
	assertKeysFound(PHRYGIAN, "101011010110", [
		["La phrygien", ["La", "Si♭", "Do", "Ré", "Mi", "Fa", "Sol"]],
	]);
	assertKeysFound(PHRYGIAN, "101011010101", [
		["Mi phrygien", ["Mi", "Fa", "Sol", "La", "Si", "Do", "Ré"]],
	]);
	assertKeysFound(PHRYGIAN, "101010110101", [
		["Si phrygien", ["Si", "Do", "Ré", "Mi", "Fa♯", "Sol", "La"]],
	]);
	assertKeysFound(PHRYGIAN, "011010110101", [
		["Fa♯ phrygien", ["Fa♯", "Sol", "La", "Si", "Do♯", "Ré", "Mi"]],
	]);
	assertKeysFound(PHRYGIAN, "011010101101", [
		["Do♯ phrygien", ["Do♯", "Ré", "Mi", "Fa♯", "Sol♯", "La", "Si"]],
	]);
	assertKeysFound(PHRYGIAN, "010110101101", [
		["Sol♯ phrygien", ["Sol♯", "La", "Si", "Do♯", "Ré♯", "Mi", "Fa♯"]],
	]);
	assertKeysFound(PHRYGIAN, "010110101011", [
		["Ré♯ phrygien", ["Ré♯", "Mi", "Fa♯", "Sol♯", "La♯", "Si", "Do♯"]],
		// ["Mi♭ phrygien", ["Mi♭", "Fa♭", "Sol♭", "La♭", "Si♭", "Do♭", "Ré♭"]],
	]);
	assertKeysFound(PHRYGIAN, "010101101011", [
		["La♯ phrygien", ["La♯", "Si", "Do♯", "Ré♯", "Mi♯", "Fa♯", "Sol♯"]],
		["Si♭ phrygien", ["Si♭", "Do♭", "Ré♭", "Mi♭", "Fa", "Sol♭", "La♭"]],
	]);
	assertKeysFound(PHRYGIAN, "110101101010", [
		["Fa phrygien", ["Fa", "Sol♭", "La♭", "Si♭", "Do", "Ré♭", "Mi♭"]],
		// ["Mi♯ phrygien", ["Mi♯", "Fa♯", "Sol♯", "La♯", "Si♯", "Do♯", "Ré♯"]],
	]);
	assertKeysFound(PHRYGIAN, "110101011010", [
		["Do phrygien", ["Do", "Ré♭", "Mi♭", "Fa", "Sol", "La♭", "Si♭"]],
	]);
	assertKeysFound(PHRYGIAN, "101101011010", [
		["Sol phrygien", ["Sol", "La♭", "Si♭", "Do", "Ré", "Mi♭", "Fa"]],
	]);
	assertKeysFound(PHRYGIAN, "101101010110", [
		["Ré phrygien", ["Ré", "Mi♭", "Fa", "Sol", "La", "Si♭", "Do"]],
	]);
});


test('Lydian', () => {
	assertKeysFound(LYDIAN, "101010110101", [
		["Do lydien", ["Do", "Ré", "Mi", "Fa♯", "Sol", "La", "Si"]],
	]);
	assertKeysFound(LYDIAN, "011010110101", [
		["Sol lydien", ["Sol", "La", "Si", "Do♯", "Ré", "Mi", "Fa♯"]],
	]);
	assertKeysFound(LYDIAN, "011010101101", [
		["Ré lydien", ["Ré", "Mi", "Fa♯", "Sol♯", "La", "Si", "Do♯"]],
	]);
	assertKeysFound(LYDIAN, "010110101101", [
		["La lydien", ["La", "Si", "Do♯", "Ré♯", "Mi", "Fa♯", "Sol♯"]],
	]);
	assertKeysFound(LYDIAN, "010110101011", [
		["Mi lydien", ["Mi", "Fa♯", "Sol♯", "La♯", "Si", "Do♯", "Ré♯"]],
		// ["Fa♭ lydien", ["Fa♭", "Sol♭", "La♭", "Si♭", "Do♭", "Ré♭", "Mi♭"]],
	]);
	assertKeysFound(LYDIAN, "010101101011", [
		["Si lydien", ["Si", "Do♯", "Ré♯", "Mi♯", "Fa♯", "Sol♯", "La♯"]],
		// ["Do♭ lydien", ["Do♭", "Ré♭", "Mi♭", "Fa", "Sol♭", "La♭", "Si♭"]],
	]);
	assertKeysFound(LYDIAN, "110101101010", [
		// ["Fa♯ lydien", ["Fa♯", "Sol♯", "La♯", "Si♯", "Do♯", "Ré♯", "Mi♯"]],
		["Sol♭ lydien", ["Sol♭", "La♭", "Si♭", "Do", "Ré♭", "Mi♭", "Fa"]],
	]);
	assertKeysFound(LYDIAN, "110101011010", [
		["Ré♭ lydien", ["Ré♭", "Mi♭", "Fa", "Sol", "La♭", "Si♭", "Do"]],
	]);
	assertKeysFound(LYDIAN, "101101011010", [
		["La♭ lydien", ["La♭", "Si♭", "Do", "Ré", "Mi♭", "Fa", "Sol"]],
	]);
	assertKeysFound(LYDIAN, "101101010110", [
		["Mi♭ lydien", ["Mi♭", "Fa", "Sol", "La", "Si♭", "Do", "Ré"]],
	]);
	assertKeysFound(LYDIAN, "101011010110", [
		["Si♭ lydien", ["Si♭", "Do", "Ré", "Mi", "Fa", "Sol", "La"]],
	]);
	assertKeysFound(LYDIAN, "101011010101", [
		["Fa lydien", ["Fa", "Sol", "La", "Si", "Do", "Ré", "Mi"]],
	]);
});


test('Mixolydian', () => {
	assertKeysFound(MIXOLYDIAN, "101011010110", [
		["Do mixolydien", ["Do", "Ré", "Mi", "Fa", "Sol", "La", "Si♭"]],
	]);
	assertKeysFound(MIXOLYDIAN, "101011010101", [
		["Sol mixolydien", ["Sol", "La", "Si", "Do", "Ré", "Mi", "Fa"]],
	]);
	assertKeysFound(MIXOLYDIAN, "101010110101", [
		["Ré mixolydien", ["Ré", "Mi", "Fa♯", "Sol", "La", "Si", "Do"]],
	]);
	assertKeysFound(MIXOLYDIAN, "011010110101", [
		["La mixolydien", ["La", "Si", "Do♯", "Ré", "Mi", "Fa♯", "Sol"]],
	]);
	assertKeysFound(MIXOLYDIAN, "011010101101", [
		["Mi mixolydien", ["Mi", "Fa♯", "Sol♯", "La", "Si", "Do♯", "Ré"]],
	]);
	assertKeysFound(MIXOLYDIAN, "010110101101", [
		["Si mixolydien", ["Si", "Do♯", "Ré♯", "Mi", "Fa♯", "Sol♯", "La"]],
	]);
	assertKeysFound(MIXOLYDIAN, "010110101011", [
		["Fa♯ mixolydien", ["Fa♯", "Sol♯", "La♯", "Si", "Do♯", "Ré♯", "Mi"]],
		// ["Sol♭ mixolydien", ["Sol♭", "La♭", "Si♭", "Do♭", "Ré♭", "Mi♭", "Fa♭"]],
	]);
	assertKeysFound(MIXOLYDIAN, "010101101011", [
		["Do♯ mixolydien", ["Do♯", "Ré♯", "Mi♯", "Fa♯", "Sol♯", "La♯", "Si"]],
		["Ré♭ mixolydien", ["Ré♭", "Mi♭", "Fa", "Sol♭", "La♭", "Si♭", "Do♭"]],
	]);
	assertKeysFound(MIXOLYDIAN, "110101101010", [
		// ["Sol♯ mixolydien", ["Sol♯", "La♯", "Si♯", "Do♯", "Ré♯", "Mi♯", "Fa♯"]],
		["La♭ mixolydien", ["La♭", "Si♭", "Do", "Ré♭", "Mi♭", "Fa", "Sol♭"]],
	]);
	assertKeysFound(MIXOLYDIAN, "110101011010", [
		["Mi♭ mixolydien", ["Mi♭", "Fa", "Sol", "La♭", "Si♭", "Do", "Ré♭"]],
	]);
	assertKeysFound(MIXOLYDIAN, "101101011010", [
		["Si♭ mixolydien", ["Si♭", "Do", "Ré", "Mi♭", "Fa", "Sol", "La♭"]],
	]);
	assertKeysFound(MIXOLYDIAN, "101101010110", [
		["Fa mixolydien", ["Fa", "Sol", "La", "Si♭", "Do", "Ré", "Mi♭"]],
	]);
});


test('Locrian', () => {
	assertKeysFound(LOCRIAN, "101101010110", [
		["La locrien", ["La", "Si♭", "Do", "Ré", "Mi♭", "Fa", "Sol"]],
	]);
	assertKeysFound(LOCRIAN, "101011010110", [
		["Mi locrien", ["Mi", "Fa", "Sol", "La", "Si♭", "Do", "Ré"]],
	]);
	assertKeysFound(LOCRIAN, "101011010101", [
		["Si locrien", ["Si", "Do", "Ré", "Mi", "Fa", "Sol", "La"]],
	]);
	assertKeysFound(LOCRIAN, "101010110101", [
		["Fa♯ locrien", ["Fa♯", "Sol", "La", "Si", "Do", "Ré", "Mi"]],
	]);
	assertKeysFound(LOCRIAN, "011010110101", [
		["Do♯ locrien", ["Do♯", "Ré", "Mi", "Fa♯", "Sol", "La", "Si"]],
	]);
	assertKeysFound(LOCRIAN, "011010101101", [
		["Sol♯ locrien", ["Sol♯", "La", "Si", "Do♯", "Ré", "Mi", "Fa♯"]],
	]);
	assertKeysFound(LOCRIAN, "010110101101", [
		["Ré♯ locrien", ["Ré♯", "Mi", "Fa♯", "Sol♯", "La", "Si", "Do♯"]],
	]);
	assertKeysFound(LOCRIAN, "010110101011", [
		["La♯ locrien", ["La♯", "Si", "Do♯", "Ré♯", "Mi", "Fa♯", "Sol♯"]],
		// ["Si♭ locrien", ["Si♭", "Do♭", "Ré♭", "Mi♭", "Fa♭", "Sol♭", "La♭"]],
	]);
	assertKeysFound(LOCRIAN, "010101101011", [
		["Fa locrien", ["Fa", "Sol♭", "La♭", "Si♭", "Do♭", "Ré♭", "Mi♭"]],
		// ["Mi♯ locrien", ["Mi♯", "Fa♯", "Sol♯", "La♯", "Si", "Do♯", "Ré♯"]],
	]);
	assertKeysFound(LOCRIAN, "110101101010", [
		["Do locrien", ["Do", "Ré♭", "Mi♭", "Fa", "Sol♭", "La♭", "Si♭"]],
		// ["Si♯ locrien", ["Si♯", "Do♯", "Ré♯", "Mi♯", "Fa♯", "Sol♯", "La♯"]],
	]);
	assertKeysFound(LOCRIAN, "110101011010", [
		["Sol locrien", ["Sol", "La♭", "Si♭", "Do", "Ré♭", "Mi♭", "Fa"]],
	]);
	assertKeysFound(LOCRIAN, "101101011010", [
		["Ré locrien", ["Ré", "Mi♭", "Fa", "Sol", "La♭", "Si♭", "Do"]],
	]);
});


test('Major pentatonic', () => {
	assertKeysFound(PENTATONIC_MAJOR, "101010010100", [
		["Do pentatonique majeur", ["Do", "Ré", "Mi", "Sol", "La"]],
	]);
	assertKeysFound(PENTATONIC_MAJOR, "001010010101", [
		["Sol pentatonique majeur", ["Sol", "La", "Si", "Ré", "Mi"]],
	]);
	assertKeysFound(PENTATONIC_MAJOR, "001010100101", [
		["Ré pentatonique majeur", ["Ré", "Mi", "Fa♯", "La", "Si"]],
	]);
	assertKeysFound(PENTATONIC_MAJOR, "010010100101", [
		["La pentatonique majeur", ["La", "Si", "Do♯", "Mi", "Fa♯"]],
	]);
	assertKeysFound(PENTATONIC_MAJOR, "010010101001", [
		["Mi pentatonique majeur", ["Mi", "Fa♯", "Sol♯", "Si", "Do♯"]],
		// ["Fa♭ pentatonique majeur", ["Fa♭", "Sol♭", "La♭", "Do♭", "Ré♭"]],
	]);
	assertKeysFound(PENTATONIC_MAJOR, "010100101001", [
		["Si pentatonique majeur" , ["Si", "Do♯", "Ré♯", "Fa♯", "Sol♯"]],
		// ["Do♭ pentatonique majeur", ["Do♭", "Ré♭", "Mi♭", "Sol♭", "La♭"]],
	]);
	assertKeysFound(PENTATONIC_MAJOR, "010100101010", [
		["Fa♯ pentatonique majeur" , ["Fa♯", "Sol♯", "La♯", "Do♯", "Ré♯"]],
		["Sol♭ pentatonique majeur", ["Sol♭", "La♭", "Si♭", "Ré♭", "Mi♭"]],
	]);
	assertKeysFound(PENTATONIC_MAJOR, "010101001010", [
		// ["Do♯ pentatonique majeur", ["Do♯", "Ré♯", "Mi♯", "Sol♯", "La♯"]],
		["Ré♭ pentatonique majeur", ["Ré♭", "Mi♭", "Fa", "La♭", "Si♭"]],
	]);
	assertKeysFound(PENTATONIC_MAJOR, "100101001010", [
		// ["Sol♯ pentatonique majeur", ["Sol♯", "La♯", "Si♯", "Ré♯", "Mi♯"]],
		["La♭ pentatonique majeur", ["La♭", "Si♭", "Do", "Mi♭", "Fa"]],
	]);
	assertKeysFound(PENTATONIC_MAJOR, "100101010010", [
		["Mi♭ pentatonique majeur", ["Mi♭", "Fa", "Sol", "Si♭", "Do"]],
	]);
	assertKeysFound(PENTATONIC_MAJOR, "101001010010", [
		["Si♭ pentatonique majeur", ["Si♭", "Do", "Ré", "Fa", "Sol"]],
	]);
	assertKeysFound(PENTATONIC_MAJOR, "101001010100", [
		["Fa pentatonique majeur", ["Fa", "Sol", "La", "Do", "Ré"]],
	]);
});


test('Minor pentatonic', () => {
	assertKeysFound(PENTATONIC_MINOR, "101010010100", [
		["La pentatonique mineur", ["La", "Do", "Ré", "Mi", "Sol"]],
	]);
	assertKeysFound(PENTATONIC_MINOR, "001010010101", [
		["Mi pentatonique mineur", ["Mi", "Sol", "La", "Si", "Ré"]],
	]);
	assertKeysFound(PENTATONIC_MINOR, "001010100101", [
		["Si pentatonique mineur", ["Si", "Ré", "Mi", "Fa♯", "La"]],
	]);
	assertKeysFound(PENTATONIC_MINOR, "010010100101", [
		["Fa♯ pentatonique mineur", ["Fa♯", "La", "Si", "Do♯", "Mi"]],
	]);
	assertKeysFound(PENTATONIC_MINOR, "010010101001", [
		["Do♯ pentatonique mineur", ["Do♯", "Mi", "Fa♯", "Sol♯", "Si"]],
		// ["Ré♭ pentatonique mineur", ["Ré♭", "Fa♭", "Sol♭", "La♭", "Do♭"]],
	]);
	assertKeysFound(PENTATONIC_MINOR, "010100101001", [
		["Sol♯ pentatonique mineur" , ["Sol♯", "Si", "Do♯", "Ré♯", "Fa♯"]],
		// ["La♭ pentatonique mineur", ["La♭", "Do♭", "Ré♭", "Mi♭", "Sol♭"]],
	]);
	assertKeysFound(PENTATONIC_MINOR, "010100101010", [
		["Ré♯ pentatonique mineur", ["Ré♯", "Fa♯", "Sol♯", "La♯", "Do♯"]],
		["Mi♭ pentatonique mineur", ["Mi♭", "Sol♭", "La♭", "Si♭", "Ré♭"]],
	]);
	assertKeysFound(PENTATONIC_MINOR, "010101001010", [
		// ["La♯ pentatonique mineur", ["La♯", "Do♯", "Ré♯", "Mi♯", "Sol♯"]],
		["Si♭ pentatonique mineur", ["Si♭", "Ré♭", "Mi♭", "Fa", "La♭"]],
	]);
	assertKeysFound(PENTATONIC_MINOR, "100101001010", [
		["Fa pentatonique mineur", ["Fa", "La♭", "Si♭", "Do", "Mi♭"]],
		// ["Mi♯ pentatonique mineur", ["Mi♯", "Sol♯", "La♯", "Si♯", "Ré♯"]],
	]);
	assertKeysFound(PENTATONIC_MINOR, "100101010010", [
		["Do pentatonique mineur", ["Do", "Mi♭", "Fa", "Sol", "Si♭"]],
	]);
	assertKeysFound(PENTATONIC_MINOR, "101001010010", [
		["Sol pentatonique mineur", ["Sol", "Si♭", "Do", "Ré", "Fa"]],
	]);
	assertKeysFound(PENTATONIC_MINOR, "101001010100", [
		["Ré pentatonique mineur", ["Ré", "Fa", "Sol", "La", "Do"]],
	]);
});


test('Blues', () => {
	assertKeysFound(BLUES_SCALE, "101110010100", [
		["Blues de La", ["La", "Do", "Ré", "Mi♭", "Mi♮", "Sol"]],
	]);
	assertKeysFound(BLUES_SCALE, "001010010111", [
		["Blues de Mi", ["Mi", "Sol", "La", "Si♭", "Si♮", "Ré"]],
	]);
	assertKeysFound(BLUES_SCALE, "001011100101", [
		["Blues de Si", ["Si", "Ré", "Mi", "Fa", "Fa♯", "La"]],
	]);
	assertKeysFound(BLUES_SCALE, "110010100101", [
		["Blues de Fa♯", ["Fa♯", "La", "Si", "Do", "Do♯", "Mi"]],
	]);
	assertKeysFound(BLUES_SCALE, "010010111001", [
		["Blues de Do♯", ["Do♯", "Mi", "Fa♯", "Sol", "Sol♯", "Si"]],
		// ["Blues de Ré♭", ["Ré♭", "Fa♭", "Sol♭", "Sol", "La♭", "Do♭"]],
	]);
	assertKeysFound(BLUES_SCALE, "011100101001", [
		["Blues de Sol♯" , ["Sol♯", "Si", "Do♯", "Ré", "Ré♯", "Fa♯"]],
		// ["Blues de La♭", ["La♭", "Do♭", "Ré♭", "Ré", "Mi♭", "Sol♭"]],
	]);
	assertKeysFound(BLUES_SCALE, "010100101110", [
		["Blues de Ré♯", ["Ré♯", "Fa♯", "Sol♯", "La", "La♯", "Do♯"]],
		["Blues de Mi♭", ["Mi♭", "Sol♭", "La♭", "La", "Si♭", "Ré♭"]],
	]);
	assertKeysFound(BLUES_SCALE, "010111001010", [
		// ["Blues de La♯", ["La♯", "Do♯", "Ré♯", "Mi", "Mi♯", "Sol♯"]],
		["Blues de Si♭", ["Si♭", "Ré♭", "Mi♭", "Mi", "Fa", "La♭"]],
	]);
	assertKeysFound(BLUES_SCALE, "100101001011", [
		["Blues de Fa", ["Fa", "La♭", "Si♭", "Si", "Do", "Mi♭"]],
		// ["Blues de Mi♯", ["Mi♯", "Sol♯", "La♯", "Si", "Si♯", "Ré♯"]],
	]);
	assertKeysFound(BLUES_SCALE, "100101110010", [
		["Blues de Do", ["Do", "Mi♭", "Fa", "Sol♭", "Sol♮", "Si♭"]],
	]);
	assertKeysFound(BLUES_SCALE, "111001010010", [
		["Blues de Sol", ["Sol", "Si♭", "Do", "Ré♭", "Ré♮", "Fa"]],
	]);
	assertKeysFound(BLUES_SCALE, "101001011100", [
		["Blues de Ré", ["Ré", "Fa", "Sol", "La♭", "La♮", "Do"]],
	]);
});
