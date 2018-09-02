<template>
  <div @click="press()"
       class="piano-key black-key" :class="{ pressed: isPressed }">
    <span class="note-name">{{ secondName }}</span>
    <span class="note-name">{{ firstName }}</span>
  </div>
</template>

<script>
import PianoKey from './PianoKey.js';

export default {
	mixins: [PianoKey],
	props: ['first-name', 'second-name'],
};
</script>

<style scoped lang="scss">
@import "@/css/_colors.scss";

.black-key {
	width: 75%;
	height: 60%;
	background-color: $black;
	position: absolute;
	top: 0;
	left: 62.5%;
	z-index: 2;
	border: 2px solid $black;
	border-top: 1px solid $black;
    .note-name {
        padding-bottom: 0.5rem;
    }
}
</style>
