<template>
  <section class="selected-key" v-show="key">
	<h3 class="key-name" v-html="keyName"></h3>
	<div class="staff-and-play-button">
		<button @click="playNotes" v-if="pianoPlayerIsSupported"
				class="reset play-button" title="Jouer">
			<FontAwesomeIcon icon="play" size="2x"></FontAwesomeIcon>
		</button>
		<div id="staff"></div>
	<div id="highlighted-note" v-if="highlightedNote" v-bind:style="highlightedNote"></div>
	</div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import Vex from 'vexflow';
import WebAudioFontPlayer from 'webaudiofont';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { Chord } from '@/key_finder/chords.js';
import { mainFont } from '@/css/font.js';

library.add(faPlay);

class PianoPlayer {
	static isSupported() {
		return window.AudioContext;
	}

	constructor() {
		this.context = new AudioContext();
		this.player = new WebAudioFontPlayer();
		this.player.loader.decodeAfterLoading(this.context, '0000_SBLive_sf2');
		this.preset = window._tone_0000_SBLive_sf2;
	}

	pitch(note, octave) {
		return 12 * octave + note.index;
	}

	playNotes(notes, duration, isChord) {
		this.cancelQueue();

		const now = this.context.currentTime;
		notes.forEach(([note, octave], i) => {
			this.player.queueWaveTable(
				this.context, this.context.destination, this.preset,
				now + duration * i,
				this.pitch(note, octave),
				duration
			);
		});
		if (isChord)
			this.player.queueChord(
				this.context, this.context.destination, this.preset,
				now + (notes.length + 1) * duration,
				notes.map(([note, octave]) => this.pitch(note, octave)),
				duration * 2
			);
	}

	cancelQueue() {
		this.player.cancelQueue(this.context);
	}
}

export default {
    name: "Staff",
	beforeCreate() {
		this.piano = new PianoPlayer();
	},
    watch: {
        key: function(newKey, oldKey) {
            if (newKey != oldKey) {
                this.piano.cancelQueue();
				this.cancelHighlightNoteQueue();
                if (newKey)
                    this.drawStaff(newKey);
            }
        }
    },
    data() {
		return {
			highlightedNote: null,
			timeoutIds: [],
		};
	},
    computed: {
		...mapState({
			key: 'selectedKey'
		}),
        keyName() {
			if (!this.key)
				return "";

            if (this.key.scale instanceof Chord) {
                return `Accord de ${this.key.name()}`;
            } else {
                return `Gamme de ${this.key.name()}`;
            }
        },
		pianoPlayerIsSupported() {
			return PianoPlayer.isSupported();
		}
    },
    methods: {
		playNotes() {
			const duration = 500;
			const isChord = this.key.scale instanceof Chord;

			const notes = this.notesWithOctave(this.key.notes);

			this.piano.playNotes(
				notes,
				duration / 1000, isChord
			);

			this.cancelHighlightNoteQueue();
			notes.forEach((_, i) => {
				this.highlightNote(i, duration * i)
			});
			this.stopHighlightingNote(duration * notes.length)
			if (isChord) {
				this.highlightNote(notes.length, duration * (notes.length + 1))
				this.stopHighlightingNote(duration * (notes.length + 3))
			}
		},
		highlightNote(i, when) {
			const timeoutId = setTimeout(() => {
				const svg = document.querySelector("#staff svg");
				const svgTop = svg.getBoundingClientRect().top;

				const barLine = document.querySelector("#staff rect");
				const { top: barLineTop, height: barLineHeight } = barLine.getBoundingClientRect();

				const note = document.querySelectorAll(".vf-note")[i];
				const { left, width, height: noteHeight, top: noteTop, bottom: noteBottom } = note.getBoundingClientRect();

				const top = Math.min(barLineTop - noteHeight, noteTop);
				const bottom = Math.max(barLineTop + barLineHeight + noteHeight, noteBottom);

				this.highlightedNote = {
					left: `${left}px`,
					width: `${width}px`,
					top: `${top}px`,
					height: `${bottom - top}px`,
				};
			}, when);
			this.timeoutIds.push(timeoutId);
		},
		stopHighlightingNote(when) {
			const timeoutId = setTimeout(() => {
				this.highlightedNote = null;
			}, when);
			this.timeoutIds.push(timeoutId);
		},
		cancelHighlightNoteQueue() {
			for (let timeoutId of this.timeoutIds)
				clearTimeout(timeoutId);
			this.timeoutIds = [];
			this.highlightedNote = null;
		},
		drawStaff(key) {
            const $staff = document.getElementById("staff");
            $staff.innerHTML = "";

			// We need the template to be visible in order to use Vexflow.
			// We can't rely on Vue to un-hide the template as rendering is done
			// after drawStaff() (because it is called by a watcher)
            const $template = document.querySelector(".selected-key");
			$template.style.display = "initial";

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

            const vexflowNotes = this.notesWithOctave(key.notes).map(([note, octave]) => [
				note,
				note.englishName().replace(/♭/g, "b").replace(/♯/g, "#").replace(/♮/g, "") + "/" + octave,
				note.accidental.replace(/♭/g, "b").replace(/♯/g, "#").replace(/♮/g, "n")
			]);
            const notes = vexflowNotes.map(([, note, accidental]) => {
                const staffNote = new VF.StaveNote(
                    {clef: "treble", keys: [note], duration: "w" }
                );
                if (accidental)
                    staffNote.addAccidental(0, new VF.Accidental(accidental));
                return staffNote;
            });

            if (key.scale instanceof Chord) {
                const chord = new VF.StaveNote(
                    {clef: "treble", keys: vexflowNotes.map(([, note,]) => note), duration: "w" }
                );
                vexflowNotes.forEach(([, , accidental], i) => {
                    if (accidental)
                        chord.addAccidental(i, new VF.Accidental(accidental));
                });
                notes.push(chord);
            }

            const text = vexflowNotes.map(([note, ]) => {
                return new VF.TextNote({
                    text: note.name(),
                    font: {
                        family: mainFont,
                        size: 12,
                        weight: ""
                    },
                    duration: 'w'
                }).setLine(0)
                  .setStave(staff)
                  .setJustification(VF.TextNote.Justification.LEFT);
            });
            if (key.scale instanceof Chord) {
                text.push(new VF.TextNote({
                    text: "",
                    font: {
                        family: mainFont,
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
        notesWithOctave(notes) {
            if (notes.length == 0)
                return [];

            let previousNote = notes[0];
            let octave = 4;
            const notesWithOctave = [];
            notes.forEach(note => {
                if (note.naturalNote.index < previousNote.naturalNote.index)
                    ++octave;
                previousNote = note;

                notesWithOctave.push([note, octave]);
            });
			if (!(this.key.scale instanceof Chord)) {
				const [tonic, octave] = notesWithOctave[0];
                notesWithOctave.push([tonic, octave+1]);
			}
            return notesWithOctave;
        }
    },
	components: {
		FontAwesomeIcon
	}
};
</script>

<style scoped lang="scss">

$margin: 20px;

.selected-key {
	width: 100%;
	max-width: 560px;
}
.key-name {
	margin: $margin 0;
	text-align: center;
}

.staff-and-play-button {
	display: flex;
}

#staff {
	width: 100%;
	margin-bottom: $margin;
}

.play-button {
	margin-right: 2rem;
	&:active {
		svg {
			transform: scale(0.85);
		}
	}
}

#highlighted-note {
	$color: rgba(0, 0, 0, 0.2);
	background-color: $color;
	box-shadow: 0px 0px 3px 3px $color;
	height: 30px;
	position: absolute;
}

@media only screen and (min-width : 901px) and (max-width : 9999px) {
	.selected-key {
		width: 560px;
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
