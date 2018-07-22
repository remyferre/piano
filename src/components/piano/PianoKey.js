export default {
	props: ['index'],
	methods: {
		press() {
			this.$store.commit('pressKey', this.index);
		}
	},
	computed: {
		isPressed() {
			return this.$store.state.piano[this.index];
		}
	}
};
