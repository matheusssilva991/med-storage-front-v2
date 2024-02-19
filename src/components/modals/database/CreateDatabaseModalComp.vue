<template>
    <form @submit.prevent="onSubmit">
        <ModalComp :open="open" title="Cadastrar banco de imagens" @close="close">
            <template #content>
                <div class="form-container">
                    <div class="input-field">
                        <label for="name">Name *</label>
                        <InputComp placeholder="Informe o nome do banco" id="name" :isRequired="true" v-model="name" name="name"
                            :value="name" />
                        <ul class="input-field-error" v-if="errors?.name">
                            <li v-for="error in errors?.name?._errors"> {{ error }}</li>
                        </ul>
                    </div>
                    
                    <div class="input-field">
                        <label for="examType">Tipo de exame *</label>
                        <SelectInputComp :options="examTypes" id="examType" :isRequired="true" v-model="examType"
                            name="examType" :value="examType" />
                        <ul class="input-field-error" v-if="errors?.examType">
                            <li v-for="error in errors?.examType?._errors"> {{ error }}</li>
                        </ul>
                    </div>
    
                    <div class="input-field">
                        <label for="imageType">Tipo de imagem *</label>
                        <SelectInputComp :options="imageTypes" id="imageType" :isRequired="true" v-model="imageType"
                            name="imageType" :value="imageType" />
                        <ul class="input-field-error" v-if="errors?.imageType">
                            <li v-for="error in errors?.imageType?._errors"> {{ error }}</li>
                        </ul>
                    </div>

                    <div class="input-field">
                        <label for="imageType">Qualidade das imagens *</label>
                        <InputComp placeholder="8, 12, 16" id="imageQuality" :isRequired="true" v-model="imageQuality"
                            name="imageQuality" :value="imageQuality" />
                        <ul class="input-field-error" v-if="errors?.imageQuality">
                            <li v-for="error in errors?.imageQuality?._errors"> {{ error }}</li>
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
import { ref, onMounted, watch } from 'vue';
import * as z from 'zod';
import SelectInputComp from '@/components/inputs/SelectInputComp.vue';
import { getData } from '@/helpers/api';

const name = ref("");
const description = ref("");
const examType = ref("");
const imageType = ref("");
const imageQuality = ref("");
const examTypes = ref([]);
const imageTypes = ref([]);

onMounted(async () => {
    const examTypeResponse = await getData('http://localhost:3000/api/exam-types');
    const imageTypeResponse = await getData('http://localhost:3000/api/image-types');

    examTypes.value = examTypeResponse.data.map((examType: any) => {
        return examType.name;
    })
    imageTypes.value = imageTypeResponse.data.map((imageType: any) => {
        return imageType.name;
    })

    examType.value = examTypes.value[0];
    imageType.value = imageTypes.value[0];
});

const formSchema = z.object({
    name: z.string().min(1, { message: 'O campo nome é requerido.' }),
    description: z.string().min(1, { message: 'O campo descrição é requerido.' }),
    examType: z.string().min(1, { message: 'O campo tipo de exame é requerido.' }),
    imageType: z.string().min(1, { message: 'O campo tipo de imagem é requerido.' }),
    imageQuality: z.string().min(1, { message: 'O campo qualidade de imagem é requerido.' })
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
    try {
        await axios.post('/databases', {

        });
    } catch (error) {
        console.error(error);
    }
};

const emit = defineEmits(["close"]);

const close = () => {
    emit("close");
};

watch(examType, (newValue) => {
    console.log(newValue);
});

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
    width: 5rem;
}
</style>