<template>
	<input class="input" :value="modelValue" @input="updateInput" type="text" />
</template>

<script>
	export default {
		name: "my-input",
		props: {
			modelValue: [String, Number],
		},
		methods: {
			updateInput(event) {
				this.$emit("update:modelValue", event.target.value);
			},
		},
	};
</script>

<style scoped>
	.input {
		border: 1px solid teal;
		padding: 10px 15px;
		margin-top: 15px;
	}

	:active,
	:hover,
	:focus {
		outline: 0;
		outline-offset: 0;
	}
</style>
