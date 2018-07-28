class NaturalNote {
	constructor(index, name, englishName) {
		this.index = index;
		this.name = name;
		this.englishName = englishName;
	}
}

export const DO  = new NaturalNote(0 , "Do" , "C");
export const RE  = new NaturalNote(2 , "Ré" , "D");
export const MI  = new NaturalNote(4 , "Mi" , "E");
export const FA  = new NaturalNote(5 , "Fa" , "F");
export const SOL = new NaturalNote(7 , "Sol", "G");
export const LA  = new NaturalNote(9 , "La" , "A");
export const SI  = new NaturalNote(11, "Si" , "B");

export const ACCIDENTALS = new Map([
	[-2, "♭♭"],
	[-1, "♭" ],
	[ 0, ""  ],
	[+1, "♯" ],
	[+2, "♯♯"]
]);

export class Note {
	constructor(index, naturalNote, accidental="") {
		this.index = index;
		this.naturalNote = naturalNote;
		this.accidental = accidental;
	}

	name() {
		return `${this.naturalNote.name}${this.accidental}`;
	}

	englishName() {
		return `${this.naturalNote.englishName}${this.accidental}`;
	}

	hasAccidental() {
		return this.accidental != "" && this.accidental != "♮";
	}

	alter(alteration) {
		const accidentalIndex = {
			"♭♭": -2,
			"♭": -1,
			"": 0,
			"♯": +1,
			"♯♯": +2
		}[this.accidental];
		return new Note(this.index + alteration,
						this.naturalNote,
						ACCIDENTALS.get(accidentalIndex + alteration));
	}
}

export const NOTES = {
	0:  [new Note(0 , DO),       new Note(10, SI , "♯")],
	1:  [new Note(1 , DO , "♯"), new Note(1 , RE , "♭")],
	2:  [new Note(2 , RE)],
	3:  [new Note(3 , RE , "♯"), new Note(3 , MI , "♭")],
	4:  [new Note(4 , MI),       new Note(4 , FA , "♭")],
	5:  [new Note(5 , FA),       new Note(5 , MI , "♯")],
	6:  [new Note(6 , FA , "♯"), new Note(6 , SOL, "♭")],
	7:  [new Note(7 , SOL)],
	8:  [new Note(8 , SOL, "♯"), new Note(8 , LA , "♭")],
	9:  [new Note(9 , LA)],
	10: [new Note(10, LA , "♯"), new Note(10, SI , "♭")],
	11: [new Note(11, SI),       new Note(11, DO , "♭")]
};
