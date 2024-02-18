<template>
	<div class="container">
		<SideNavComp class="nav-side" />
		<div class="box">
			<slot name="box-content"></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import SideNavComp from '@/components/NavSideComp.vue';

</script>

<style scoped>
.container {
	margin-top: 2.5rem;
	display: flex;
	justify-content: space-evenly;
	width: 100%;
	gap: 1rem;
}

.nav-side {
	width: 20%;
}

.box {
	width: 75%;
}

@media screen and (max-width: 1024px) {
	.box {
		width: 68%;
	}

}

@media screen and (max-width: 768px) {
	.container {
		flex-direction: column;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		width: 93%;
		margin: 2.5rem auto;

	}

	.nav-side {
		width: 100%;
	}

	.box {
		width: 100%;
	}
}
</style>