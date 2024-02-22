<template>
    <ModalComp :open="open" title="Tipo de imagem" @close="close">
        <template #content>
            <div class="form-container">
                <div class="input-field">
                    <label for="name">Nome *</label>
                    <InputComp placeholder="Informe o nome do tipo de imagem" id="name" :isRequired="true" v-model="name"
                        :isDisabled="true" name="name" />
                </div>

                <div class="input-field">
                    <label for="description">Descrição *</label>
                    <TextAreaCompVue id="description" :isRequired="true" v-model="description" name="description"
                        :max-lengt="maxLength" :cols="100" :rows="10"
                        placeholder="Informe uma breve descrição do tipo de imagem" :isDisabled="true" />
                </div>

                <div class="input-field">
                    <label for="url">Dados requeridos</label>
                    <TextAreaCompVue id="requiredData" :isRequired="true" v-model="requiredData" name="requiredData"
                        :max-length="metadataLength" :cols="100" :rows="5"
                        placeholder="Informe os metadados requeridos separados por virgula"
                        :is-disabled="true" />
                </div>

                <div class="input-field">
                    <label for="url">Dados opcionais</label>
                    <TextAreaCompVue id="optionalData" :isRequired="true" v-model="optionalData" name="optionalData"
                        :max-length="metadataLength" :cols="100" :rows="5"
                        placeholder="Informe os metadados requeridos separados por virgula"
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

const name = ref("");
const description = ref("");
const requiredData = ref("");
const optionalData = ref("");
const maxLength = 1000;
const metadataLength = 1000000000000000;

const props = defineProps({
    open: {
        type: Boolean,
        required: true
    },
    imageTypeId: {
        type: String,
        required: true
    }
});

onMounted(async () => {
    const response = await getData(`http://localhost:3000/api/image-type/${props.imageTypeId}`);
    console.log(response);
    name.value = response.data.name;
    description.value = response.data.description;
    requiredData.value = response.data.requiredData;
    optionalData.value = response.data.optionalData;
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

.input-field {
    width: 100%;
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
    width: 5rem;
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