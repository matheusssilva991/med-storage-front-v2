<template>
	<nav class="navside-container">

		<router-link :to="items[0].route" :class="{ 'navside-item': true, 'active': items[0].isActive }">
			<font-awesome-icon :icon="items[0].icon" />
			{{ items[0].text }}
		</router-link>

		<router-link :to="items[1].route" :class="{ 'navside-item': true, 'active': items[1].isActive }">
			<font-awesome-icon :icon="items[1].icon" />
			{{ items[1].text }}
		</router-link>

		<router-link v-if="user.role === 'admin'" :to="items[2].route"
			:class="{ 'navside-item': true, 'active': items[2].isActive }">
			<font-awesome-icon :icon="items[2].icon" />
			{{ items[2].text }}
		</router-link>

		<router-link :to="items[3].route" :class="{ 'navside-item': true, 'active': items[3].isActive }">
			<font-awesome-icon :icon="items[3].icon" />
			{{ items[3].text }}
		</router-link>

		<router-link v-if="user.role === 'admin'" :to="items[4].route"
			:class="{ 'navside-item': true, 'active': items[4].isActive }">
			<font-awesome-icon :icon="items[4].icon" />
			{{ items[4].text }}
		</router-link>
	</nav>
</template>

<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faDatabase,
	faEnvelopesBulk,
	faFileImage,
	faImages,
	faUserGroup
} from '@fortawesome/free-solid-svg-icons';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { checkToken } from '@/helpers/auth';

library.add(faDatabase, faImages, faFileImage, faUserGroup, faEnvelopesBulk);

const router = useRouter();
const currentRoute = ref(router.currentRoute.value.path);
const token = localStorage.getItem('token');
const user: any = ref({});

onMounted(async () => {
	if (token) {
		user.value = await checkToken(token);
	}
})

const items = ref([
	{
		icon: 'fa-solid fa-database',
		text: 'Banco de imagens',
		route: '/databases',
		isActive: currentRoute.value == '/databases'
	},
	{
		icon: 'fa-solid fa-images',
		text: 'Imagens',
		route: '/images',
		isActive: currentRoute.value == '/images'
	},
	{
		icon: 'fa-solid fa-user-group',
		text: 'Usuários',
		route: '/users',
		isActive: currentRoute.value == '/users'
	},
	{
		icon: 'fa-solid fa-file-image',
		text: 'Tipos de imagens',
		route: '/image-types',
		isActive: currentRoute.value == '/image-types'
	},
	{
		icon: 'fa-solid fa-envelopes-bulk',
		text: 'Solicitações',
		route: '/solicitations',
		isActive: currentRoute.value == '/solicitations'
	}
]);

</script>

<style scoped>
.navside-container {
	width: 100%;
	min-width: fit-content;
	height: 100%;
	background-color: var(--color-background-navside);
	border-radius: var(--border-radius);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	padding: 1.3rem;
	box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
	font-size: 0.9rem;
}

.navside-item {
	width: 100%;
	height: fit-content;
	display: flex;
	border: 1px solid var(--color-border-navside);
	border-top: none;
	align-items: center;
	justify-content: flex-start;
	transition: background-color 0.2s;
	text-decoration: none;
	color: var(--color-text);
	font-size: 1em;
	gap: 0.7rem;
	padding: 0.5rem 0.7rem 0.5rem 0.7rem;
	font-weight: 600;
}

.navside-item:hover {
	background-color: var(--color-background-navside-hover);
	border-radius: 0.3rem;
	cursor: pointer;
	transition: background-color 0.2s;
	color: var(--color-text-navside-hover);
	transform: scale(0.97);
}

.active {
	background-color: var(--color-background-navside-hover);
	border-radius: 0.3rem;
	transition: background-color 0.2s;
	color: var(--color-text-navside-hover);
	transform: scale(0.97);
	cursor: default;
}

@media screen and (max-width: 1024px) {
	.navside-container {
		font-size: 0.8rem;
	}
}

@media screen and (max-width: 768px) {
	.navside-container {
		flex-direction: row;
		flex-wrap: wrap;
		width: 100%;
		height: fit-content;
		font-size: 0.7rem;
	}

	.navside-item {
		flex-wrap: wrap;
		width: fit-content;
	}
}
</style>