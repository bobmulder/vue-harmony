import { ref, computed, onMounted, onUnmounted } from 'vue'

import WebMidi from 'webmidi';

import { Chord } from "@tonaljs/tonal";

export function useMidi() {
  const devices = ref([])
  const selectedDeviceId = ref(null)


  // device related

  const currentDeviceId = computed(() => {
    if(selectedDeviceId.value) return selectedDeviceId.value
    
    return WebMidi.outputs[0].id
  })


  // note related

  const currentNotes = ref([])

  const chords = computed(() => {
    if (currentNotes.value.length === 0) return [];
    
    let chords = Chord.detect(currentNotes.value.map(x => x.name))

    console.log('detect for', currentNotes.value.map(x => x.name), chords)

    return chords.length > 0 ? chords : [];
  });

  const chord = computed(() => {
    return chords.value.length > 0 ? chords.value.shift() : null;
  });


  // actions (play) related

  const playNote = function(name) {
    let output = WebMidi
      .getOutputById(currentDeviceId.value);

    console.log(WebMidi.outputs, currentDeviceId.value, output);

    output
      .playNote(name, 1)
  }

  onMounted(() => {
    console.log('onMounted')

    WebMidi.enable(err => {
      if (err) {
        return console.log("WebMidi could not be enabled.", err);
      } 
      console.log("WebMidi is enabled!", WebMidi.inputs)

      devices.value = WebMidi.inputs

      var input = WebMidi.inputs[0];

      input.addListener('noteon', "all", (e) => {
        currentNotes.value = [...currentNotes.value, e.note].sort((x, y) => x.number - y.number)
      });

      input.addListener('noteoff', "all", (e) => {
        currentNotes.value = currentNotes.value.filter(x => x.number !== e.note.number)
      });

    });
  })

  onUnmounted(() => {
    // @TODO
  })

  return { 
    currentNotes,
    chords,
    chord,
    playNote
  }
}