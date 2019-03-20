<template>
  <header class="site-header">
    <h1>Piano'matic</h1>
    <nav :class="{ 'full-screen-navigation': fullScreenNavigation }">
	  <button class="reset close" @click="closeFullScreenNavigation()">
		<FontAwesomeIcon icon="times" />
	  </button>
	  <Tab :tab="this.$store.state.scales" @tab-click="closeFullScreenNavigation" />
	  <Tab :tab="this.$store.state.chords" @tab-click="closeFullScreenNavigation" />
	  <button class="reset" @click="fullScreenNavigation = true">
		<FontAwesomeIcon icon="bars" class="hamburger" />
	  </button>
    </nav>
  </header>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Tab from './Tab.vue';

library.add(faBars, faTimes);

export default {
	name: 'Header',
	data() {
		return {
			fullScreenNavigation: false
		};
	},
	methods: {
		closeFullScreenNavigation() {
			this.fullScreenNavigation = false;
		}
	},
	components: {
		Tab,
		FontAwesomeIcon,
	}
};
</script>

<style lang="scss">

@import "@/css/_colors.scss";
@import "@/css/_fonts.scss";

.site-header {
    display: flex;
	background: linear-gradient(135deg, $header-left-color 0%, $header-right-color 100%);

	h1 {
		@extend %logo-font;
		text-transform: uppercase;
		margin: 0 1rem;
		letter-spacing: .15em;
		$shadow-color: rgba(0, 0, 0, 0.075);
		text-shadow: -1px 2px 1px $shadow-color, -2px 4px 1px $shadow-color,
					 -3px 6px 1px $shadow-color, -4px 8px 1px $shadow-color;
	}
}

nav {
    display: flex;
    margin-left: auto;
    margin-right: 3vw;

	button.tab {
		@extend %title-font;
		font-size: 1.4rem;
		padding: 0 0.5rem;
	}
}

.hamburger, .close svg {
	font-size: 1.5rem;
}

.hamburger {
	display: none;
}

.close {
	position: absolute;
	top  : 0.5rem;
	right: 0.8rem;
	display: none;
}

nav:not(.full-screen-navigation) .tab {
	border-bottom: 5px solid transparent;
	&.selected {
		border-bottom: 5px solid $black;
	}

	&:hover {
		background-color: $white-hover;
	}
}

nav.full-screen-navigation {
	z-index: 999;
	position: fixed;
	width : 100vw;
	height: 100vh;
	left: 0;
	top : 0;

	flex-direction: column;
	justify-content: center;
	background-color: rgba($header-left-color, 0.9);

	.tab {
		font-weight: bold;
		margin-bottom: 1rem;
	}

	.close {
		display: block;
	}
}

$header-breakpoint: 500px;

@media only screen and (max-width: $header-breakpoint) {
	nav:not(.full-screen-navigation) {
		.hamburger {
			display: block;
		}
		.tab {
			display: none;
		}
	}
}
</style>
