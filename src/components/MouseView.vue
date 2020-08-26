<template>
  <div>
    <h2>Mouse View</h2>
    {{x}} - {{y}}
  </div>
</template>

<script>

import { useMousePosition } from '../functions/UseMousePosition'

export default {
  setup() {
    const { x, y } = useMousePosition()

    return { x, y };
  }
};
</script>