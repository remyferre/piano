<template>
  <section class="piano">
	<div class="white-and-black-keys">
      <WhiteKey index="0" name="Do"></WhiteKey>
      <BlackKey index="1" first-name="Do♯" second-name="Ré♭"></BlackKey>
	</div>
	<div class="white-and-black-keys">
      <WhiteKey index="2" name="Ré"></WhiteKey>
      <BlackKey index="3" first-name="Ré♯" second-name="Mi♭"></BlackKey>
	</div>
	<div class="white-and-black-keys">
      <WhiteKey index="4" name="Mi"></WhiteKey>
	</div>
	<div class="white-and-black-keys">
      <WhiteKey index="5" name="Fa"></WhiteKey>
      <BlackKey index="6" first-name="Fa♯" second-name="Sol♭"></BlackKey>
	</div>
	<div class="white-and-black-keys">
      <WhiteKey index="7" name="Sol"></WhiteKey>
      <BlackKey index="8" first-name="Sol♯" second-name="La♭"></BlackKey>
	</div>
	<div class="white-and-black-keys">
      <WhiteKey index="9" name="La"></WhiteKey>
      <BlackKey index="10" first-name="La♯" second-name="Si♭"></BlackKey>
	</div>
	<div class="white-and-black-keys">
      <WhiteKey index="11" name="Si"></WhiteKey>
	</div>
  </section>
</template>

<script>
import WhiteKey from './WhiteKey.vue';
import BlackKey from './BlackKey.vue';

export default {
    components: {
        WhiteKey,
        BlackKey
    }
};
</script>

<style scoped lang="scss">
.piano {
	height: 350px;
	max-height: 40vh;
	max-width: 500px;
	width: 100%;
	display: inline-flex;
	flex-direction: row;
	outline: 1px solid #222;
	position: relative;
	color: #222;
	user-select: none;
	-moz-user-select: none;
}

.white-and-black-keys {
	flex-grow: 1;
	position: relative;
}
.piano-key:not(:last-child) {
	outline-right: 0;
}

/* TODO: this belongs to PianoKey, but mixins can't have style */
.piano-key {
	box-sizing: border-box;
	cursor: pointer;
	display: flex;
	flex-direction: column-reverse;
	align-items: center;
    &.pressed {
        background-color: #f9a13e;
    }
    .note-name {
        width: 25px;
        text-align: center;
    }
}
@media only screen and (min-width : 901px) and (max-width : 9999px) {
	.piano {
		width: 532px;
	}
}
</style>
