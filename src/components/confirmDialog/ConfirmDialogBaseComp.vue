<template>
	<transition name="fade">
		<div class="confirm-dialog-container" v-show="open">
			<transition name="drop-in">
				<div class="confirm-dialog-inner" v-show="open">
					<div class="confirm-dialog-header">
						<div class="title">
							<h1>{{ title }}</h1>
						</div>
						<button type="button" @click="close">
							<font-awesome-icon icon="fa-solid fa-xmark" />
						</button>
					</div>
					<div class="confirm-dialog-content">
						<slot name="content"></slot>
					</div>
				</div>
			</transition>
		</div>
	</transition>
</template>

<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

library.add(faXmark);

defineProps({
	open: {
		type: Boolean,
		required: true
	},
	title: {
		type: String,
		default: "Modal"
	}
});

const emit = defineEmits(["close"]);

const close = () => {
	emit("close");
};

</script>

<style scoped>
*,
::before,
::after {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

.confirm-dialog-container {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	overflow-x: hidden;
	overflow-y: auto;
	background-color: rgba(0, 0, 0, 0.4);
	z-index: 1;
}

.confirm-dialog-inner {
	max-width: fit-content;
	margin: 10rem auto;
	background-color: var(--color-background-box);
	border: 1px solid var(--color-border-navside);
	padding: 1rem;
	border-radius: var(--border-radius);
	max-height: 400px;
}

.confirm-dialog-header {
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	gap: 1.5rem;
}

.confirm-dialog-header button * {
	font-size: 1.5rem;
}

.confirm-dialog-header h1 {
	font-size: 1.5rem;
	color: var(--color-heading);
}

.confirm-dialog-header h1::first-letter {
	text-transform: uppercase;
}

.confirm-dialog-header .title {
	max-width: 400px;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
}

.confirm-dialog-header button {
	border: none;
	padding: 0;
	width: fit-content;
	font-size: 1.3rem;
	color: var(--color-body-table);
	background-color: transparent;
}

.confirm-dialog-header button:hover {
	color: var(--color-heading);
	cursor: pointer;
}

.confirm-dialog-content {
	padding: 0.1rem;
	position: relative;
	background-clip: padding-box;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.drop-in-enter-active,
.drop-in-leave-active {
  transition: all 0.3s ease-out;
}

.drop-in-enter-from,
.drop-in-leave-to {
  opacity: 0;
  transform: translate(0, -50px);
}

@media only screen and (max-width: 1024px) {
	.confirm-dialog-header .title {
		max-width: 350px;
	}

	.confirm-dialog-header h1 {
		font-size: 1.4rem;
	}

	.confirm-dialog-content {
		max-width: 300px;
	}
}

@media only screen and (max-width: 768px) {
    .confirm-dialog-header .title {
		max-width: 200px;
	}

	.confirm-dialog-header h1 {
		font-size: 1.2rem;
	}

	.confirm-dialog-content {
		max-width: 200px;
	}
}
</style>