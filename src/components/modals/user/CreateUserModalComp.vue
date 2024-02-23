<template>
    <form @submit.prevent="onSubmit">
        <ModalComp :open="open" title="Cadastrar usuário" @close="close">
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
                        <label for="E-mail">E-mail *</label>
                        <InputComp placeholder="Informe seu e-mail" type="email" id="email" :isRequired="true"
                            v-model="email" name="email" />
                        <ul class="input-field-error" v-if="errors?.email">
                            <li v-for="error in errors?.email?._errors"> {{ error }}</li>
                        </ul>
                    </div>

                    <div class="input-field">
                        <label for="password">Senha *</label>
                        <InputComp placeholder="Informe sua senha" type="password" :isRequired="true" id="password"
                            v-model="password" name="password" />
                        <ul class="input-field-error" v-if="errors?.password">
                            <li v-for="error in errors?.password?._errors"> {{ error }}</li>
                        </ul>
                    </div>

                    <div class="input-field">
                        <label for="confirmPassword">Confirmar senha *</label>
                        <InputComp placeholder="Informe sua senha" type="password" :isRequired="true" id="confirmPassword"
                            v-model="confirmPassword" name="confirmPassword" />
                        <ul class="input-field-error" v-if="errors?.confirmPassword">
                            <li v-for="error in errors?.confirmPassword?._errors"> {{ error }}</li>
                        </ul>
                    </div>

                    <div class="input-field">
                        <label for="institution">Instituição *</label>
                        <InputComp placeholder="Informe sua instituição" id="institution" :isRequired="true"
                            v-model="institution" name="institution" />
                        <ul class="input-field-error" v-if="errors?.institution">
                            <li v-for="error in errors?.institution?._errors"> {{ error }}</li>
                        </ul>
                    </div>

                    <div class="input-field">
                        <label for="country">País *</label>
                        <InputComp placeholder="Informe seu país" id="country" :isRequired="true" v-model="country"
                            name="country" />
                        <ul class="input-field-error" v-if="errors?.country">
                            <li v-for="error in errors?.country?._errors"> {{ error }}</li>
                        </ul>
                    </div>

                    <div class="input-field">
                        <label for="city">Cidade</label>
                        <InputComp placeholder="Informe sua Cidade" id="city" v-model="city" name="city" />
                        <ul class="input-field-error" v-if="errors?.city">
                            <li v-for="error in errors?.city?._errors"> {{ error }}</li>
                        </ul>
                    </div>


                    <div class="input-field">
                        <label for="lattes">Currículo Lattes</label>
                        <InputComp placeholder="Informe o link do Lattes" id="lattes" v-model="lattes" name="lattes" />
                        <ul class="input-field-error" v-if="errors?.lattes">
                            <li v-for="error in errors?.lattes?._errors"> {{ error }}</li>
                        </ul>
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
import ModalComp from '../ModalComp.vue';
import axios from 'axios';
import InputComp from '../../inputs/InputComp.vue';
import ButtonComp from '../../buttons/ButtonComp.vue';
import { ref } from 'vue';
import * as z from 'zod';
import SelectInputComp from '../../../components/inputs/SelectInputComp.vue';
import { toastSuccess, toastError } from '../../../helpers/toast-messages';

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const institution = ref("");
const country = ref("");
const city = ref("");
const lattes = ref("");
const role = ref("");
const roles = ref([{ value: 'Pesquisador', id: 1 }, { value: 'Admninistrador', id: 2 }]);

const formSchema = z.object({
    name: z.string()
        .min(1, { message: 'O campo nome é requerido.' }),
    email: z.string()
        .email({ message: 'O e-mail informado é inválido.' })
        .min(1, { message: 'O campo e-mail é requerido.' }),
    password: z.string()
        .min(8, { message: 'A senha deve ter no mínimo 8 caracteres.' })
        .regex(/[a-z]/, { message: 'A senha deve ter pelo menos uma letra minúscula.' })
        .regex(/[A-Z]/, { message: 'A senha deve ter pelo menos uma letra maiúscula.' })
        .regex(/[0-9]/, { message: 'A senha deve ter pelo menos um número.' })
        .regex(/[^a-zA-Z0-9]/, { message: 'A senha deve ter pelo menos um caractere especial.' }),
    confirmPassword: z.string(),
    institution: z.string()
        .min(1, { message: 'O campo instituição é requerido.' }),
    country: z.string()
        .min(1, { message: 'O campo país é requerido.' }),
    city: z.string()
        .optional(),
    lattes: z.string()
        .optional(),
    role: z.object({
        value: z.string()
            .min(1, { message: 'O campo cargo é requerido.' }),
        id: z.number()
            .min(1, { message: 'O campo cargo é requerido.' })
    })
}).refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem.',
    path: ['confirmPassword'],
});

type formSchema = z.infer<typeof formSchema>;
const errors = ref<z.ZodFormattedError<formSchema> | null>(null);

defineProps({
    open: {
        type: Boolean,
        required: true
    }
});

async function onSubmit() {
    const valid = formSchema.safeParse({
        name: name.value,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
        institution: institution.value,
        country: country.value,
        city: city.value,
        lattes: lattes.value,
        role: role.value
    });
    if (!valid.success) {
        errors.value = valid.error.format();
    } else {
        errors.value = null;
        await register();
    }
}

async function register() {
    try {
        const processedRole = role.value === 'Administrador' ? 'admin' : 'user';

        await axios.post('http://localhost:3000/api/user', {
            name: name.value,
            email: email.value,
            password: password.value,
            institution: institution.value,
            country: country.value,
            city: city.value,
            lattes: lattes.value,
            role: processedRole
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        
        });
        toastSuccess('Usuário cadastrado com sucesso!');
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
}

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