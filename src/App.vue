<template>
  <div>
    <header class="site-header">
      <h1>Piano'matic</h1>
      <div class="tabs">
        <Tab :tab="this.$store.state.scales"></Tab>
        <Tab :tab="this.$store.state.chords"></Tab>
      </div>
    </header>
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
import Tab from './components/results/Tab.vue';
import Usage  from './components/Usage.vue';
import Piano from './components/piano/Piano.vue';
import Staff from './components/staff/Staff.vue';
import Results from './components/results/Results.vue';

export default {
	name: 'app',
	components: {
		Tab,
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

/* Header */

.site-header {
    display: flex;
	background: linear-gradient(135deg, $header-left-color 0%, $header-right-color 100%);
    min-height: 40px;
    height    : 40px;
    h1 {
        @extend %logo-font;
        text-transform: uppercase;
        margin: 0 1rem;
        letter-spacing: .15em;
        $shadow-color: mix($title-color, $header-left-color, 25%);
        text-shadow: -1px 2px 1px $shadow-color, -2px 4px 1px $shadow-color,
                     -3px 6px 1px $shadow-color, -4px 8px 1px $shadow-color;
    }
	.tabs {
         display: flex;
         margin-left: auto;
         margin-right: 50px;
	}
}

/* Layout */
.result-container {
    max-width: 50vw;
	margin: auto;
	padding-bottom: 1rem;
    margin-bottom: 200px;
}
.piano-container {
	position: fixed;
	bottom: 0;
	left  : 0;
	width: 100vw;
	display: flex;
	justify-content: center;
}
.usage-and-staff-container {
	display: flex;
	width: 100vw;
	height: 200px;
	align-items: center;
	justify-content: center;
	background-color: white;
}
.staff-container {
	display: flex;
	justify-content: center;
}

@media only screen and (min-width : 532px) and (max-width : 900px) {
}

@media only screen and (min-width : 901px) and (max-width : 9999px) {
}
</style>
