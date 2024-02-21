<template>
    <LoggedTemplateComp>
        <template #box-content>
            <BoxComp title="Solicitações" class="container">
                <template #inputs>
                    <InputComp type="text" placeholder="Buscar por nome" v-model="search">
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
                                <th>Status</th>
                                <th>Tipo de solicitação</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="solicitation in processedSolicitations" :key="solicitation._id">
                                <td>{{ solicitation.data.name }}</td>
                                <td>{{ solicitation.status }}</td>
                                <td>{{ solicitation.type }}</td>
                                <td class="table-actions">
                                    <button aria-label="Visualizar" @click="openViewModal(solicitation._id)">
                                        <font-awesome-icon icon="fa-solid fa-eye" />
                                    </button>
                                    <button  v-if="solicitation.status === 'Pendente' " aria-label="Excluir">
                                        <font-awesome-icon icon="fa-solid fa-check" />
                                    </button>
                                    <button v-if="solicitation.status === 'Pendente' " aria-label="Excluir">
                                        <font-awesome-icon icon="fa-solid fa-xmark" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="buttons-container">
                        <ButtonComp btn-class="btn-primary" text="< Anterior" @click="page = prevPage(page)"
                            v-if="page > 1" />
                        <ButtonComp btn-class="btn-primary" text="Anterior" v-else :isDisabled="true" />

                        <ButtonComp v-if="solicitations.length >= limit" btn-class="btn-primary" text="Próximo >"
                            @click="page = nextPage(page, solicitations.length)" />
                        <ButtonComp v-else btn-class="btn-primary" text="Próximo" :isDisabled="true" />
                    </div>
                </template>
            </BoxComp>
        </template>
    </LoggedTemplateComp>
    <ViewDatabaseModalComp v-if="isOpenViewModal" :open="isOpenViewModal" @close="closeViewModal"
        :databaseId="solicitationId" />
</template>

<script setup lang="ts">
import BoxComp from '@/components/BoxComp.vue';
import LoggedTemplateComp from '@/components/LoggedTemplateComp.vue';
import ButtonComp from '@/components/buttons/ButtonComp.vue';
import InputComp from '@/components/inputs/InputComp.vue';
import SelectInputComp from '@/components/inputs/SelectInputComp.vue';
import ViewDatabaseModalComp from '@/components/modals/database/ViewDatabaseModalComp.vue';
import { getData } from '@/helpers/api';
import { nextPage, prevPage } from '@/helpers/pagination';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faFilter, faMagnifyingGlass, faPenToSquare, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { onMounted, ref, watch, computed } from 'vue';

library.add(faEye, faPenToSquare, faMagnifyingGlass, faFilter, faCheck, faXmark);

// Variáveis reativas
const solicitations: any = ref([]);
const user: any = ref({});
const isOpenViewModal = ref(false);
const search = ref('');
const filter = ref();
const page = ref(1);
const limit = ref(10);
const solicitationId = ref('');
const optionTypes = ref([
    { value: 'Todos os status', _id: '0' },
    { value: 'Pendente', _id: '1' },
    { value: 'Aprovada', _id: '2' },
    { value: 'Rejeitada', _id: '3' }]);

// Funções
const openViewModal = (id: string) => {
    isOpenViewModal.value = !isOpenViewModal.value;
    solicitationId.value = id;
};

const closeViewModal = () => {
    isOpenViewModal.value = !isOpenViewModal.value;
    solicitationId.value = '';
};

// HOOKS
onMounted(async () => {
    const response = await getData(`http://localhost:3000/api/solicitations?page=${page.value}&limit=${limit.value}`);
    user.value = response.user;
    solicitations.value = response.data;
    filter.value = { value: 'Todos os status', _id: '0' };
});

watch([search, filter], async (newValues) => {
    const newSearch = newValues[0] == '' ? undefined : newValues[0];
    let newFilter = newValues[1] == '' ? undefined : newValues[1];

    if (newFilter.value === 'Todos os status') {
        newFilter = undefined;
    } else if (newFilter.value === 'Pendente') {
        newFilter = 'pending';
    } else if (newFilter.value === 'Aprovada') {
        newFilter = 'accepted';
    } else if (newFilter.value === 'Rejeitada') {
        newFilter = 'rejected';
    }

    if (newSearch && newFilter) {
        const response = await getData(`http://localhost:3000/api/solicitations?name=${newSearch}
		&status=${newFilter}&page=${page.value}&limit=${limit.value}`);
        user.value = response.user;
        solicitations.value = response.data;
    } else if (newFilter) {
        const response = await getData(`http://localhost:3000/api/solicitations?status=${newFilter}&
		page=${page.value}&limit=${limit.value}`);
        user.value = response.user;
        solicitations.value = response.data;
        search.value = '';
    } else if (newSearch) {
        const response = await getData(`http://localhost:3000/api/solicitations?name=${newSearch}&
		page=${page.value}&limit=${limit.value}`);
        user.value = response.user;
        solicitations.value = response.data;
        filter.value = filter.value || '';
    } else {
        const response = await getData(`http://localhost:3000/api/solicitations?
		page=${page.value}&limit=${limit.value}`);
        user.value = response.user;
        solicitations.value = response.data;
    }

    page.value = 1;
    return;
});

watch(page, async (newPage) => {
    const response = await getData(`http://localhost:3000/api/solicitations?page=${newPage}&limit=${limit.value}
	&name=${search.value}&status=${filter.value}`);
    user.value = response.user;
    solicitations.value = response.data;
});

const processedSolicitations = computed(() => {
    return solicitations.value.map((solicitation: any) => {
        if (solicitation.type === 'newUser') {
            solicitation.type = 'Novo usuário';
        } else if (solicitation.type === 'newDatabase') {
            solicitation.type = 'Novo banco de imagem';
        }

        if (solicitation.status === 'pending') {
            solicitation.status = 'Pendente';
        } else if (solicitation.status === 'accepted') {
            solicitation.status = 'Aprovada';
        } else if (solicitation.status === 'rejected') {
            solicitation.status = 'Rejeitada';
        }
        return solicitation;
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