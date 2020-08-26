<template>
  <div>
    <input v-model="chordKey" />
    <input v-model="type" />
    <button @click="play">Play</button>
    <pre>
      {{ currentNotes }}
    </pre>

    <h2 v-if="chord">Sounds like a {{ chord }} chord</h2>
    <h2 v-if="negativeChord">The negative chord is a {{ negativeChord }} chord</h2>
    <h2 v-if="negativeNote">The negative version is a {{ negativeNote }} note</h2>

  </div>
</template>

<script>
import { ref, computed } from "vue";

import { useMidi } from '../functions/UseMidi'
import { calculateNegativeForNote, calculateNegativeChord } from '../utils/NegativeHarmony' 

export default {
  setup() {
    const { currentNotes, chord, playNote } = useMidi()

    const chordKey = ref("C")
    const type = ref("major")

    const inverted = computed(() => {
      return '';
      // if (currentNotes.value.length === 0) return;

      // let chord = pianissimo
      //   .chord(currentNotes.value.map(x => x.name));

      // console.log(chord)
      // return inversion ? inversion.getNotesName() : null;
    });

    const negativeNote = computed(() => {
      if(currentNotes.value.length !== 1) return;

      let note = `${currentNotes.value[0].name}${currentNotes.value[0].octave}`;
      let key = `${chordKey.value}${currentNotes.value[0].octave}`;

      return calculateNegativeForNote(note, key);
    })

    const negativeChord = computed(() => {
      if(!chord || currentNotes.value.length < 1) return;

      let key = `${chordKey.value}${currentNotes.value[0].octave}`;

      return calculateNegativeChord(currentNotes.value.map(x => `${x.name}${x.octave}`), key);
    })

    function play() {
      playNote('G4');
    }

    return { 
      currentNotes, 
      chordKey,
      type,
      play, 
      chord, 
      inverted, 
      negativeNote,
      negativeChord
    };
  }
};
</script>