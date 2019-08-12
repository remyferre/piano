import WebAudioFontPlayer from 'webaudiofont';
import _tone_0000_SBLive_sf2 from './0000_SBLive_sf2.js';

export default class PianoPlayer {
    static isSupported() {
        return window.AudioContext;
    }

    constructor() {
        this.context = new AudioContext();
        this.player = new WebAudioFontPlayer();
        this.player.loader.decodeAfterLoading(this.context, '0000_SBLive_sf2');
        this.preset = _tone_0000_SBLive_sf2;
    }

    pitch(note, octave) {
		if (note.naturalNote.index == 11 && note.index == 0)
			++octave;
        return 12 * octave + note.index;
    }

    playNotes(notes, durationMs, isChord) {
        this.cancelQueue();

        const duration = durationMs / 1000;
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
