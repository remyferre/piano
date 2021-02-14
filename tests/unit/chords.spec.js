import { assertKeysFound } from './scales.spec.js';
import {
	MAJOR_CHORD, MINOR_CHORD, DIMINISHED_CHORD, AUGMENTED_CHORD, SUS4, SUS2,
	DOMINANT_SEVENTH, MAJOR_SEVENTH, AUGMENTED_MAJOR_SEVENTH, MINOR_SEVENTH,
	MINOR_MAJOR_SEVENTH, HALF_DIMINISHED_SEVENTH, DIMINISHED_SEVENTH
} from '@/key_finder/chords.js';


test('Major', () => {
	assertKeysFound(MAJOR_CHORD, "100010010000", [
		["Do majeur", ["Do", "Mi", "Sol"]],
		// ["Si♯ majeur" , ["Si♯", "Ré♯♯", "Fa♯♯"]],
	]);
	assertKeysFound(MAJOR_CHORD, "001000010001", [
		["Sol majeur", ["Sol", "Si", "Ré"]],
	]);
	assertKeysFound(MAJOR_CHORD, "001000100100", [
		["Ré majeur", ["Ré", "Fa♯", "La"]],
	]);
	assertKeysFound(MAJOR_CHORD, "010010000100", [
		["La majeur", ["La", "Do♯", "Mi"]],
	]);
	assertKeysFound(MAJOR_CHORD, "000010001001", [
		["Mi majeur", ["Mi", "Sol♯", "Si"]],
		["Fa♭ majeur", ["Fa♭", "La♭", "Do♭"]],
	]);
	assertKeysFound(MAJOR_CHORD, "000100100001", [
		["Do♭ majeur", ["Do♭", "Mi♭", "Sol♭"]],
		["Si majeur" , ["Si", "Ré♯", "Fa♯"]],
	]);
	assertKeysFound(MAJOR_CHORD, "010000100010", [
		["Fa♯ majeur" , ["Fa♯", "La♯", "Do♯"]],
		["Sol♭ majeur", ["Sol♭", "Si♭", "Ré♭"]],
	]);
	assertKeysFound(MAJOR_CHORD, "010001001000", [
		["Do♯ majeur", ["Do♯", "Mi♯", "Sol♯"]],
		["Ré♭ majeur", ["Ré♭", "Fa", "La♭"]],
	]);
	assertKeysFound(MAJOR_CHORD, "100100001000", [
		["Sol♯ majeur", ["Sol♯", "Si♯", "Ré♯"]],
		["La♭ majeur", ["La♭", "Do", "Mi♭"]],
	]);
	assertKeysFound(MAJOR_CHORD, "000100010010", [
		// ["Ré♯ majeur", ["Ré♯", "Fa♯♯", "La♯"]],
		["Mi♭ majeur", ["Mi♭", "Sol", "Si♭"]],
	]);
	assertKeysFound(MAJOR_CHORD, "001001000010", [
		// ["La♯ majeur", ["La♯", "Do♯♯", "Mi♯"]],
		["Si♭ majeur", ["Si♭", "Ré", "Fa"]],
	]);
	assertKeysFound(MAJOR_CHORD, "100001000100", [
		["Fa majeur", ["Fa", "La", "Do"]],
		// ["Mi♯ majeur", ["Mi♯", "Sol♯♯", "Si♯"]],
	]);
});


test('Minor', () => {
	assertKeysFound(MINOR_CHORD, "100010000100", [
		["La mineur", ["La", "Do", "Mi"]],
	]);
	assertKeysFound(MINOR_CHORD, "000010010001", [
		["Mi mineur", ["Mi", "Sol", "Si"]],
		// ["Fa♭ mineur", ["Fa♭", "La♭♭", "Do♭"]],
	]);
	assertKeysFound(MINOR_CHORD, "001000100001", [
		["Si mineur", ["Si", "Ré", "Fa♯"]],
		// ["Do♭ mineur", ["Do♭", "Mi♭♭", "Sol♭"]],
	]);
	assertKeysFound(MINOR_CHORD, "010000100100", [
		["Fa♯ mineur", ["Fa♯", "La", "Do♯"]],
		// ["Sol♭ mineur", ["Sol♭", "Si♭♭", "Ré♭"]],
	]);
	assertKeysFound(MINOR_CHORD, "010010001000", [
		["Do♯ mineur", ["Do♯", "Mi", "Sol♯"]],
		["Ré♭ mineur", ["Ré♭", "Fa♭", "La♭"]],
	]);
	assertKeysFound(MINOR_CHORD, "000100001001", [
		["Sol♯ mineur", ["Sol♯", "Si", "Ré♯"]],
		["La♭ mineur", ["La♭", "Do♭", "Mi♭"]],
	]);
	assertKeysFound(MINOR_CHORD, "000100100010", [
		["Ré♯ mineur", ["Ré♯", "Fa♯", "La♯"]],
		["Mi♭ mineur", ["Mi♭", "Sol♭", "Si♭"]],
	]);
	assertKeysFound(MINOR_CHORD, "010001000010", [
		["La♯ mineur", ["La♯", "Do♯", "Mi♯"]],
		["Si♭ mineur", ["Si♭", "Ré♭", "Fa"]],
	]);
	assertKeysFound(MINOR_CHORD, "100001001000", [
		["Mi♯ mineur", ["Mi♯", "Sol♯", "Si♯"]],
		["Fa mineur", ["Fa", "La♭", "Do"]],
	]);
	assertKeysFound(MINOR_CHORD, "100100010000", [
		// ["Si♯ mineur", ["Si♯", "Ré♯", "Fa♯♯"]],
		["Do mineur", ["Do", "Mi♭", "Sol"]],
	]);
	assertKeysFound(MINOR_CHORD, "001000010010", [
		["Sol mineur", ["Sol", "Si♭", "Ré"]],
	]);
	assertKeysFound(MINOR_CHORD, "001001000100", [
		["Ré mineur", ["Ré", "Fa", "La"]],
	]);
});


test('Diminished', () => {
	assertKeysFound(DIMINISHED_CHORD, "100100000100", [
		["La diminué", ["La", "Do", "Mi♭"]],
	]);
	assertKeysFound(DIMINISHED_CHORD, "000010010010", [
		["Mi diminué", ["Mi", "Sol", "Si♭"]],
		// ["Fa♭ diminué", ["Fa♭", "La♭♭", "Do♭♭"]],
	]);
	assertKeysFound(DIMINISHED_CHORD, "001001000001", [
		["Si diminué", ["Si", "Ré", "Fa"]],
		// ["Do♭ diminué", ["Do♭", "Mi♭♭", "Sol♭♭"]],
	]);
	assertKeysFound(DIMINISHED_CHORD, "100000100100", [
		["Fa♯ diminué", ["Fa♯", "La", "Do"]],
		// ["Sol♭ diminué", ["Sol♭", "Si♭♭", "Ré♭♭"]],
	]);
	assertKeysFound(DIMINISHED_CHORD, "010010010000", [
		["Do♯ diminué", ["Do♯", "Mi", "Sol"]],
		// ["Ré♭ diminué", ["Ré♭", "Fa♭", "La♭♭"]],
	]);
	assertKeysFound(DIMINISHED_CHORD, "001000001001", [
		["Sol♯ diminué", ["Sol♯", "Si", "Ré"]],
		// ["La♭ diminué", ["La♭", "Do♭", "Mi♭♭"]],
	]);
	assertKeysFound(DIMINISHED_CHORD, "000100100100", [
		["Ré♯ diminué", ["Ré♯", "Fa♯", "La"]],
		// ["Mi♭ diminué", ["Mi♭", "Sol♭", "Si♭♭"]],
	]);
	assertKeysFound(DIMINISHED_CHORD, "010010000010", [
		["La♯ diminué", ["La♯", "Do♯", "Mi"]],
		["Si♭ diminué", ["Si♭", "Ré♭", "Fa♭"]],
	]);
	assertKeysFound(DIMINISHED_CHORD, "000001001001", [
		["Mi♯ diminué", ["Mi♯", "Sol♯", "Si"]],
		["Fa diminué", ["Fa", "La♭", "Do♭"]],
	]);
	assertKeysFound(DIMINISHED_CHORD, "100100100000", [
		["Do diminué", ["Do", "Mi♭", "Sol♭"]],
		["Si♯ diminué", ["Si♯", "Ré♯", "Fa♯"]],
	]);
	assertKeysFound(DIMINISHED_CHORD, "010000010010", [
		["Sol diminué", ["Sol", "Si♭", "Ré♭"]],
	]);
	assertKeysFound(DIMINISHED_CHORD, "001001001000", [
		["Ré diminué", ["Ré", "Fa", "La♭"]],
	]);
});


test('Augmented', () => {
	assertKeysFound(AUGMENTED_CHORD, "100010001000", [
		["Do augmenté", ["Do", "Mi", "Sol♯"]],
		["Mi augmenté", ["Mi", "Sol♯", "Si♯"]],
		["Fa♭ augmenté", ["Fa♭", "La♭", "Do"]],
		// ["Sol♯ augmenté", ["Sol♯", "Si♯", "Ré♯♯"]],
		["La♭ augmenté", ["La♭", "Do", "Mi"]],
		// ["Si♯ augmenté", ["Si♯", "Ré♯♯", "Fa♯♯♯"]],
	]);
	assertKeysFound(AUGMENTED_CHORD, "000100010001", [
		// ["Ré♯ augmenté", ["Ré♯", "Fa♯♯", "La♯"]],
		["Do♭ augmenté", ["Do♭", "Mi♭", "Sol"]],
		["Mi♭ augmenté", ["Mi♭", "Sol", "Si"]],
		["Sol augmenté", ["Sol", "Si", "Ré♯"]],
		["Si augmenté", ["Si", "Ré♯", "Fa♯♯"]],
	]);
	assertKeysFound(AUGMENTED_CHORD, "001000100010", [
		["Ré augmenté", ["Ré", "Fa♯", "La♯"]],
		// ["Fa♯ augmenté", ["Fa♯", "La♯", "Do♯♯"]],
		["Sol♭ augmenté", ["Sol♭", "Si♭", "Ré"]],
		// ["La♯ augmenté", ["La♯", "Do♯♯", "Mi♯♯"]],
		["Si♭ augmenté", ["Si♭", "Ré", "Fa♯"]],
	]);
	assertKeysFound(AUGMENTED_CHORD, "010001000100", [
		// ["Do♯ augmenté", ["Do♯", "Mi♯", "Sol♯♯"]],
		["Ré♭ augmenté", ["Ré♭", "Fa", "La"]],
		// ["Mi♯ augmenté", ["Mi♯", "Sol♯♯", "Si♯"]],
		["Fa augmenté", ["Fa", "La", "Do♯"]],
		["La augmenté", ["La", "Do♯", "Mi♯"]],
	]);
});


test('Sus4', () => {
	assertKeysFound(SUS4, "100001010000", [
		["Do <sup>sus4</sup>", ["Do", "Fa", "Sol"]],
		// ["Si♯ <sup>sus4</sup>" , ["Si♯", "Mi♯", "Fa♯♯"]],
	]);
	assertKeysFound(SUS4, "101000010000", [
		["Sol <sup>sus4</sup>", ["Sol", "Do", "Ré"]],
	]);
	assertKeysFound(SUS4, "001000010100", [
		["Ré <sup>sus4</sup>", ["Ré", "Sol", "La"]],
	]);
	assertKeysFound(SUS4, "001010000100", [
		["La <sup>sus4</sup>", ["La", "Ré", "Mi"]],
	]);
	assertKeysFound(SUS4, "000010000101", [
		["Mi <sup>sus4</sup>", ["Mi", "La", "Si"]],
		// ["Fa♭ <sup>sus4</sup>", ["Fa♭", "Si♭♭", "Do♭"]],
	]);
	assertKeysFound(SUS4, "000010100001", [
		["Do♭ <sup>sus4</sup>", ["Do♭", "Fa♭", "Sol♭"]],
		["Si <sup>sus4</sup>" , ["Si", "Mi", "Fa♯"]],
	]);
	assertKeysFound(SUS4, "010000100001", [
		["Fa♯ <sup>sus4</sup>" , ["Fa♯", "Si", "Do♯"]],
		["Sol♭ <sup>sus4</sup>", ["Sol♭", "Do♭", "Ré♭"]],
	]);
	assertKeysFound(SUS4, "010000101000", [
		["Do♯ <sup>sus4</sup>", ["Do♯", "Fa♯", "Sol♯"]],
		["Ré♭ <sup>sus4</sup>", ["Ré♭", "Sol♭", "La♭"]],
	]);
	assertKeysFound(SUS4, "010100001000", [
		["Sol♯ <sup>sus4</sup>", ["Sol♯", "Do♯", "Ré♯"]],
		["La♭ <sup>sus4</sup>", ["La♭", "Ré♭", "Mi♭"]],
	]);
	assertKeysFound(SUS4, "000100001010", [
		["Ré♯ <sup>sus4</sup>", ["Ré♯", "Sol♯", "La♯"]],
		["Mi♭ <sup>sus4</sup>", ["Mi♭", "La♭", "Si♭"]],
	]);
	assertKeysFound(SUS4, "000101000010", [
		["La♯ <sup>sus4</sup>", ["La♯", "Ré♯", "Mi♯"]],
		["Si♭ <sup>sus4</sup>", ["Si♭", "Mi♭", "Fa"]],
	]);
	assertKeysFound(SUS4, "100001000010", [
		["Mi♯ <sup>sus4</sup>", ["Mi♯", "La♯", "Si♯"]],
		["Fa <sup>sus4</sup>", ["Fa", "Si♭", "Do"]],
	]);
});


test('Sus2', () => {
	assertKeysFound(SUS2, "101000010000", [
		["Do <sup>sus2</sup>", ["Do", "Ré", "Sol"]],
		// ["Si♯ <sup>sus2</sup>" , ["Si♯", "Do♯♯", "Fa♯♯"]],
	]);
	assertKeysFound(SUS2, "001000010100", [
		["Sol <sup>sus2</sup>", ["Sol", "La", "Ré"]],
	]);
	assertKeysFound(SUS2, "001010000100", [
		["Ré <sup>sus2</sup>", ["Ré", "Mi", "La"]],
	]);
	assertKeysFound(SUS2, "000010000101", [
		["La <sup>sus2</sup>", ["La", "Si", "Mi"]],
	]);
	assertKeysFound(SUS2, "000010100001", [
		["Mi <sup>sus2</sup>", ["Mi", "Fa♯", "Si"]],
		["Fa♭ <sup>sus2</sup>", ["Fa♭", "Sol♭", "Do♭"]],
	]);
	assertKeysFound(SUS2, "010000100001", [
		["Do♭ <sup>sus2</sup>", ["Do♭", "Ré♭", "Sol♭"]],
		["Si <sup>sus2</sup>" , ["Si", "Do♯", "Fa♯"]],
	]);
	assertKeysFound(SUS2, "010000101000", [
		["Fa♯ <sup>sus2</sup>" , ["Fa♯", "Sol♯", "Do♯"]],
		["Sol♭ <sup>sus2</sup>", ["Sol♭", "La♭", "Ré♭"]],
	]);
	assertKeysFound(SUS2, "010100001000", [
		["Do♯ <sup>sus2</sup>", ["Do♯", "Ré♯", "Sol♯"]],
		["Ré♭ <sup>sus2</sup>", ["Ré♭", "Mi♭", "La♭"]],
	]);
	assertKeysFound(SUS2, "000100001010", [
		["Sol♯ <sup>sus2</sup>", ["Sol♯", "La♯", "Ré♯"]],
		["La♭ <sup>sus2</sup>", ["La♭", "Si♭", "Mi♭"]],
	]);
	assertKeysFound(SUS2, "000101000010", [
		["Ré♯ <sup>sus2</sup>", ["Ré♯", "Mi♯", "La♯"]],
		["Mi♭ <sup>sus2</sup>", ["Mi♭", "Fa", "Si♭"]],
	]);
	assertKeysFound(SUS2, "100001000010", [
		["La♯ <sup>sus2</sup>", ["La♯", "Si♯", "Mi♯"]],
		["Si♭ <sup>sus2</sup>", ["Si♭", "Do", "Fa"]],
	]);
	assertKeysFound(SUS2, "100001010000", [
		["Fa <sup>sus2</sup>", ["Fa", "Sol", "Do"]],
		// ["Mi♯ <sup>sus2</sup>", ["Mi♯", "Fa♯♯", "Si♯"]],
	]);
});


test('Dominant seventh', () => {
	assertKeysFound(DOMINANT_SEVENTH, "100010010010", [
		["septième de dominante de Do", ["Do", "Mi", "Sol", "Si♭"]],
		// ["septième de dominante de Si♯" , ["Si♯", "Ré♯♯", "Fa♯♯", "La♯"]],
	]);
	assertKeysFound(DOMINANT_SEVENTH, "001001010001", [
		["septième de dominante de Sol", ["Sol", "Si", "Ré", "Fa"]],
	]);
	assertKeysFound(DOMINANT_SEVENTH, "101000100100", [
		["septième de dominante de Ré", ["Ré", "Fa♯", "La", "Do"]],
	]);
	assertKeysFound(DOMINANT_SEVENTH, "010010010100", [
		["septième de dominante de La", ["La", "Do♯", "Mi", "Sol"]],
	]);
	assertKeysFound(DOMINANT_SEVENTH, "001010001001", [
		["septième de dominante de Mi", ["Mi", "Sol♯", "Si", "Ré"]],
		// ["septième de dominante de Fa♭", ["Fa♭", "La♭", "Do♭", "Mi♭♭"]],
	]);
	assertKeysFound(DOMINANT_SEVENTH, "000100100101", [
		["septième de dominante de Si" , ["Si", "Ré♯", "Fa♯", "La"]],
		// ["septième de dominante de Do♭", ["Do♭", "Mi♭", "Sol♭", "Si♭♭"]],
	]);
	assertKeysFound(DOMINANT_SEVENTH, "010010100010", [
		["septième de dominante de Fa♯" , ["Fa♯", "La♯", "Do♯", "Mi"]],
		["septième de dominante de Sol♭", ["Sol♭", "Si♭", "Ré♭", "Fa♭"]],
	]);
	assertKeysFound(DOMINANT_SEVENTH, "010001001001", [
		["septième de dominante de Do♯", ["Do♯", "Mi♯", "Sol♯", "Si"]],
		["septième de dominante de Ré♭", ["Ré♭", "Fa", "La♭", "Do♭"]],
	]);
	assertKeysFound(DOMINANT_SEVENTH, "100100101000", [
		["septième de dominante de Sol♯", ["Sol♯", "Si♯", "Ré♯", "Fa♯"]],
		["septième de dominante de La♭", ["La♭", "Do", "Mi♭", "Sol♭"]],
	]);
	assertKeysFound(DOMINANT_SEVENTH, "010100010010", [
		// ["septième de dominante de Ré♯", ["Ré♯", "Fa♯♯", "La♯", "Do♯"]],
		["septième de dominante de Mi♭", ["Mi♭", "Sol", "Si♭", "Ré♭"]],
	]);
	assertKeysFound(DOMINANT_SEVENTH, "001001001010", [
		// ["septième de dominante de La♯", ["La♯", "Do♯♯", "Mi♯", "Sol♯"]],
		["septième de dominante de Si♭", ["Si♭", "Ré", "Fa", "La♭"]],
	]);
	assertKeysFound(DOMINANT_SEVENTH, "100101000100", [
		// ["septième de dominante de Mi♯", ["Mi♯", "Sol♯♯", "Si♯", "Ré♯"]],
		["septième de dominante de Fa", ["Fa", "La", "Do", "Mi♭"]],
	]);
});


test('Major seventh', () => {
	assertKeysFound(MAJOR_SEVENTH, "100010010001", [
		["septième majeure de Do", ["Do", "Mi", "Sol", "Si"]],
		// ["septième majeure de Si♯" , ["Si♯", "Ré♯♯", "Fa♯♯", "La♯♯"]],
	]);
	assertKeysFound(MAJOR_SEVENTH, "001000110001", [
		["septième majeure de Sol", ["Sol", "Si", "Ré", "Fa♯"]],
	]);
	assertKeysFound(MAJOR_SEVENTH, "011000100100", [
		["septième majeure de Ré", ["Ré", "Fa♯", "La", "Do♯"]],
	]);
	assertKeysFound(MAJOR_SEVENTH, "010010001100", [
		["septième majeure de La", ["La", "Do♯", "Mi", "Sol♯"]],
	]);
	assertKeysFound(MAJOR_SEVENTH, "000110001001", [
		["septième majeure de Mi", ["Mi", "Sol♯", "Si", "Ré♯"]],
		["septième majeure de Fa♭", ["Fa♭", "La♭", "Do♭", "Mi♭"]],
	]);
	assertKeysFound(MAJOR_SEVENTH, "000100100011", [
		["septième majeure de Do♭", ["Do♭", "Mi♭", "Sol♭", "Si♭"]],
		["septième majeure de Si" , ["Si", "Ré♯", "Fa♯", "La♯"]],
	]);
	assertKeysFound(MAJOR_SEVENTH, "010001100010", [
		["septième majeure de Fa♯" , ["Fa♯", "La♯", "Do♯", "Mi♯"]],
		["septième majeure de Sol♭", ["Sol♭", "Si♭", "Ré♭", "Fa"]],
	]);
	assertKeysFound(MAJOR_SEVENTH, "110001001000", [
		["septième majeure de Do♯", ["Do♯", "Mi♯", "Sol♯", "Si♯"]],
		["septième majeure de Ré♭", ["Ré♭", "Fa", "La♭", "Do"]],
	]);
	assertKeysFound(MAJOR_SEVENTH, "100100011000", [
		["septième majeure de La♭", ["La♭", "Do", "Mi♭", "Sol"]],
		// ["septième majeure de Sol♯", ["Sol♯", "Si♯", "Ré♯", "Fa♯♯"]],
	]);
	assertKeysFound(MAJOR_SEVENTH, "001100010010", [
		// ["septième majeure de Ré♯", ["Ré♯", "Fa♯♯", "La♯", "Do♯♯"]],
		["septième majeure de Mi♭", ["Mi♭", "Sol", "Si♭", "Ré"]],
	]);
	assertKeysFound(MAJOR_SEVENTH, "001001000110", [
		["septième majeure de Si♭", ["Si♭", "Ré", "Fa", "La"]],
		// ["septième majeure de La♯", ["La♯", "Do♯", "Mi♯", "Sol♯♯"]],
	]);
	assertKeysFound(MAJOR_SEVENTH, "100011000100", [
		["septième majeure de Fa", ["Fa", "La", "Do", "Mi"]],
		// ["septième majeure de Mi♯", ["Mi♯", "Sol♯♯", "Si♯", "Ré♯♯"]],
	]);
});


test('Augmented major seventh', () => {
	assertKeysFound(AUGMENTED_MAJOR_SEVENTH, "100010001001", [
		["septième majeure et quinte augmentée de Do", ["Do", "Mi", "Sol♯", "Si"]],
		// ["septième majeure et quinte augmentée de Si♯" , ["Si♯", "Ré♯♯", "Fa♯♯♯", "La♯♯"]],
	]);
	assertKeysFound(AUGMENTED_MAJOR_SEVENTH, "000100110001", [
		["septième majeure et quinte augmentée de Sol", ["Sol", "Si", "Ré♯", "Fa♯"]],
	]);
	assertKeysFound(AUGMENTED_MAJOR_SEVENTH, "011000100010", [
		["septième majeure et quinte augmentée de Ré", ["Ré", "Fa♯", "La♯", "Do♯"]],
	]);
	assertKeysFound(AUGMENTED_MAJOR_SEVENTH, "010001001100", [
		["septième majeure et quinte augmentée de La", ["La", "Do♯", "Mi♯", "Sol♯"]],
	]);
	assertKeysFound(AUGMENTED_MAJOR_SEVENTH, "100110001000", [
		["septième majeure et quinte augmentée de Mi", ["Mi", "Sol♯", "Si♯", "Ré♯"]],
		["septième majeure et quinte augmentée de Fa♭", ["Fa♭", "La♭", "Do", "Mi♭"]],
	]);
	assertKeysFound(AUGMENTED_MAJOR_SEVENTH, "000100010011", [
		["septième majeure et quinte augmentée de Do♭" , ["Do♭", "Mi♭", "Sol", "Si♭"]],
		["septième majeure et quinte augmentée de Si" , ["Si", "Ré♯", "Fa♯♯", "La♯"]],
	]);
	assertKeysFound(AUGMENTED_MAJOR_SEVENTH, "001001100010", [
		// ["septième majeure et quinte augmentée de Fa♯" , ["Fa♯", "La♯", "Do♯♯", "Mi♯"]],
		["septième majeure et quinte augmentée de Sol♭", ["Sol♭", "Si♭", "Ré", "Fa"]],
	]);
	assertKeysFound(AUGMENTED_MAJOR_SEVENTH, "110001000100", [
		// ["septième majeure et quinte augmentée de Do♯", ["Do♯", "Mi♯", "Sol♯♯", "Si♯"]],
		["septième majeure et quinte augmentée de Ré♭", ["Ré♭", "Fa", "La", "Do"]],
	]);
	assertKeysFound(AUGMENTED_MAJOR_SEVENTH, "100010011000", [
		["septième majeure et quinte augmentée de La♭", ["La♭", "Do", "Mi", "Sol"]],
		// ["septième majeure et quinte augmentée de Sol♯", ["Sol♯", "Si♯♯", "Ré♯", "Fa♯♯"]],
	]);
	assertKeysFound(AUGMENTED_MAJOR_SEVENTH, "001100010001", [
		// ["septième majeure et quinte augmentée de Ré♯", ["Ré♯", "Fa♯♯", "La♯♯", "Do♯♯"]],
		["septième majeure et quinte augmentée de Mi♭", ["Mi♭", "Sol", "Si", "Ré"]],
	]);
	assertKeysFound(AUGMENTED_MAJOR_SEVENTH, "001000100110", [
		["septième majeure et quinte augmentée de Si♭", ["Si♭", "Ré", "Fa♯", "La"]],
		// ["septième majeure et quinte augmentée de La♯", ["La♯", "Do♯", "Mi♯♯", "Sol♯♯"]],
	]);
	assertKeysFound(AUGMENTED_MAJOR_SEVENTH, "010011000100", [
		["septième majeure et quinte augmentée de Fa", ["Fa", "La", "Do♯", "Mi"]],
		// ["septième majeure et quinte augmentée de Mi♯", ["Mi♯", "Sol♯♯", "Si♯♯", "Ré♯♯"]],
	]);
});


test('Minor major seventh', () => {
	assertKeysFound(MINOR_MAJOR_SEVENTH, "100010001100", [
		["septième majeure et parfait mineur de La", ["La", "Do", "Mi", "Sol♯"]],
	]);
	assertKeysFound(MINOR_MAJOR_SEVENTH, "000110010001", [
		["septième majeure et parfait mineur de Mi", ["Mi", "Sol", "Si", "Ré♯"]],
		// ["septième majeure et parfait mineur de Fa♭", ["Fa♭", "La♭♭", "Do♭", "Mi♭"]],
	]);
	assertKeysFound(MINOR_MAJOR_SEVENTH, "001000100011", [
		["septième majeure et parfait mineur de Si", ["Si", "Ré", "Fa♯", "La♯"]],
		// ["septième majeure et parfait mineur de Do♭", ["Do♭", "Mi♭♭", "Sol♭", "Si♭"]],
	]);
	assertKeysFound(MINOR_MAJOR_SEVENTH, "010001100100", [
		["septième majeure et parfait mineur de Fa♯", ["Fa♯", "La", "Do♯", "Mi♯"]],
		// ["septième majeure et parfait mineur de Sol♭", ["Sol♭", "Si♭♭", "Ré♭", "Fa"]],
	]);
	assertKeysFound(MINOR_MAJOR_SEVENTH, "110010001000", [
		["septième majeure et parfait mineur de Do♯", ["Do♯", "Mi", "Sol♯", "Si♯"]],
		["septième majeure et parfait mineur de Ré♭", ["Ré♭", "Fa♭", "La♭", "Do"]],
	]);
	assertKeysFound(MINOR_MAJOR_SEVENTH, "000100011001", [
		// ["septième majeure et parfait mineur de Sol♯", ["Sol♯", "Si", "Ré♯", "Fa♯♯"]],
		["septième majeure et parfait mineur de La♭", ["La♭", "Do♭", "Mi♭", "Sol"]],
	]);
	assertKeysFound(MINOR_MAJOR_SEVENTH, "001100100010", [
		// ["septième majeure et parfait mineur de Ré♯", ["Ré♯", "Fa♯", "La♯", "Do♯♯"]],
		["septième majeure et parfait mineur de Mi♭", ["Mi♭", "Sol♭", "Si♭", "Ré"]],
	]);
	assertKeysFound(MINOR_MAJOR_SEVENTH, "010001000110", [
		["septième majeure et parfait mineur de Si♭", ["Si♭", "Ré♭", "Fa", "La"]],
		// ["septième majeure et parfait mineur de La♯", ["La♯", "Do♯", "Mi♯", "Sol♯♯"]],
	]);
	assertKeysFound(MINOR_MAJOR_SEVENTH, "100011001000", [
		["septième majeure et parfait mineur de Fa", ["Fa", "La♭", "Do", "Mi"]],
		// ["septième majeure et parfait mineur de Mi♯", ["Mi♯", "Sol♯", "Si♯", "Ré♯♯"]],
	]);
	assertKeysFound(MINOR_MAJOR_SEVENTH, "100100010001", [
		["septième majeure et parfait mineur de Do", ["Do", "Mi♭", "Sol", "Si"]],
		// ["septième majeure et parfait mineur de Si♯", ["Si♯", "Ré♯", "Fa♯♯", "La♯♯"]],
	]);
	assertKeysFound(MINOR_MAJOR_SEVENTH, "001000110010", [
		["septième majeure et parfait mineur de Sol", ["Sol", "Si♭", "Ré", "Fa♯"]],
	]);
	assertKeysFound(MINOR_MAJOR_SEVENTH, "011001000100", [
		["septième majeure et parfait mineur de Ré", ["Ré", "Fa", "La", "Do♯"]],
	]);
});


test('Minor seventh', () => {
	assertKeysFound(MINOR_SEVENTH, "100010010100", [
		["septième mineure de La", ["La", "Do", "Mi", "Sol"]],
	]);
	assertKeysFound(MINOR_SEVENTH, "001010010001", [
		["septième mineure de Mi", ["Mi", "Sol", "Si", "Ré"]],
		// ["septième mineure de Fa♭", ["Fa♭", "La♭♭", "Do♭", "Mi♭♭"]],
	]);
	assertKeysFound(MINOR_SEVENTH, "001000100101", [
		["septième mineure de Si", ["Si", "Ré", "Fa♯", "La"]],
		// ["septième mineure de Do♭", ["Do♭", "Mi♭♭", "Sol♭", "Si♭♭"]],
	]);
	assertKeysFound(MINOR_SEVENTH, "010010100100", [
		["septième mineure de Fa♯", ["Fa♯", "La", "Do♯", "Mi"]],
		// ["septième mineure de Sol♭", ["Sol♭", "Si♭♭", "Ré♭", "Fa♭"]],
	]);
	assertKeysFound(MINOR_SEVENTH, "010010001001", [
		["septième mineure de Do♯", ["Do♯", "Mi", "Sol♯", "Si"]],
		["septième mineure de Ré♭", ["Ré♭", "Fa♭", "La♭", "Do♭"]],
	]);
	assertKeysFound(MINOR_SEVENTH, "000100101001", [
		["septième mineure de Sol♯", ["Sol♯", "Si", "Ré♯", "Fa♯"]],
		["septième mineure de La♭", ["La♭", "Do♭", "Mi♭", "Sol♭"]],
	]);
	assertKeysFound(MINOR_SEVENTH, "010100100010", [
		["septième mineure de Ré♯", ["Ré♯", "Fa♯", "La♯", "Do♯"]],
		["septième mineure de Mi♭", ["Mi♭", "Sol♭", "Si♭", "Ré♭"]],
	]);
	assertKeysFound(MINOR_SEVENTH, "010001001010", [
		["septième mineure de La♯", ["La♯", "Do♯", "Mi♯", "Sol♯"]],
		["septième mineure de Si♭", ["Si♭", "Ré♭", "Fa", "La♭"]],
	]);
	assertKeysFound(MINOR_SEVENTH, "100101001000", [
		["septième mineure de Mi♯", ["Mi♯", "Sol♯", "Si♯", "Ré♯"]],
		["septième mineure de Fa", ["Fa", "La♭", "Do", "Mi♭"]],
	]);
	assertKeysFound(MINOR_SEVENTH, "100100010010", [
		["septième mineure de Do", ["Do", "Mi♭", "Sol", "Si♭"]],
		// ["septième mineure de Si♯", ["Si♯", "Ré♯", "Fa♯♯", "La♯"]],
	]);
	assertKeysFound(MINOR_SEVENTH, "001001010010", [
		["septième mineure de Sol", ["Sol", "Si♭", "Ré", "Fa"]],
	]);
	assertKeysFound(MINOR_SEVENTH, "101001000100", [
		["septième mineure de Ré", ["Ré", "Fa", "La", "Do"]],
	]);
});


test('Half-diminished seventh', () => {
	assertKeysFound(HALF_DIMINISHED_SEVENTH, "100100010100", [
		["septième mineure et quinte diminuée de La", ["La", "Do", "Mi♭", "Sol"]],
	]);
	assertKeysFound(HALF_DIMINISHED_SEVENTH, "001010010010", [
		["septième mineure et quinte diminuée de Mi", ["Mi", "Sol", "Si♭", "Ré"]],
		// ["septième mineure et quinte diminuée de Fa♭", ["Fa♭", "La♭♭", "Do♭♭", "Mi♭♭"]],
	]);
	assertKeysFound(HALF_DIMINISHED_SEVENTH, "001001000101", [
		["septième mineure et quinte diminuée de Si", ["Si", "Ré", "Fa", "La"]],
		// ["septième mineure et quinte diminuée de Do♭", ["Do♭", "Mi♭♭", "Sol♭♭", "Si♭♭"]],
	]);
	assertKeysFound(HALF_DIMINISHED_SEVENTH, "100010100100", [
		["septième mineure et quinte diminuée de Fa♯", ["Fa♯", "La", "Do", "Mi"]],
		// ["septième mineure et quinte diminuée de Sol♭", ["Sol♭", "Si♭♭", "Ré♭♭", "Fa♭"]],
	]);
	assertKeysFound(HALF_DIMINISHED_SEVENTH, "010010010001", [
		["septième mineure et quinte diminuée de Do♯", ["Do♯", "Mi", "Sol", "Si"]],
		// ["septième mineure et quinte diminuée de Ré♭", ["Ré♭", "Fa♭", "La♭♭", "Do♭"]],
	]);
	assertKeysFound(HALF_DIMINISHED_SEVENTH, "001000101001", [
		["septième mineure et quinte diminuée de Sol♯", ["Sol♯", "Si", "Ré", "Fa♯"]],
		// ["septième mineure et quinte diminuée de La♭", ["La♭", "Do♭", "Mi♭♭", "Sol♭"]],
	]);
	assertKeysFound(HALF_DIMINISHED_SEVENTH, "010100100100", [
		["septième mineure et quinte diminuée de Ré♯", ["Ré♯", "Fa♯", "La", "Do♯"]],
		// ["septième mineure et quinte diminuée de Mi♭", ["Mi♭", "Sol♭", "Si♭♭", "Ré♭"]],
	]);
	assertKeysFound(HALF_DIMINISHED_SEVENTH, "010010001010", [
		["septième mineure et quinte diminuée de La♯", ["La♯", "Do♯", "Mi", "Sol♯"]],
		["septième mineure et quinte diminuée de Si♭", ["Si♭", "Ré♭", "Fa♭", "La♭"]],
	]);
	assertKeysFound(HALF_DIMINISHED_SEVENTH, "000101001001", [
		["septième mineure et quinte diminuée de Mi♯", ["Mi♯", "Sol♯", "Si", "Ré♯"]],
		["septième mineure et quinte diminuée de Fa", ["Fa", "La♭", "Do♭", "Mi♭"]],
	]);
	assertKeysFound(HALF_DIMINISHED_SEVENTH, "100100100010", [
		["septième mineure et quinte diminuée de Do", ["Do", "Mi♭", "Sol♭", "Si♭"]],
		["septième mineure et quinte diminuée de Si♯", ["Si♯", "Ré♯", "Fa♯", "La♯"]],
	]);
	assertKeysFound(HALF_DIMINISHED_SEVENTH, "010001010010", [
		["septième mineure et quinte diminuée de Sol", ["Sol", "Si♭", "Ré♭", "Fa"]],
	]);
	assertKeysFound(HALF_DIMINISHED_SEVENTH, "101001001000", [
		["septième mineure et quinte diminuée de Ré", ["Ré", "Fa", "La♭", "Do"]],
	]);
});


test('Diminished seventh', () => {
	assertKeysFound(DIMINISHED_SEVENTH, "100100100100", [
		["septième diminuée de Do", ["Do", "Mi♭", "Sol♭", "Si♭♭"]],
		["septième diminuée de Ré♯", ["Ré♯", "Fa♯", "La", "Do"]],
		// ["septième diminuée de Mi♭", ["Mi♭", "Sol♭", "Si♭♭", "Ré♭♭"]],
		["septième diminuée de Fa♯", ["Fa♯", "La", "Do", "Mi♭"]],
		// ["septième diminuée de Sol♭", ["Sol♭", "Si♭♭", "Ré♭♭", "Fa♭♭"]],
		["septième diminuée de La", ["La", "Do", "Mi♭", "Sol♭"]],
		["septième diminuée de Si♯", ["Si♯", "Ré♯", "Fa♯", "La"]],
	]);
	assertKeysFound(DIMINISHED_SEVENTH, "010010010010", [
		["septième diminuée de Do♯", ["Do♯", "Mi", "Sol", "Si♭"]],
		// ["septième diminuée de Ré♭", ["Ré♭", "Fa♭", "La♭♭", "Do♭♭"]],
		["septième diminuée de Mi", ["Mi", "Sol", "Si♭", "Ré♭"]],
		// ["septième diminuée de Fa♭", ["Fa♭", "La♭♭", "Do♭♭", "Mi♭♭♭"]],
		["septième diminuée de Sol", ["Sol", "Si♭", "Ré♭", "Fa♭"]],
		["septième diminuée de La♯", ["La♯", "Do♯", "Mi", "Sol"]],
		// ["septième diminuée de Si♭", ["Si♭", "Ré♭", "Fa♭", "La♭♭"]],
	]);
	assertKeysFound(DIMINISHED_SEVENTH, "001001001001", [
		["septième diminuée de Ré", ["Ré", "Fa", "La♭", "Do♭"]],
		["septième diminuée de Mi♯", ["Mi♯", "Sol♯", "Si", "Ré"]],
		["septième diminuée de Fa", ["Fa", "La♭", "Do♭", "Mi♭♭"]],
		["septième diminuée de Sol♯", ["Sol♯", "Si", "Ré", "Fa"]],
		// ["septième diminuée de La♭", ["La♭", "Do♭", "Mi♭♭", "Sol♭♭"]],
		["septième diminuée de Si", ["Si", "Ré", "Fa", "La♭"]],
		// ["septième diminuée de Do♭", ["Do♭", "Mi♭♭", "Sol♭♭", "Si♭♭♭"]],
	]);
});
