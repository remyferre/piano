<template>
  <section class="selected-key" v-show="key">
    <h3 class="key-name" v-html="keyName"></h3>
    <div class="staff-and-play-button">
        <button @click="playNotes" v-if="pianoPlayerIsSupported"
                class="reset play-button" title="Jouer">
            <FontAwesomeIcon icon="play" size="2x"></FontAwesomeIcon>
        </button>
        <div id="staff"></div>
    <div id="highlighted-note" v-show="highlightedNote" v-bind:style="highlightedNote"></div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { Chord } from '@/key_finder/chords.js';
import PianoPlayer from './PianoPlayer.js';
import VexflowStaff from './VexflowStaff.js';

library.add(faPlay);

export default {
    name: "Staff",
    beforeCreate() {
        this.piano = new PianoPlayer();
        this.staff = new VexflowStaff(this);
    },
    watch: {
        key: function(newKey, oldKey) {
            if (newKey != oldKey) {
                this.piano.cancelQueue();
                this.staff.cancelQueue();
            }
        },
		keyOrPianoOrTab: function() {
			this.redrawStaff();
		}
    },
    data() {
        return {
            highlightedNote: null,
        };
    },
    computed: {
        ...mapState({
            key: 'selectedKey',
            notesPressed: 'piano',
            activeTab: 'activeTab',
        }),
        isChord() {
            return this.key && this.key.scale instanceof Chord;
        },
        keyName() {
            if (!this.key)
                return "";

            if (this.isChord) {
                return `Accord de ${this.key.name()}`;
            } else {
                return `Gamme de ${this.key.name()}`;
            }
        },
		keyOrPianoOrTab() {
			return [this.key, this.notesPressed, this.activeTab];
		},
        pianoPlayerIsSupported() {
            return PianoPlayer.isSupported();
        }
    },
    methods: {
        playNotes() {
            const duration = 500;
            const notes = this.notesWithOctave(this.key.notes);

            this.piano.playNotes(notes, duration, this.isChord);
            this.staff.playNotes(notes, duration, this.isChord);
        },
		redrawStaff() {
            this.staff.draw(
                this.notesWithOctave(this.key.notes),
                this.key.scale instanceof Chord,
				this.notesPressed,
            );
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
            if (!this.isChord) {
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

@media only screen and (max-width : 625px) {
    .play-button {
        display: none;
    }
}
</style>

<style lang="scss"> // scoped doesn't work because <svg> is added dynamically
#staff svg {
    width: 100%;
    height: 100%;
}

$staff-padding: 1rem;
$breakpoint: calc(525px + 2 * #{$staff-padding});

@media only screen and (max-width: $breakpoint) {
    #staff svg {
        padding-left : $staff-padding;
        padding-right: $staff-padding;
    }
}

@media only screen and (min-width: $breakpoint) {
    .usage-and-staff-container {
        height: 200px;
    }
}
</style>
