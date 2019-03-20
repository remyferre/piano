<template>
  <div>
    <Header></Header>
    <main id="app">
      <div class="usage-and-staff-container">
        <Usage></Usage>
        <div class="staff-container">
          <Staff></Staff>
        </div>
      </div>
      <div class="result-container">
        <Results></Results>
      </div>
      <div class="piano-container">
        <Piano></Piano>
      </div>
    </main>
  </div>
</template>

<script>
import Header from './components/header/Header.vue';
import Usage  from './components/Usage.vue';
import Piano from './components/piano/Piano.vue';
import Staff from './components/staff/Staff.vue';
import Results from './components/results/Results.vue';

export default {
	name: 'app',
	components: {
		Header,
		Usage,
		Piano,
		Staff,
		Results
	}
};
</script>

<style lang="scss">

@import "@/css/_colors.scss";
@import "@/css/_fonts.scss";
@import "@/css/_globals.scss";

/* Global */
html {
	box-sizing: border-box;
}
*, *:before, *:after {
	box-sizing: inherit;
}

body {
	margin: 0;
	display: flex;
	height: 100vh;
	max-height: 100vh;
	background-color: $background-color;
	flex-direction: column;
	@extend %main-font;
}

h1, h2, h3, h4, h5, h6 {
	@extend %title-font;
}

/* Avoid content jumping when scrollbar appear */
html {
    width: 100vw;
    overflow-x: hidden;
}

/* Reset */

button.reset {
	border: 0;
	background: none;
	color: inherit;
	font: inherit;
	padding: 0;
	cursor: pointer;
}
button:focus {
	outline: 0;
}
button.reset::-moz-focus-inner {
	border: 0;
}

/* Layout */
.result-container {
    width: 50vw;
	margin: auto;
	padding-bottom: $key-margin;
    margin-bottom: $piano-max-height;
}

@media only screen and (max-width: $piano-width * 2) {
	.result-container {
		width: $piano-width;
	}
}

$result-container-breakpoint: calc(#{$piano-width} + 2 * #{$key-margin});

@media only screen and (max-width: $result-container-breakpoint) {
	.result-container {
		width: 100vw;
		padding-left : $key-margin;
		padding-right: $key-margin;
	}
}

.piano-container {
	position: fixed;
	bottom: 0;
	left     : 50vw;
	transform: translate(-50%);
}
.usage-and-staff-container {
	display: flex;
	width: 100vw;
	align-items: center;
	justify-content: center;
	background-color: white;
}
.staff-container {
	display: flex;
	justify-content: center;
}
</style>
