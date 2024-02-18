<template>
	<transition name="fade">
		<div class="modal-container" v-show="open">
			<transition name="drop-in">
				<div class="modal-inner" v-show="open">
					<div class="modal-header">
						<h1>{{ title }}</h1>
						<button type="button" @click="close">
							<font-awesome-icon icon="fa-solid fa-xmark" />
						</button>
					</div>
					<div class="modal-content">
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

.modal-container {
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

.modal-inner {
	max-width: fit-content;
	margin: 2rem auto;
	background-color: var(--color-background-box);
	border: 1px solid var(--color-border-navside);
	padding: 1rem;
	border-radius: var(--border-radius);
}

.modal-header {
	position: relative;
	display: flex;
	justify-content: space-between;
	gap: 0.5rem;
}

.modal-header h1 {
	font-size: 1.5rem;
	color: var(--color-heading);
}

.modal-header button {
	border: none;
	padding: 0;
	width: fit-content;
	font-size: 1.3rem;
	color: var(--color-body-table);
	background-color: transparent;
}

.modal-header button:hover {
	color: var(--color-heading);
	cursor: pointer;
}

.modal-content {
	position: relative;
	background-clip: padding-box;
	margin-top: 1rem;
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
</style>