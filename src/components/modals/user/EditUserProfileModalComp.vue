<template>
    <form @submit.prevent="onSubmit">
        <ModalComp :open="open" title="Editar perfil" @close="close">
            <template #content>
                <div class="form-container">
                    <div class="input-field">
                        <label for="name">Nome</label>
                        <InputComp id="name" v-model="name"
                            name="name"/>
                    </div>

                    <div class="input-field">
                        <label for="E-mail">E-mail</label>
                        <InputComp type="email" id="email"
                            v-model="email" name="email" />
                    </div>

                    <div class="input-field">
                        <label for="password">Senha *</label>
                        <InputComp placeholder="Informe sua senha" type="password" id="password"
                            v-model="password" name="password" />
                        <ul class="input-field-error" v-if="errors?.password">
                            <li v-for="error in errors?.password?._errors"> {{ error }}</li>
                        </ul>
                    </div>

                    <div class="input-field">
                        <label for="confirmPassword">Confirmar senha *</label>
                        <InputComp placeholder="Informe sua senha" type="password" id="confirmPassword"
                            v-model="confirmPassword" name="confirmPassword" />
                        <ul class="input-field-error" v-if="errors?.confirmPassword">
                            <li v-for="error in errors?.confirmPassword?._errors"> {{ error }}</li>
                        </ul>
                    </div>

                    <div class="input-field">
                        <label for="institution">Instituição</label>
                        <InputComp id="institution"
                            v-model="institution" name="institution" />
                    </div>

                    <div class="input-field">
                        <label for="country">País</label>
                        <InputComp id="country" v-model="country"
                            name="country" />
                    </div>

                    <div class="input-field">
                        <label for="city">Cidade</label>
                        <InputComp id="city" v-model="city" name="city" />
                    </div>


                    <div class="input-field">
                        <label for="lattes">Currículo Lattes</label>
                        <InputComp id="lattes" v-model="lattes" name="lattes" />
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
import { toastError, toastSuccess } from '@/helpers/toast-messages';
import { onMounted, ref } from 'vue';
import * as z from 'zod';
import ButtonComp from '../../buttons/ButtonComp.vue';
import InputComp from '../../inputs/InputComp.vue';
import ModalComp from '../ModalComp.vue';

const name = ref("");
const email = ref("");
const password = ref();
const confirmPassword = ref();
const institution = ref("");
const country = ref("");
const city = ref("");
const lattes = ref("");

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
        .regex(/[^a-zA-Z0-9]/, { message: 'A senha deve ter pelo menos um caractere especial.' })
        .nullable()
        .optional(),
    confirmPassword: z.string().nullable().optional(),
    institution: z.string()
        .min(1, { message: 'O campo instituição é requerido.' }),
    country: z.string()
        .min(1, { message: 'O campo país é requerido.' }),
    city: z.string()
        .optional(),
    lattes: z.string()
        .optional(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem.',
    path: ['confirmPassword'],
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
        name: name.value,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
        institution: institution.value,
        country: country.value,
        city: city.value,
        lattes: lattes.value,
    });
    if (!valid.success) {
        errors.value = valid.error.format();
    } else {
        errors.value = null;
        await update();
    }
}

async function update() {
    if (!password.value) {
        password.value = undefined;
    }

    const data = {
        name: name.value,
        email: email.value,
        password: password.value,
        institution: institution.value,
        country: country.value,
        city: city.value,
        lattes: lattes.value,
    };

    const response = await updateData(`http://localhost:3000/api/user/${props.userId}`, data);

    if (response) {
        toastSuccess('Perfil atualizado com sucesso.');
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