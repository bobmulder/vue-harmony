import { ref, onMounted, onUnmounted } from 'vue'

export function useMousePosition() {
  const x = ref(0)
  const y = ref(0)

  function update(e) {
    x.value = e.pageX
    y.value = e.pageY
  }

  onMounted(() => {
    console.log('onMounted')

    window.addEventListener('mousemove', update)
  })

  onUnmounted(() => {
    console.log('onUnmounted')
    
    window.removeEventListener('mousemove', update)
  })

  return { x, y }
}