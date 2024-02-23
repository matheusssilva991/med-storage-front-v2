<template>
    <LoggedTemplateComp>
        <template #box-content>
            <BoxComp title="Usuários" class="container">
                <template #button>
                    <ButtonComp v-if="user.role === 'admin'" btn-class="btn-primary" text="Novo"
                        @click="isOpenCreateModal = !isOpenCreateModal">
                        <template #icon>
                            <font-awesome-icon icon="fa-solid fa-plus" />
                        </template>
                    </ButtonComp>
                </template>

                <template #inputs>
                    <InputComp type="text" placeholder="Buscar usuário" v-model="search">
                        <template #icon>
                            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                        </template>
                    </InputComp>

                    <SelectInputComp type="text" v-model="filter" :options="optionTypes">
                        <template #icon>
                            <font-awesome-icon icon="fa-solid fa-filter" />
                        </template>
                    </SelectInputComp>
                </template>

                <template #content>
                    <table class="table" border="0">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Instituição</th>
                                <th>Cargo</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in processedUsers" :key="user._id">
                                <td>{{ user.name }}</td>
                                <td>{{ user.institution }}</td>
                                <td>{{ user.role }}</td>
                                <td class="table-actions">
                                    <button aria-label="Visualizar" @click="openViewModal(user._id)">
                                        <font-awesome-icon icon="fa-solid fa-eye" />
                                    </button>
                                    <button aria-label="Editar" @click="openEditModal(user._id)">
                                        <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                                    </button>
                                    <button aria-label="Excluir" @click="openDeleteConfirmDialog(user._id)">
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

                        <ButtonComp v-if="users.length >= limit" btn-class="btn-primary" text="Próximo >"
                            @click="page = nextPage(page, users.length)" />
                        <ButtonComp v-else btn-class="btn-primary" text="Próximo" :isDisabled="true" />
                    </div>
                </template>
            </BoxComp>
        </template>
    </LoggedTemplateComp>
    <CreateUserModalComp :open="isOpenCreateModal" @close="closeCreateModal" />
    <ViewUserModalComp v-if="isOpenViewModal" :open="isOpenViewModal" @close="closeViewModal" :userId="userId" />
    <EditDatabaseModalComp v-if="isOpenEditModal" :open="isOpenEditModal" @close="closeEditModal" :databaseId="userId" />
    <ConfirmDialogComp v-if="isOpenDeleteConfirmDialog" :open="isOpenDeleteConfirmDialog" title="Confirmar"
        @close="closeDeleteConfirmDialog" :reject-function="closeDeleteConfirmDialog" :accept-function="deleteUser"
        message="Deseja realmente excluir esse usuário?" accept-class="btn-danger">
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
import SelectInputComp from '@/components/inputs/SelectInputComp.vue';
import EditDatabaseModalComp from '@/components/modals/database/EditDatabaseModalComp.vue';
import CreateUserModalComp from '@/components/modals/user/CreateUserModalComp.vue';
import ViewUserModalComp from '@/components/modals/user/ViewUserModalComp.vue';
import { getData } from '@/helpers/api';
import { nextPage, prevPage } from '@/helpers/pagination';
import { toastError } from '@/helpers/toast-messages';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircleExclamation, faEye, faFilter, faMagnifyingGlass, faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { computed, onMounted, ref, watch } from 'vue';

library.add(faPlus, faEye, faPenToSquare, faTrash, faMagnifyingGlass, faFilter, faCircleExclamation);

// Variáveis reativas
const users: any = ref([]);
const user: any = ref({});
const isOpenViewModal = ref(false);
const isOpenCreateModal = ref(false);
const isOpenEditModal = ref(false);
const isOpenDeleteConfirmDialog = ref(false);
const search = ref('');
const filter = ref();
const page = ref(1);
const limit = ref(10);
const userId = ref('');
const optionTypes = ref([
    { value: 'Todos os cargos', _id: '0' },
    { value: 'Pesquisador', _id: '1' },
    { value: 'Administrador', _id: '2' }]);

// Funções
const closeCreateModal = async () => {
    isOpenCreateModal.value = !isOpenCreateModal.value;
    const response = await getData(`http://localhost:3000/api/users?page=${page.value}&limit=${limit.value}`);
    users.value = response.data;
};

const openViewModal = (id: string) => {
    isOpenViewModal.value = !isOpenViewModal.value;
    userId.value = id;
};

const openEditModal = (id: string) => {
    isOpenEditModal.value = !isOpenEditModal.value;
    userId.value = id;
};

const closeViewModal = () => {
    isOpenViewModal.value = !isOpenViewModal.value;
    userId.value = '';
};

const closeEditModal = async () => {
    isOpenEditModal.value = !isOpenEditModal.value;
    userId.value = '';
    const response = await getData(`http://localhost:3000/api/users?page=${page.value}&limit=${limit.value}`);
    users.value = response.data;
};

const openDeleteConfirmDialog = (id: string) => {
    isOpenDeleteConfirmDialog.value = !isOpenDeleteConfirmDialog.value;
    userId.value = id;
};

const closeDeleteConfirmDialog = () => {
    isOpenDeleteConfirmDialog.value = !isOpenDeleteConfirmDialog.value;
    userId.value = '';
};

const deleteUser = async () => {
    try {
        const response = await axios.delete(`http://localhost:3000/api/user/${userId.value}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        const usersResponse = await getData(`http://localhost:3000/api/users?page=${page.value}&limit=${limit.value}`);
        users.value = usersResponse.data;
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
    const response = await getData(`http://localhost:3000/api/users?page=${page.value}&limit=${limit.value}`);
    user.value = response.user;
    users.value = response.data;
    filter.value = { value: 'Todos os cargos', _id: '0' };
});

watch([search, filter], async (newValues) => {
    const newSearch = newValues[0] == '' ? undefined : newValues[0];
    let newFilter = newValues[1] == '' ? undefined : newValues[1];

    if (newFilter.value === 'Todos os cargos') {
        newFilter = undefined;
    } else if (newFilter.value === 'Pesquisador') {
        newFilter = 'user';
    } else if (newFilter.value === 'Administrador') {
        newFilter = 'admin';
    }

    if (newSearch && newFilter) {
        const response = await getData(`http://localhost:3000/api/users?name=${newSearch}
		&role=${newFilter}&page=${page.value}&limit=${limit.value}`);
        user.value = response.user;
        users.value = response.data;
    } else if (newFilter) {
        const response = await getData(`http://localhost:3000/api/users?role=${newFilter}&
		page=${page.value}&limit=${limit.value}`);
        user.value = response.user;
        users.value = response.data;
        search.value = '';
    } else if (newSearch) {
        const response = await getData(`http://localhost:3000/api/users?name=${newSearch}&
		page=${page.value}&limit=${limit.value}`);
        user.value = response.user;
        users.value = response.data;
        filter.value = '';
    } else {
        const response = await getData(`http://localhost:3000/api/users?
		page=${page.value}&limit=${limit.value}`);
        user.value = response.user;
        users.value = response.data;
    }

    page.value = 1;
    return;
});

watch(page, async (newPage) => {
    const newFilter = filter.value === 'Administrador' ? 'admin' : 'user';
    const response = await getData(`http://localhost:3000/api/users?page=${newPage}&limit=${limit.value}
	&name=${search.value}&role=${newFilter}`);
    user.value = response.user;
    users.value = response.data;
});

const processedUsers = computed(() => {
    return users.value.map((user: any) => {
        return {
            ...user,
            role: user.role === 'admin' ? 'Administrador' : 'Pesquisador'
        };
    });
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
    font-size: 1rem;
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