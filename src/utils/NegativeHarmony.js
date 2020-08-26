import { Chord, Midi } from "@tonaljs/tonal";

// function getRange(midiNote) {
//   return Range.numeric((midiNote - 12, midiNote + 12))
// }

export function calculateNegativeForNote(note, key) {

  let midiKeyNote = Midi.toMidi(key) 
  let midiNote = Midi.toMidi(note);

  let axes = [
    midiKeyNote + 3,  // left
    midiKeyNote + 4   // right
  ];

  // its left side
  if(midiNote <= axes[0]) {
    let distance = axes[0] - midiNote;
    let negativeMidiNote = axes[1] + distance;

    return Midi.midiToNoteName(negativeMidiNote, { pitchClass: true });
  }

  // its right side
  if(midiNote >= axes[1]) {
    let distance = midiNote - axes[1];
    let negativeMidiNote = axes[0] - distance;

    return Midi.midiToNoteName(negativeMidiNote, { pitchClass: true });
  }
}

export function calculateNegativeChord(notes, key) {
  console.log('calculateNegativeChord', notes, key)
  let negativeNotes = notes.map(x => calculateNegativeForNote(x, key));

  return Chord.detect(negativeNotes);
}
