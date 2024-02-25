<template>
    <form @submit.prevent="onSubmit">
        <ModalComp :open="open" title="Editar cargo" @close="close">
            <template #content>
                <div class="form-container">
                    <div class="input-field">
                        <label for="name">Nome</label>
                        <InputComp id="name" :isRequired="true" v-model="name"
                            name="name" :is-disabled="true"/>
                    </div>

                    <div class="input-field">
                        <label for="E-mail">E-mail</label>
                        <InputComp type="email" id="email" :isRequired="true"
                            v-model="email" name="email"  :is-disabled="true"/>
                    </div>

                    <div class="input-field">
                        <label for="institution">Instituição</label>
                        <InputComp id="institution" :isRequired="true"
                            v-model="institution" name="institution"  :is-disabled="true"/>
                    </div>

                    <div class="input-field">
                        <label for="country">País</label>
                        <InputComp id="country" :isRequired="true" v-model="country"
                            name="country"  :is-disabled="true"/>
                    </div>

                    <div class="input-field">
                        <label for="city">Cidade</label>
                        <InputComp id="city" v-model="city" name="city"  :is-disabled="true"/>
                    </div>


                    <div class="input-field">
                        <label for="lattes">Currículo Lattes</label>
                        <InputComp id="lattes" v-model="lattes" name="lattes"  :is-disabled="true"/>
                    </div>


                    <div class="input-field">
                        <label for="role">Cargo *</label>
                        <SelectInputComp :options="roles" id="role" :isRequired="true" v-model="role"
                            name="role" />
                        <ul class="input-field-error" v-if="errors?.role">
                            <li v-for="error in errors?.role?._errors"> {{ error }}</li>
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
import { getData, updateData } from '@/helpers/api';
import { toastSuccess } from '@/helpers/toast-messages';
import { onMounted, ref } from 'vue';
import * as z from 'zod';
import ButtonComp from '../../buttons/ButtonComp.vue';
import InputComp from '../../inputs/InputComp.vue';
import ModalComp from '../ModalComp.vue';
import SelectInputComp from '@/components/inputs/SelectInputComp.vue';

const name = ref("");
const email = ref("");
const institution = ref("");
const country = ref("");
const city = ref("");
const lattes = ref("");
const role = ref();
const roles = ref([{ value: 'Pesquisador', id: 1 }, { value: 'Administrador', id: 2 }]);

const formSchema = z.object({
    role: z.object({
        value: z.string()
            .min(1, { message: 'O campo cargo é requerido.' }),
        id: z.number()
            .min(1, { message: 'O campo cargo é requerido.' })
    })
});

type formSchema = z.infer<typeof formSchema>;
const errors = ref<z.ZodFormattedError<formSchema> | null>(null);

const props = defineProps({
    open: {
        type: Boolean,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
});

async function onSubmit() {
    const valid = formSchema.safeParse({
        role: role.value
    });
    if (!valid.success) {
        errors.value = valid.error.format();
    } else {
        errors.value = null;
        await updateRole();
    }
}

async function updateRole() {
    const processedRole = role.value.value === 'Administrador' ? 'admin' : 'user';
    const data = {
        role: processedRole
    };

    const response = await updateData(`http://localhost:3000/api/user/${props.userId}`, data)

    if (response) {
        toastSuccess('Cargo atualizado com sucesso!');
        close();
    } 
}

const emit = defineEmits(["close"]);

const close = () => {
    emit("close");
};

onMounted(async () => {
    const response = await getData(`http://localhost:3000/api/user/${props.userId}`);
    const user = response.data;
    name.value = user.name;
    email.value = user.email;
    institution.value = user.institution;
    country.value = user.country;
    city.value = user.city;
    lattes.value = user.lattes;
    role.value = user.role === "admin" ? { value: 'Administrador', id: 2 } : 
    { value: 'Pesquisador', id: 1 };
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