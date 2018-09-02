<template>
  <main id="app">
	<div class="piano-and-staff">
      <Usage></Usage>
      <div class="piano-container">
        <Piano></Piano>
      </div>
      <Staff></Staff>
    </div>
    <div class="result-container">
      <Results></Results>
    </div>
  </main>
</template>

<script>
import Usage from './components/Usage.vue';
import Piano from './components/piano/Piano.vue';
import Staff from './components/staff/Staff.vue';
import Results from './components/results/Results.vue';

export default {
	name: 'app',
	components: {
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
	color: $font-color;
	font-family: 'Roboto', sans-serif;
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
button.reset::-moz-focus-inner {
	border: 0;
}

/* Header */

.site-header {
	background: linear-gradient(135deg, $header-left-color 0%, $header-right-color 100%);
    min-height: 40px;
    height    : 40px;
    h1 {
        @extend %title-font;
        text-transform: uppercase;
        margin: 0 1rem;
        font-family: Raleway, sans-serif;
        letter-spacing: .15em;
        $shadow-color: mix($title-color, $header-left-color, 25%);
        text-shadow: -1px 2px 1px $shadow-color, -2px 4px 1px $shadow-color,
                     -3px 6px 1px $shadow-color, -4px 8px 1px $shadow-color;
    }
}

/* Layout */
.result-container {
	margin-bottom: 1rem;
}
@media only screen and (min-width : 532px) and (max-width : 900px) {
	body {
		/* background-color: #edd0c3; */
	}
	main {
		width: 532px;
		margin: 0 auto;
	}
}
@media only screen and (max-width : 900px) {
	main {
		padding: 0 1rem;
	}
}
@media only screen and (min-width : 901px) and (max-width : 9999px) {
	html, body {
		height: 100%;
	}
	body {
		/* background-color: #dcbfb2; */
	}
	main {
		display: flex;
	}
	.piano-and-staff {
		height: calc(100vh - 40px);
		max-height: calc(100vh - 40px);
		display: flex;
		flex-direction: column;
		min-width: 532px;
		width: 50vw;
		align-items: center;
		padding: 5vh 0;
	}
	.result-container {
		width: 50vw;
		max-width: 50vw;
		padding-right: 10px; /* Avoid content from being hidden by the scrollbar */
		padding-right: calc((50vw - 532px) / 2);
	}
}
</style>
