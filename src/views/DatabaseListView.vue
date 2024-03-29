<template>
    <LoggedTemplateComp>
        <template #box-content>
            <BoxComp title="Bancos de imagens" class="container">
                <template #button>
                    <ButtonComp v-if="user.role === 'admin'" btn-class="btn-primary" text="Novo"
                        @click="isOpenCreateModal = !isOpenCreateModal">
                        <template #icon>
                            <font-awesome-icon icon="fa-solid fa-plus" />
                        </template>
                    </ButtonComp>
                    <ButtonComp v-else btn-class="btn-primary" text="Solicitar"
                        @click="isOpenCreateSolicitationModal = !isOpenCreateSolicitationModal">
                        <template #icon>
                            <font-awesome-icon icon="fa-solid fa-plus" />
                        </template>
                    </ButtonComp>
                </template>

                <template #inputs>
                    <InputComp type="text" placeholder="Buscar banco" v-model="search">
                        <template #icon>
                            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                        </template>
                    </InputComp>

                    <InputComp type="text" placeholder="Filtrar por tipo de exame" v-model="filter">
                        <template #icon>
                            <font-awesome-icon icon="fa-solid fa-filter" />
                        </template>
                    </InputComp>
                </template>

                <template #content>
                    <table class="table" border="0">
                        <thead>
                            <tr>
                                <th>Nome do banco</th>
                                <th>Tipo de exame</th>
                                <th>Tipo de imagem</th>
                                <th>Quantidade de imagens</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="database in databases" :key="database._id">
                                <td>{{ database.name }}</td>
                                <td>{{ database.examType.name }}</td>
                                <td>{{ database.imageType.name }}</td>
                                <td>{{ database.images.length }}</td>
                                <td class="table-actions">
                                    <button aria-label="Visualizar" @click="openViewModal(database._id)">
                                        <font-awesome-icon icon="fa-solid fa-eye" />
                                    </button>
                                    <button v-if="user.role === 'admin'" aria-label="Editar"
                                        @click="openEditModal(database._id)">
                                        <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                                    </button>
                                    <button v-if="user.role === 'admin'" aria-label="Excluir"
                                        @click="openDeleteConfirmDialog(database._id)">
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

                        <ButtonComp v-if="databases.length >= limit" btn-class="btn-primary" text="Próximo >"
                            @click="page = nextPage(page, databases.length)" />
                        <ButtonComp v-else btn-class="btn-primary" text="Próximo" :isDisabled="true" />
                    </div>
                </template>
            </BoxComp>
        </template>
    </LoggedTemplateComp>
    <CreateDatabaseModalComp :open="isOpenCreateModal" @close="closeCreateModal" />
    <CreateDatabaseSolicitationModalComp :open="isOpenCreateSolicitationModal" @close="closeCreateSolicitationModal" />
    <ViewDatabaseModalComp v-if="isOpenViewModal" :open="isOpenViewModal" @close="closeViewModal"
        :databaseId="databaseId" />
    <EditDatabaseModalComp v-if="isOpenEditModal" :open="isOpenEditModal" @close="closeEditModal"
        :databaseId="databaseId" />
    <ConfirmDialogComp v-if="isOpenDeleteConfirmDialog" :open="isOpenDeleteConfirmDialog" title="Confirmar"
        @close="closeDeleteConfirmDialog" :reject-function="closeDeleteConfirmDialog" :accept-function="deleteDatabase"
        message="Deseja realmente excluir esse banco?" accept-class="btn-danger">
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
import CreateDatabaseModalComp from '@/components/modals/database/CreateDatabaseModalComp.vue';
import CreateDatabaseSolicitationModalComp from '@/components/modals/database/CreateDatabaseSolicitationModalComp.vue';
import EditDatabaseModalComp from '@/components/modals/database/EditDatabaseModalComp.vue';
import ViewDatabaseModalComp from '@/components/modals/database/ViewDatabaseModalComp.vue';
import { getData } from '@/helpers/api';
import { nextPage, prevPage } from '@/helpers/pagination';
import { toastError } from '@/helpers/toast-messages';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircleExclamation, faEye, faFilter, faMagnifyingGlass, faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';

library.add(faPlus, faEye, faPenToSquare, faTrash, faMagnifyingGlass, faFilter, faCircleExclamation);

// Variáveis reativas
const databases: any = ref([]);
const user: any = ref({});
const isOpenViewModal = ref(false);
const isOpenCreateModal = ref(false);
const isOpenEditModal = ref(false);
const isOpenCreateSolicitationModal = ref(false);
const isOpenDeleteConfirmDialog = ref(false);
const search = ref('');
const filter = ref('');
const page = ref(1);
const limit = ref(10);
const databaseId = ref('');

// Funções
const closeCreateModal = async () => {
    isOpenCreateModal.value = !isOpenCreateModal.value;
    const response = await getData(`http://localhost:3000/api/databases?page=${page.value}&limit=${limit.value}`);
    databases.value = response.data;
};

const closeCreateSolicitationModal = () => {
    isOpenCreateSolicitationModal.value = !isOpenCreateSolicitationModal.value;
};

const openViewModal = (id: string) => {
    isOpenViewModal.value = !isOpenViewModal.value;
    databaseId.value = id;
};

const openEditModal = (id: string) => {
    isOpenEditModal.value = !isOpenEditModal.value;
    databaseId.value = id;
};

const closeViewModal = () => {
    isOpenViewModal.value = !isOpenViewModal.value;
    databaseId.value = '';
};

const closeEditModal = async () => {
    isOpenEditModal.value = !isOpenEditModal.value;
    databaseId.value = '';
    const response = await getData(`http://localhost:3000/api/databases?page=${page.value}&limit=${limit.value}`);
    databases.value = response.data;
};

const openDeleteConfirmDialog = (id: string) => {
    isOpenDeleteConfirmDialog.value = !isOpenDeleteConfirmDialog.value;
    databaseId.value = id;
};

const closeDeleteConfirmDialog = () => {
    isOpenDeleteConfirmDialog.value = !isOpenDeleteConfirmDialog.value;
    databaseId.value = '';
};

const deleteDatabase = async () => {
    try {
        const response = await axios.delete(`http://localhost:3000/api/database/${databaseId.value}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        const databasesResponse = await getData(`http://localhost:3000/api/databases?page=${page.value}&limit=${limit.value}`);
        databases.value = databasesResponse.data;
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
    const response = await getData(`http://localhost:3000/api/databases?page=${page.value}&limit=${limit.value}`);
    user.value = response.user;
    databases.value = response.data;
});

watch([search, filter], async (newValues) => {
    const newSearch = newValues[0] == '' ? undefined : newValues[0];
    const newFilter = newValues[1] == '' ? undefined : newValues[1];

    if (newSearch && newFilter) {
        const response = await getData(`http://localhost:3000/api/databases?name=${newSearch}
		&examType=${newFilter}&page=${page.value}&limit=${limit.value}`);
        user.value = response.user;
        databases.value = response.data;
    } else if (newFilter) {
        const response = await getData(`http://localhost:3000/api/databases?examType=${newFilter}&
		page=${page.value}&limit=${limit.value}`);
        user.value = response.user;
        databases.value = response.data;
        search.value = '';
    } else if (newSearch) {
        const response = await getData(`http://localhost:3000/api/databases?name=${newSearch}&
		page=${page.value}&limit=${limit.value}`);
        user.value = response.user;
        databases.value = response.data;
        filter.value = '';
    } else {
        const response = await getData(`http://localhost:3000/api/databases?
		page=${page.value}&limit=${limit.value}`);
        user.value = response.user;
        databases.value = response.data;
    }

    page.value = 1;
    return;
});

watch(page, async (newPage) => {
    const response = await getData(`http://localhost:3000/api/databases?page=${newPage}&limit=${limit.value}
	&name=${search.value}&examType=${filter.value}`);
    user.value = response.user;
    databases.value = response.data;
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