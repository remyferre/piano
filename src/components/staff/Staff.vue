<template>
  <section class="selected-key" v-if="key">
	<h3 class="key-name" v-html="keyName"></h3>
	<div id="staff"></div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import Vex from 'vexflow';
import { Chord } from '@/key_finder/chords.js';

export default {
    name: "Staff",
    beforeUpdate() {
        var staff = document.getElementById("staff");
        if (staff)
            staff.innerHTML = "";
    },
    updated() {
        this.drawStaff();
    },
    computed: {
		...mapState({
			key: 'selectedKey'
		}),
        keyName() {
            if (this.key.scale instanceof Chord) {
                return `Accord de ${this.key.name()}`;
            } else {
                return `Gamme de ${this.key.name()}`;
            }
        }
    },
    methods: {
        drawStaff() {
            const keyNotes = this.key && this.key.notes || [];

            const STAFF_WIDTH = 500;
            const STAFF_HEIGHT = 100;
            const SVG_WIDTH = STAFF_WIDTH + 25; // +25 is some extra space for the last text note, which can overflow staff width
            const SVG_HEIGHT = STAFF_HEIGHT + 10;

            const VF = Vex.Flow;
            const renderer = new VF.Renderer(
                document.getElementById("staff"),
                VF.Renderer.Backends.SVG);
            renderer.resize(SVG_WIDTH, SVG_HEIGHT);
            const context = renderer.getContext();
            const staff = new VF.Stave(0,
                                     10, // extra vertical space for text voice
                                     STAFF_WIDTH + 15);  // notes can overflow if there are too much accidentals
            staff.addClef("treble")
                .setContext(context)
                .draw();

            const vexflowNotes = this.convertNoteNames(keyNotes);
            const notes = vexflowNotes.map(([note, accidental]) => {
                const staffNote = new VF.StaveNote(
                    {clef: "treble", keys: [note], duration: "w" }
                );
                if (accidental)
                    staffNote.addAccidental(0, new VF.Accidental(accidental));
                return staffNote;
            });

            if (this.key.scale instanceof Chord) {
                const chord = new VF.StaveNote(
                    {clef: "treble", keys: vexflowNotes.map(([note,]) => note), duration: "w" }
                );
                vexflowNotes.forEach(([, accidental], i) => {
                    if (accidental)
                        chord.addAccidental(i, new VF.Accidental(accidental));
                });
                notes.push(chord);
            }

            const text = keyNotes.map(note => {
                return new VF.TextNote({
                    text: note.name(),
                    font: {
                        family: "Arial",
                        size: 12,
                        weight: ""
                    },
                    duration: 'w'
                }).setLine(0)
                  .setStave(staff)
                  .setJustification(VF.TextNote.Justification.LEFT);
            });
            if (this.key.scale instanceof Chord) {
                text.push(new VF.TextNote({
                    text: "",
                    font: {
                        family: "Arial",
                        size: 12,
                        weight: ""
                    },
                    duration: 'w'
                }).setLine(0)
                  .setStave(staff)
                  .setJustification(VF.TextNote.Justification.LEFT));
            }

            const noteVoice = new VF.Voice({num_beats: notes.length * 4,  beat_value: 4});
            const textVoice = new VF.Voice({num_beats: text.length  * 4,  beat_value: 4});
            noteVoice.addTickables(notes);
            textVoice.addTickables(text);

            const voices = [noteVoice, textVoice];
            new VF.Formatter()
                .joinVoices(voices)
                .format(voices, STAFF_WIDTH);
            voices.forEach(voice => voice.draw(context, staff));

            const svg = document.querySelector('#staff svg');
            svg.setAttribute('viewBox', `0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`);
        },
        convertNoteNames(notes) {
            if (notes.length == 0)
                return [];

            let previousNote = notes[0];
            let octave = 4;
            const vexflowNotes = [];
            notes.forEach(note => {
                if (note.naturalNote.index < previousNote.naturalNote.index)
                    ++octave;
                previousNote = note;

                vexflowNotes.push([
                    note.englishName().replace(/♭/g, "b").replace(/♯/g, "#").replace(/♮/g, "") + "/" + octave,
                    note.accidental.replace(/♭/g, "b").replace(/♯/g, "#").replace(/♮/g, "n")
                ]);
            });
            return vexflowNotes;
        }
    }
};
</script>

<style scoped lang="scss">

$margin: 20px;

.selected-key {
	width: 100%;
	max-width: 525px;
}
.key-name {
	margin: $margin 0;
	text-align: center;
}
#staff {
	width: 100%;
	margin-bottom: $margin;
}
@media only screen and (min-width : 901px) and (max-width : 9999px) {
	.selected-key {
		width: 532px;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
}
</style>

<style lang="scss">	// scoped doesn't work because <svg> is added dynamically
#staff svg {
	width: 100%;
	height: 100%;
}
</style>
