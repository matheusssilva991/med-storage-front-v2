<template>
    <ModalComp :open="open" title="Banco de imagens" @close="close">
        <template #content>
            <div class="form-container">
                <div class="input-field">
                    <label for="name">Nome *</label>
                    <InputComp id="name" :isRequired="true" :is-disabled="true" v-model="database.name" name="name"/>
                </div>

                <div class="input-field">
                    <label for="examType">Tipo de exame*</label>
                    <InputComp id="examType" :isRequired="true" :is-disabled="true" v-model="database.examType.name"
                        name="examType"/>
                </div>

                <div class="input-field">
                    <label for="imageType">Tipo de imagem *</label>
                    <InputComp id="imageType" :isRequired="true" v-model="database.imageType.name" :is-disabled="true"
                        name="imageType" />
                </div>

                <div class="input-field">
                    <label for="imageType">Qualidade das imagens *</label>
                    <InputComp id="imageQuality" :isRequired="true" v-model="database.imageQuality"
                        name="imageQuality" :is-disabled="true" />
                </div>

                <div class="input-field">
                    <label for="description">Descrição *</label>
                    <TextAreaCompVue id="description" :isRequired="true" v-model="database.description" name="description"
                        :max-length="maxLength" :cols="100" :rows="10" :is-disabled="true"/>
                </div>

                <div class="input-field">
                    <label for="url">Link do banco</label>
                    <InputComp id="url" :isRequired="false" v-model="database.url" name="url"
                        :is-disabled="true" />
                </div>
            </div>
        </template>

        <template #footer>
            <div class="button-field">
                <ButtonComp btn-class="btn-secondary" text="Fechar" @click="close" />
            </div>
        </template>
    </ModalComp>
</template>

<script setup lang="ts">
import ModalComp from '../ModalComp.vue';
import InputComp from '../../inputs/InputComp.vue';
import ButtonComp from '../../buttons/ButtonComp.vue';
import TextAreaCompVue from '../../inputs/TextAreaComp.vue';
import { ref, onMounted } from 'vue';
import { getData } from '@/helpers/api';

const database: any = ref({
    name: '',
    examType: '',
    imageType: '',
    description: '',
    imageQuality: '',
    url: ''
});
const maxLength = 2000;

const props = defineProps({
    open: {
        type: Boolean,
        required: true
    },
    databaseId: {
        type: String,
        required: true
    }
});

onMounted(async () => {
    if (!props.open) return;
    const response = await getData(`http://localhost:3000/api/database/${props.databaseId}`);
    database.value = response.data;
});

const emit = defineEmits(["close"]);

const close = () => {
    emit("close");
};

</script>

<style scoped>
.form-container {
    width: 500px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: baseline;
    gap: 1.5rem;
}

.form-container div:nth-child(5) {
    width: 100%;
}

.form-container div:nth-child(6) {
    width: 100%;
}

.input-field {
    width: 47%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0.3rem;
}

.input-field-error {
    font-size: 0.8rem;
    color: var(--color-text-input);
    margin: 0;
    padding-left: 1.2rem;
    padding-top: 0.2rem;
}

.button-field {
    margin-top: 1rem;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
}

.button-field button {
    width: fit-content;
}

@media only screen and (max-width: 1024px) {
    .form-container {
        width: 400px;
    }
}

@media only screen and (max-width: 768px) {
    .form-container {
        width: 300px;
    }

    .input-field {
        width: 100%;
    }
}
</style>