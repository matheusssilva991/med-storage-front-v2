<template>
    <ModalComp :open="open" title="Solicitação de usuário" @close="close">
        <template #content>
            <div class="form-container">
                <div class="input-field">
                    <label for="name">Nome</label>
                    <InputComp id="name" :isRequired="true" :is-disabled="true" v-model="user.name" name="name"/>
                </div>

                <div class="input-field">
                    <label for="email">Email</label>
                    <InputComp id="email" :isRequired="true" :is-disabled="true" v-model="user.email"
                        name="email"/>
                </div>

                <div class="input-field">
                    <label for="institution">Instituição</label>
                    <InputComp id="institution" :isRequired="true" :is-disabled="true" v-model="user.institution"
                        name="institution"/>
                </div>

                <div class="input-field">
                    <label for="country">País</label>
                    <InputComp id="country" :isRequired="true" :is-disabled="true" v-model="user.country"
                        name="country"/>
                </div>

                <div class="input-field">
                    <label for="city">Cidade</label>
                    <InputComp id="city" :isRequired="true" :is-disabled="true" v-model="user.city"
                        name="city"/>
                </div>

                <div class="input-field">
                    <label for="lattes">Lattes</label>
                    <InputComp id="lattes" :isRequired="true" :is-disabled="true" v-model="user.lattes"
                        name="lattes"/>
                </div>
            </div>
        </template>

        <template #footer>
            <div class="button-field">
                <ButtonComp btn-class="btn-secondary" text="Voltar" @click="close" />
            </div>
        </template>
    </ModalComp>
</template>

<script setup lang="ts">
import ModalComp from '../ModalComp.vue';
import InputComp from '../../inputs/InputComp.vue';
import ButtonComp from '../../buttons/ButtonComp.vue';
import { ref, onMounted } from 'vue';
import { getData } from '../../../helpers/api';

const user = ref({
    name: '',
    email: '',
    institution: '',
    city: '',
    country: '',
    lattes: ''
});

const props = defineProps({
    open: {
        type: Boolean,
        required: true
    },
    solicitationId: {
        type: String,
        required: true
    }
});

onMounted(async () => {
    if (!props.open) return;
    const response = await getData(`http://localhost:3000/api/solicitation/${props.solicitationId}`);
    user.value = response.data.data;
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

.form-container div:nth-child(3){
    width: 100%;
}

.form-container div:nth-child(6){
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