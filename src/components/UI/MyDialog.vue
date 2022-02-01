<template>
	<div class="dialog" v-if="show" @click.stop="hideDialog">
		<div @click.stop class="dialog__content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: "my-dialog",
		props: {
			show: {
				type: Boolean,
				default: false,
			},
		},
		methods: {
			hideDialog() {
				this.$emit("update:show", false);
			},
		},
	};
</script>

<style scoped>
	.dialog {
		display: flex;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
		position: fixed;
	}

	.dialog__content {
		background: white;
		border-radius: 12px;
		min-width: 300px;
		min-height: 50px;
		margin: auto;
		padding: 20px;
	}
</style>
