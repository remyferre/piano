<template>
	<p class="usage">{{ text }}</p>
</template>

<script>
export default {
	name: "Usage",
	computed: {
		text() {
			if (this.$store.state.activeTab == 'SCALE')
				return "Appuyez sur les touches du piano pour afficher les gammes correspondantes.";
			else
				return "Appuyez sur les touches du piano pour afficher les accords correspondants.";
		}
	}
};
</script>

<style scoped lang="scss">
.usage {
	margin: 1rem 0;
}
@media only screen and (min-width : 901px) and (max-width : 9999px) {
    .usage {
        width: 532px;
        text-align: center;
    }
}
</style>
