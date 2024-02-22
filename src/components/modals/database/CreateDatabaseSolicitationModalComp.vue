<template>
    <form @submit.prevent="onSubmit">
        <ModalComp :open="open" title="Solicitar banco de imagens" @close="close">
            <template #content>
                <div class="form-container">
                    <div class="input-field">
                        <label for="name">Nome *</label>
                        <InputComp placeholder="Informe o nome do banco" id="name" :isRequired="true" v-model="name"
                            name="name" />
                        <ul class="input-field-error" v-if="errors?.name">
                            <li v-for="error in errors?.name?._errors"> {{ error }}</li>
                        </ul>
                    </div>

                    <div class="input-field">
                        <label for="examType">Tipo de exame *</label>
                        <SelectInputComp :options="examTypes" id="examType" :isRequired="true" v-model="examType"
                            name="examType" />
                        <ul class="input-field-error" v-if="errors?.examType">
                            <li v-for="error in errors?.examType?._errors"> {{ error }}</li>
                        </ul>
                    </div>

                    <div class="input-field">
                        <label for="imageType">Tipo de imagem *</label>
                        <SelectInputComp :options="imageTypes" id="imageType" :isRequired="true" v-model="imageType"
                            name="imageType" />
                        <ul class="input-field-error" v-if="errors?.imageType">
                            <li v-for="error in errors?.imageType?._errors"> {{ error }}</li>
                        </ul>
                    </div>

                    <div class="input-field">
                        <label for="imageType">Qualidade das imagens *</label>
                        <InputComp placeholder="8, 12, 16" id="imageQuality" :isRequired="true" v-model="imageQuality"
                            name="imageQuality" />
                        <ul class="input-field-error" v-if="errors?.imageQuality">
                            <li v-for="error in errors?.imageQuality?._errors"> {{ error }}</li>
                        </ul>
                    </div>

                    <div class="input-field">
                        <label for="description">Descrição *</label>
                        <TextAreaCompVue id="description" :isRequired="true" v-model="description" name="description"
                        :max-length="maxLength" :cols="100" :rows="10" placeholder="Informe uma breve descrição do banco"/>
                        <ul class="input-field-error" v-if="errors?.description">
                            <li v-for="error in errors?.description?._errors"> {{ error }}</li>
                        </ul>
                    </div>

                    <div class="input-field">
                        <label for="url">Link do banco</label>
                        <InputComp placeholder="Informe a URL do banco de imagens" id="url" :isRequired="false" v-model="url"
                            name="url"/>
                        <ul class="input-field-error" v-if="errors?.url">
                            <li v-for="error in errors?.url?._errors"> {{ error }}</li>
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
import { ref, onMounted, computed } from 'vue';
import * as z from 'zod';
import SelectInputComp from '@/components/inputs/SelectInputComp.vue';
import { getData } from '@/helpers/api';
import { toastSuccess, toastError } from '@/helpers/toast-messages';

const name = ref("");
const description = ref("");
const examType: any = ref({});
const imageType: any = ref({});
const imageQuality = ref("");
const url = ref("");
const examTypes = ref([]);
const imageTypes = ref([]);
const maxLength = 2000;

const imageQualityArray = computed(() => {
    const numberStringArray = imageQuality.value.split(',');
    const numberArray = numberStringArray.map(number => parseInt(number.trim(), 10));
    return numberArray;
});

const formSchema = z.object({
    name: z.string().min(1, { message: 'O campo nome é requerido.' }),
    description: z.string().min(1, { message: 'O campo descrição é requerido.' })
    .max(maxLength, { message: `O campo descrição deve ter no máximo ${maxLength} caracteres.` }),
    examType: z.string().min(1, { message: 'O campo tipo de exame é requerido.' }),
    imageType: z.string().min(1, { message: 'O campo tipo de imagem é requerido.' }),
    imageQuality: z.string().min(1, { message: 'O campo qualidade de imagem é requerido.' })
    .regex(/^[0-9\s,]+$/, { message: 'O campo qualidade de imagem deve conter apenas números separados por vírgula.' }),
    url: z.string().optional(),
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
        examType: examType.value.value,
        imageType: imageType.value.value,
        imageQuality: imageQuality.value,
        url: url.value
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
        await axios.post('http://localhost:3000/api/solicitation', {
            type: 'newDatabase',
            data: {
                name: name.value,
                description: description.value,
                examType: examType.value._id,
                imageType: imageType.value._id,
                imageQuality: imageQualityArray.value,
                url: url.value
            }
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        toastSuccess('Solicitação de banco de imagens cadastrado com sucesso!');
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

onMounted(async () => {
    const examTypeResponse = await getData('http://localhost:3000/api/exam-types');
    const imageTypeResponse = await getData('http://localhost:3000/api/image-types');

    examTypes.value = examTypeResponse.data.map((examType: any) => {
        return { value : examType.name, _id: examType._id };
    })
    imageTypes.value = imageTypeResponse.data.map((imageType: any) => {
        return { value : imageType.name, _id: imageType._id };
    })

    examType.value = examTypes.value[0];
    imageType.value = imageTypes.value[0];
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