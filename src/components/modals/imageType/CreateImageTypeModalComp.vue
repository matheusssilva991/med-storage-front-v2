<template>
    <form @submit.prevent="onSubmit">
        <ModalComp :open="open" title="Cadastrar tipo de imagem" @close="close">
            <template #content>
                <div class="form-container">
                    <div class="input-field">
                        <label for="name">Nome *</label>
                        <InputComp placeholder="Informe o nome do tipo de imagem" id="name" :isRequired="true" v-model="name"
                            name="name" />
                        <ul class="input-field-error" v-if="errors?.name">
                            <li v-for="error in errors?.name?._errors"> {{ error }}</li>
                        </ul>
                    </div>

                    <div class="input-field">
                        <label for="description">Descrição *</label>
                        <TextAreaCompVue id="description" :isRequired="true" v-model="description" name="description"
                        :max-length="maxLength" :cols="100" :rows="7" placeholder="Informe uma breve descrição do tipo de imagem"/>
                        <ul class="input-field-error" v-if="errors?.description">
                            <li v-for="error in errors?.description?._errors"> {{ error }}</li>
                        </ul>
                    </div>

                    <div class="input-field">
                        <label for="url">Dados requeridos *</label>
                        <TextAreaCompVue id="requiredData" :isRequired="true" v-model="requiredData" name="requiredData"
                        :max-length="metadataLength" :cols="100" :rows="5" placeholder="Informe os metadados requeridos separados por virgula"/>
                        <ul class="input-field-error" v-if="errors?.requiredData">
                            <li v-for="error in errors?.requiredData?._errors"> {{ error }}</li>
                        </ul>
                    </div>

                    <div class="input-field">
                        <label for="url">Dados opcionais</label>
                        <TextAreaCompVue id="optionalData" :isRequired="false" v-model="optionalData" name="optionalData"
                        :max-length="metadataLength" :cols="100" :rows="7" placeholder="Informe os metadados opcionais separados por virgula"/>
                        <ul class="input-field-error" v-if="errors?.optionalData">
                            <li v-for="error in errors?.optionalData?._errors"> {{ error }}</li>
                        </ul>
                    </div>
                </div>
            </template>

            <template #footer>
                <div class="button-field">
                    <ButtonComp btn-class="btn-secondary" text="Cancelar" @click="close" />
                    <ButtonComp btn-class="btn-primary" text="Salvar" type="submit" />
                </div>
            </template>
        </ModalComp>
    </form>
</template>

<script setup lang="ts">
import ModalComp from '../ModalComp.vue';
import axios from 'axios';
import InputComp from '../../inputs/InputComp.vue';
import ButtonComp from '../../buttons/ButtonComp.vue';
import TextAreaCompVue from '../../inputs/TextAreaComp.vue';
import { ref } from 'vue';
import * as z from 'zod';
import { toastSuccess, toastError } from '../../../helpers/toast-messages';

const name = ref("");
const description = ref("");
const requiredData = ref("");
const optionalData = ref("");
const maxLength = 2000;
const metadataLength = 1000000000000000;

const formSchema = z.object({
    name: z.string().min(1, { message: 'O campo nome é requerido.' }),
    description: z.string().min(1, { message: 'O campo descrição é requerido.' })
    .max(maxLength, { message: `O campo descrição deve ter no máximo ${maxLength} caracteres.` }),
    requiredData: z.string().min(1, { message: 'O campo dados requeridos é requerido.' }).regex(/^([\w\d-]+\s*,\s*)*[\w\d-]+$/,
    { message: 'O campo deve conter apenas metadados separados por vírgula.' }),
    optionalData: z.string().regex(/^([\w\d-]+\s*,\s*)*[\w\d-]*$/,
    { message: 'O campo deve conter apenas metadados separados por vírgula.' })
    .nullable()
});

type formSchema = z.infer<typeof formSchema>;
const errors = ref<z.ZodFormattedError<formSchema> | null>(null);

defineProps({
    open: {
        type: Boolean,
        required: true
    }
});

const onSubmit = async () => {
    const valid = formSchema.safeParse({
        name: name.value,
        description: description.value,
        requiredData: requiredData.value,
        optionalData: optionalData.value
    });
    if (!valid.success) {
        errors.value = valid.error.format();
    } else {
        errors.value = null;
        await register();
    }
};

const register = async () => {
    try {
        const requiredDataArray = requiredData.value.split(',');
        const optionalDataArray = optionalData.value.split(',');

        await axios.post('http://localhost:3000/api/image-type', {
            name: name.value,
            description: description.value,
            requiredData: requiredDataArray,
            optionalData: optionalDataArray
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        toastSuccess('Tipo de imagem cadastrado com sucesso!');
        description.value = '';
        name.value = '';
        requiredData.value = '';
        optionalData.value = '';
        close();

    } catch (error: any) {
        const messages = error?.response?.data?.message;

        if (typeof messages === 'object') {
            messages.forEach((message: string) => {
                toastError(message);
            });
        } else {
            toastError(messages);
        }
    }
};

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