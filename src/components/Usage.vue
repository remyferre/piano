<template>
	<p v-if="!key" class="usage">{{ this.$store.state.activeTab.usage() }}</p>
</template>

<script>
export default {
	name: "Usage",
    computed: {
        key() {
            return this.$store.state.selectedKey;
        }
	}
};
</script>

<style scoped lang="scss">
.usage {
	font-size: 1.5rem;
    text-align: center;
}
</style>
