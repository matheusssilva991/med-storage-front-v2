<template>
        <ModalComp :open="open" title="Usuário" @close="close">
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
                        <label for="role">Cargo</label>
                        <InputComp id="role" v-model="role" name="role"  :is-disabled="true"/>
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
import { ref, onMounted } from 'vue';
import { getData } from '@/helpers/api';

const name = ref("");
const email = ref("");
const institution = ref("");
const country = ref("");
const city = ref("");
const lattes = ref("");
const role = ref("");

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
    role.value = user.role === "admin" ? "Administrador" : "Pesquisador";
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