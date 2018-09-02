<template>
  <div @click="press()" class="piano-key white-key" :class="{ pressed: isPressed }">
    <span class="note-name">{{name}}</span>
  </div>
</template>

<script>
import PianoKey from './PianoKey.js';

export default {
	mixins: [PianoKey],
	props: ['name'],
};
</script>

<style scoped lang="scss">
@import "@/css/_colors.scss";

.white-key {
	background-color: white;
	height: 100%;
	border: 1px solid $black;
    .note-name {
        padding-bottom: 1rem;
    }
}
</style>
