<template>
  <div class="layer-css">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.layer-css {
  pointer-events: none;
  position: fixed;
  left: 0;
  top: 0;
  width: 3840px;
  height: 3024px;
}
</style>
