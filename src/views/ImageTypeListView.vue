<template>
	<LoggedTemplateComp>
		<template #box-content>
			<BoxComp title="Tipos de imagem" class="container">
				<template #button>
					<ButtonComp v-if="user.role === 'admin'" btn-class="btn-primary" text="Novo"
						@click="isOpenCreateModal = !isOpenCreateModal">
						<template #icon>
							<font-awesome-icon icon="fa-solid fa-plus" />
						</template>
					</ButtonComp>
				</template>

				<template #inputs>
					<InputComp type="text" placeholder="Buscar tipo de imagem" v-model="search">
						<template #icon>
							<font-awesome-icon icon="fa-solid fa-magnifying-glass" />
						</template>
					</InputComp>
				</template>

				<template #content>
					<table class="table" border="0">
						<thead>
							<tr>
								<th>Nome</th>
								<th>Quantidade de dados requeridos</th>
								<th>Quantidade de dados opcionais</th>
								<th>Ações</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="imageType in imageTypes" :key="imageType._id">
								<td>{{ imageType.name }}</td>
								<td>{{ imageType.requiredData.length }}</td>
								<td>{{ imageType.optionalData.length }}</td>
								<td class="table-actions">
									<button aria-label="Visualizar" @click="openViewModal(imageType._id)">
										<font-awesome-icon icon="fa-solid fa-eye" />
									</button>
									<button v-if="user.role === 'admin'" aria-label="Editar"
										@click="openEditModal(imageType._id)">
										<font-awesome-icon icon="fa-solid fa-pen-to-square" />
									</button>
									<button v-if="user.role === 'admin'" aria-label="Excluir"
									@click="openDeleteConfirmDialog(imageType._id)">
										<font-awesome-icon icon="fa-solid fa-trash" />
									</button>
								</td>
							</tr>
						</tbody>
					</table>

					<div class="buttons-container">
						<ButtonComp btn-class="btn-primary" text="< Anterior" @click="page = prevPage(page)"
							v-if="page > 1" />
						<ButtonComp btn-class="btn-primary" text="Anterior" v-else :isDisabled="true" />

						<ButtonComp v-if="imageTypes.length >= limit" btn-class="btn-primary" text="Próximo >"
							@click="page = nextPage(page, imageTypes.length)" />
						<ButtonComp v-else btn-class="btn-primary" text="Próximo" :isDisabled="true" />
					</div>
				</template>
			</BoxComp>
		</template>
	</LoggedTemplateComp>
	<CreateImageTypeModalComp :open="isOpenCreateModal" @close="closeCreateModal" />
	<ViewImageTypeModalComp v-if="isOpenViewModal" :open="isOpenViewModal" @close="closeViewModal"
		:imageTypeId="imageTypeId" />
	<EditImageTypeModalComp v-if="isOpenEditModal" :open="isOpenEditModal" @close="closeEditModal"
		:imageTypeId="imageTypeId" />
	<ConfirmDialogComp v-if="isOpenDeleteConfirmDialog" :open="isOpenDeleteConfirmDialog" title="Confirmar"
        @close="closeDeleteConfirmDialog"
        :reject-function="closeDeleteConfirmDialog"
        :accept-function="deleteImageType"
        message="Deseja realmente excluir esse tipo de imagem?"
        accept-class="btn-danger">
        <template #icon>
            <font-awesome-icon icon="fa-solid fa-circle-exclamation" />
        </template>
    </ConfirmDialogComp>
</template>

<script setup lang="ts">
import BoxComp from '@/components/BoxComp.vue';
import LoggedTemplateComp from '@/components/LoggedTemplateComp.vue';
import ButtonComp from '@/components/buttons/ButtonComp.vue';
import ConfirmDialogComp from '@/components/confirmDialog/ConfirmDialogComp.vue';
import InputComp from '@/components/inputs/InputComp.vue';
import CreateImageTypeModalComp from '@/components/modals/imageType/CreateImageTypeModalComp.vue';
import EditImageTypeModalComp from '@/components/modals/imageType/EditImageTypeModalComp.vue';
import ViewImageTypeModalComp from '@/components/modals/imageType/ViewImageTypeModalComp.vue';
import { getData } from '@/helpers/api';
import { nextPage, prevPage } from '@/helpers/pagination';
import { toastError } from '@/helpers/toast-messages';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircleExclamation, faEye, faFilter, faMagnifyingGlass, faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';

library.add(faPlus, faEye, faPenToSquare, faTrash, faMagnifyingGlass, faFilter, faCircleExclamation);

// Variáveis reativas
const imageTypes: any = ref([]);
const user: any = ref({});
const isOpenViewModal = ref(false);
const isOpenCreateModal = ref(false);
const isOpenEditModal = ref(false);
const isOpenDeleteConfirmDialog = ref(false);
const search = ref('');
const page = ref(1);
const limit = ref(10);
const imageTypeId = ref('');

// Funções
const closeCreateModal = async () => {
	isOpenCreateModal.value = !isOpenCreateModal.value;
	const response = await getData(`http://localhost:3000/api/image-types?page=${page.value}&limit=${limit.value}`);
	imageTypes.value = response.data;
};

const openViewModal = (id: string) => {
	isOpenViewModal.value = !isOpenViewModal.value;
	imageTypeId.value = id;
};

const openEditModal = (id: string) => {
	isOpenEditModal.value = !isOpenEditModal.value;
	imageTypeId.value = id;
};

const closeViewModal = () => {
	isOpenViewModal.value = !isOpenViewModal.value;
	imageTypeId.value = '';
};

const closeEditModal = async () => {
	isOpenEditModal.value = !isOpenEditModal.value;
	imageTypeId.value = '';
	const response = await getData(`http://localhost:3000/api/image-types?page=${page.value}&limit=${limit.value}`);
	imageTypes.value = response.data;
};

const openDeleteConfirmDialog = (id: string) => {
	isOpenDeleteConfirmDialog.value = !isOpenDeleteConfirmDialog.value;
	imageTypeId.value = id;
};

const closeDeleteConfirmDialog = () => {
	isOpenDeleteConfirmDialog.value = !isOpenDeleteConfirmDialog.value;
	imageTypeId.value = '';
};

const deleteImageType = async () => {
	try {
		const response = await axios.delete(`http://localhost:3000/api/image-type/${imageTypeId.value}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		});
		const imageTypesResponse = await getData(`http://localhost:3000/api/image-types?page=${page.value}&limit=${limit.value}`);
		imageTypes.value = imageTypesResponse.data;
		isOpenDeleteConfirmDialog.value = !isOpenDeleteConfirmDialog.value;
	} catch (error: any) {
		const messages = error.response.data.message;

		if (Array.isArray(messages)) {
			for (let message of messages) {
				toastError(message);
			}
		} else {
			toastError(messages);
		}
	}
};

// HOOKS
onMounted(async () => {
	const response = await getData(`http://localhost:3000/api/image-types?page=${page.value}&limit=${limit.value}`);
	user.value = response.user;
	imageTypes.value = response.data;
});

watch(search, async (newValues) => {
	const newSearch = newValues == '' ? undefined : newValues[0];

	if (newSearch) {
		const response = await getData(`http://localhost:3000/api/image-types?name=${newSearch}
		&page=${page.value}&limit=${limit.value}`);
		user.value = response.user;
		imageTypes.value = response.data;
	} else {
		const response = await getData(`http://localhost:3000/api/image-types?
		page=${page.value}&limit=${limit.value}`);
		user.value = response.user;
		imageTypes.value = response.data;
	}

	page.value = 1;
	return;
});

watch(page, async (newPage) => {
	const response = await getData(`http://localhost:3000/api/image-types?page=${newPage}&limit=${limit.value}
	&name=${search.value}`);
	user.value = response.user;
	imageTypes.value = response.data;
});

</script>

<style scoped>
.container {
    max-height: 800px;
}

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
    font-size: 1.2rem;
    font-weight: 800;
}

.table tr td {
    font-size: 1.1rem;
}

.table tbody tr {
    color: var(--color-body-table);
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
    color: var(--color-body-table);
    background-color: transparent;
}

.table-actions button * {
    font-size: 1.1rem;
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

.buttons-container {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    gap: 0.5rem;
    margin-top: 1.2rem;
    padding-right: 1.3rem;
}

.buttons-container button {
    width: fit-content;
}

@media only screen and (max-width: 1024px) {
    .table th {
        font-size: 1.1rem;
    }

    .table tr td {
        font-size: 1rem;
    }

    .table-actions button * {
        font-size: 1rem;
    }
}

@media only screen and (max-width: 720px) {   
    .table th {
        font-size: 0.9rem;
    }

    .table tr td {
        font-size: 0.9rem;
    }

    .table-actions button * {
        font-size: 0.9rem;
    }
}
</style>