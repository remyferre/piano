<template>
	<p v-if="!selectedKey" class="usage">{{ this.$store.state.activeTab.usage() }}</p>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: "Usage",
    computed: mapState(["selectedKey"])
};
</script>

<style scoped lang="scss">
.usage {
	font-size: 1.5rem;
    text-align: center;
}
</style>
