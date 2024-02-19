<template>
    <div class="container">
        <BoxComp class="box" title="Solicitar cadastro">

            <template #content>
                <form class="form" @submit.prevent="onSubmit">
                    <div class="input-field">
                        <label for="name">Name *</label>
                        <InputComp placeholder="Informe seu nome" id="name" :isRequired="true" v-model="name" name="name" />
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

                    <div class="button-field">
                        <ButtonComp btn-class="btn-secondary" text="Voltar" @click="goHome"></ButtonComp>
                        <ButtonComp btn-class="btn-primary" text="Cadastrar" btn-type="submit"></ButtonComp>
                    </div>
                </form>
            </template>
        </BoxComp>
    </div>
</template>

<script setup lang="ts">
import BoxComp from '@/components/BoxComp.vue';
import ButtonComp from '@/components/buttons/ButtonComp.vue';
import InputComp from '@/components/inputs/InputComp.vue';
import { toastError, toastSuccess } from '@/helpers/toast-messages';
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import * as z from 'zod';

// Variáveis
const router = useRouter(); // Para navegação
const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
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
        .regex(/[^a-zA-Z0-9]/, { message: 'A senha deve ter pelo menos um caractere especial.' }),
    confirmPassword: z.string(),
    institution: z.string()
        .min(1, { message: 'O campo instituição é requerido.' }),
    country: z.string()
        .min(1, { message: 'O campo país é requerido.' }),
    city: z.string()
        .optional(),
    lattes: z.string()
        .optional()
}).refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem.',
    path: ['confirmPassword'],
});


type formSchema = z.infer<typeof formSchema>;
const errors = ref<z.ZodFormattedError<formSchema> | null>(null);

async function onSubmit() {
    const valid = formSchema.safeParse({
        name: name.value,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
        institution: institution.value,
        country: country.value,
        city: city.value,
        lattes: lattes.value
    });
    if (!valid.success) {
        errors.value = valid.error.format();
    } else {
        errors.value = null;
        await register();
    }
}

function goHome() {
    router.push({ name: 'home' });
}

async function register() {
    try {
        await axios.post('http://localhost:3000/api/solicitation', {
            type: 'newUser',
            data: {
                name: name.value,
                email: email.value,
                password: password.value,
                institution: institution.value,
                country: country.value,
                city: city.value,
                lattes: lattes.value
            }
        });
        toastSuccess('Solicitação de cadastro enviada com sucesso!');
        router.push({ name: 'home' });
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

</script>


<style scoped>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.box {
    width: 60%;
    margin-top: 2.5rem;
}

.form {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: baseline;
    gap: 1.5rem;
}

.input-field {
    width: 48%;
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

@media screen and (max-width: 1024px) {
    .container-title {
        font-size: 1.3rem;
    }

    .input-field {
        font-size: 0.8rem;
    }

    .input-field-error {
        font-size: 0.7rem;
    }

    .button-field button {
        width: 4rem;
    }
}

@media screen and (max-width: 780px) {
    .input-container {
        flex-direction: column;
    }

    .input-field {
        width: 100%;
        gap: 0.2rem;
    }

    .button-field {
        justify-content: center;
    }

    .button-field button {
        width: 3.5rem;
    }
}
</style>


