import Vex from 'vexflow';
import { mainFont } from '@/css/font.js';

export default class VexflowStaff {
    constructor(data) {
        this.timeoutIds = [];
        this.data = data;
    }

    draw(keyNotes, isChord, isNotePressed) {
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
        const SELECTED_NOTE_COLOR = "black";
        const UNSELECTED_NOTE_COLOR = '#999999';

        const VF = Vex.Flow;
        const renderer = new VF.Renderer(
            document.getElementById("staff"),
            VF.Renderer.Backends.SVG);
        renderer.resize(SVG_WIDTH, SVG_HEIGHT);
        const context = renderer.getContext();
        const staff = new VF.Stave(0,
                                   10, // extra vertical space for text
                                   STAFF_WIDTH + 15);  // notes can overflow if there are too much accidentals
        staff.addClef("treble")
            .setContext(context)
            .draw();

        const vexflowNotes = keyNotes.map(([note, octave]) => [
            note,
            note.englishName().replace(/♭/g, "b").replace(/♯/g, "#").replace(/♮/g, "") + "/" + octave,
            note.accidental.replace(/♭/g, "b").replace(/♯/g, "#").replace(/♮/g, "n")
        ]);
        const notes = vexflowNotes.map(([{ index }, note, accidental]) => {
            const staffNote = new VF.StaveNote(
                { clef: "treble", keys: [note], duration: "w" }
            );
            if (accidental)
                staffNote.addAccidental(0, new VF.Accidental(accidental));
            staffNote.setStyle({ fillStyle: isNotePressed[index] ? SELECTED_NOTE_COLOR : UNSELECTED_NOTE_COLOR });
            return staffNote;
        });

        if (isChord) {
            const chord = new VF.StaveNote({
				clef: "treble",
				keys: vexflowNotes.map(([, note, ]) => note),
				duration: "w"
			});
            vexflowNotes.forEach(([{ index }, , accidental], i) => {
				chord.setKeyStyle(i, { fillStyle: isNotePressed[index] ? SELECTED_NOTE_COLOR : UNSELECTED_NOTE_COLOR });
                if (accidental)
                    chord.addAccidental(i, new VF.Accidental(accidental));
            });
            notes.push(chord);
        }

        const text = vexflowNotes.map(([note, ]) => new VF.TextNote({
            text: note.name(),
            font: {
                family: mainFont,
                size: 12,
            },
            duration: 'w'
        }).setLine(0)
          .setStave(staff)
          .setJustification(VF.TextNote.Justification.LEFT)
          .setStyle({ fillStyle: isNotePressed[note.index] ? SELECTED_NOTE_COLOR : UNSELECTED_NOTE_COLOR }));
        if (isChord) {
            text.push(new VF.TextNote({
                text: "",
                font: {
                    family: mainFont,
                    size: 12,
                },
                duration: 'w'
            }).setLine(0)
              .setStave(staff)
              .setJustification(VF.TextNote.Justification.LEFT));
        }

        const noteVoice = new VF.Voice({ num_beats: notes.length * 4,  beat_value: 4 });
        const textVoice = new VF.Voice({ num_beats: text.length  * 4,  beat_value: 4 });
        noteVoice.addTickables(notes);
        textVoice.addTickables(text);

        const voices = [noteVoice, textVoice];
        new VF.Formatter()
            .joinVoices(voices)
            .format(voices, STAFF_WIDTH);
        voices.forEach(voice => voice.draw(context, staff));

        const svg = document.querySelector('#staff svg');
        svg.setAttribute('viewBox', `0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`);
    }

    playNotes(notes, duration, isChord) {
        this.cancelQueue();
        notes.forEach((_, i) => {
            this.queueHighlightNote(i, duration * i);
        });
        this.queueStopHighlightingNote(duration * notes.length);
        if (isChord) {
            this.queueHighlightNote(notes.length, duration * (notes.length + 1));
            this.queueStopHighlightingNote(duration * (notes.length + 3));
        }
    }

    queueHighlightNote(i, when) {
        const timeoutId = setTimeout(() => {
            const barLine = document.querySelector("#staff rect");
            const { top: barLineTop, height: barLineHeight } = barLine.getBoundingClientRect();

            const note = document.querySelectorAll(".vf-note")[i];
            const { left, width, top: noteTop, bottom: noteBottom } = note.getBoundingClientRect();

            // Current note could be a chord, so we use the first note to find the height
            const noteHeight = document.querySelectorAll(".vf-note")[0].getBoundingClientRect().height;

            const top = Math.min(barLineTop - noteHeight, noteTop);
            const bottom = Math.max(barLineTop + barLineHeight + noteHeight, noteBottom);

            this.data.highlightedNote = {
                left: `${window.scrollX + left}px`,
                width: `${width}px`,
                top: `${window.scrollY + top}px`,
                height: `${bottom - top}px`,
            };
        }, when);
        this.timeoutIds.push(timeoutId);
    }

    queueStopHighlightingNote(when) {
        const timeoutId = setTimeout(() => {
            this.data.highlightedNote = null;
        }, when);
        this.timeoutIds.push(timeoutId);
    }

    cancelQueue() {
        for (let timeoutId of this.timeoutIds)
            clearTimeout(timeoutId);
        this.timeoutIds = [];
        this.data.highlightedNote = null;
    }
}
