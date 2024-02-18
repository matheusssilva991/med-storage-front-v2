<template>
	<LoggedTemplateComp>
		<template #box-content>
			<BoxComp title="Banco de imagens">
				<template #button>
					<ButtonComp v-if="user.role === 'admin'" btn-class="btn-primary" text="Novo">
						<template #icon>
							<font-awesome-icon icon="fa-solid fa-plus" />
						</template>
					</ButtonComp>
					<ButtonComp v-else btn-class="btn-primary" text="Solicitar">
						<template #icon>
							<font-awesome-icon icon="fa-solid fa-plus" />
						</template>
					</ButtonComp>

				</template>
				<template #content>
					<table class="table" border="0">
						<thead>
							<tr>
								<th>Nome</th>
								<th>Tipo de exame</th>
								<th>Quantidade de imagens</th>
								<th>Ações</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="database in databases" key="_id">
								<td>{{ database.name }}</td>
								<td>{{ database.examType.name }}</td>
								<td>{{ database.images.length }} imagens</td>
								<td class="table-actions">
									<button aria-label="Visualizar" @click="isOpenViewModal = !isOpenViewModal">
										<font-awesome-icon icon="fa-solid fa-eye" />
									</button>
									<button v-if="user.role === 'admin'" aria-label="Editar">
										<font-awesome-icon icon="fa-solid fa-pen-to-square" />
									</button>
									<button v-if="user.role === 'admin'" aria-label="Excluir">
										<font-awesome-icon icon="fa-solid fa-trash" />
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</template>
			</BoxComp>
		</template>
	</LoggedTemplateComp>
	<ModalComp :open="isOpenViewModal" @close="isOpenViewModal = !isOpenViewModal" title="Visualizar">
		<template #content>
			<h1>Content</h1>
		</template>
	</ModalComp>
</template>

<script setup lang="ts">
import LoggedTemplateComp from '@/components/LoggedTemplateComp.vue';
import BoxComp from '@/components/BoxComp.vue';
import ButtonComp from '@/components/buttons/ButtonComp.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faEye, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ref, onMounted } from 'vue';
import axios from 'axios'
import { checkToken } from '@/helpers/auth';
import ModalComp from '@/components/modals/ModalComp.vue';

library.add(faPlus, faEye, faPenToSquare, faTrash);

const databases: any = ref([]);
const user: any = ref({});
const isOpenViewModal = ref(false);

onMounted(async () => {
	const token = localStorage.getItem('token');
	user.value = await checkToken(token)

	try {
		const { data } = await axios.get('http://localhost:3000/api/databases', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		databases.value = data;
	} catch (error) {
		console.error(error);
	}
});
</script>

<style scoped>
.table {
	border-collapse: collapse;
	width: 100%;
	margin-top: 1rem;
	margin: 0 auto;
	/* border-top: 1px solid var(--color-border-table); */
}

.table tr {
	border-bottom: 1px solid var(--color-border-table);
}

.table th,
.table td {
	text-align: center;
	padding: 0.4rem;
}

.table th {
	color: var(--color-text-heading);
	font-size: 1.12rem;
	font-weight: 800;
}

.table tbody tr {
	color: var(--color-body-table);
	font-size: 1rem;
}

.table tbody tr:hover {
	/*     color: var(--color-text-table-hover); */
	background-color: var(--color-background-table-hover);
}

.table-actions {
	display: flex;
	justify-content: center;
	gap: 0.5rem;
}

.table-actions button {
	border: none;
	padding: 0;
	width: fit-content;
	font-size: 1.1rem;
	color: var(--color-body-table);
	background-color: transparent;
}

.table-actions button:hover {
	color: var(--color-heading);
	cursor: pointer;
}

.table-actions button:active {
	transform: scale(0.9);
}

.table-actions button:focus {
	outline: none;
}

@media only screen and (max-width: 1024px) {
	.table th {
		font-size: 0.9rem;
	}

	.table tbody tr {
		font-size: 0.8rem;
	}

	.table-actions button {
		font-size: 0.9rem;
	}
}

@media only screen and (max-width: 720px) {
	.table th {
		font-size: 0.8rem;
	}

	.table tbody tr {
		font-size: 0.7rem;
	}

	.table-actions button {
		font-size: 0.8rem;
	}
}
</style>