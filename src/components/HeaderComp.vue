<template>
    <header class="header">
        <h1>Header</h1>
        <div class="header-nav">
            <router-link to="/">Home</router-link>
            <router-link to="/register">Register</router-link>
            <ButtonComp class="button-container" type="btn-primary" text="Button" icon="fa-solid fa-user-secret" @click="success"/>
            <ButtonComp class="button-container" type="btn-secondary" text="Button" icon="fa-solid fa-user-secret" @click="info"/>
            <ButtonComp class="button-container" type="btn-danger" text="Button" icon="fa-solid fa-user-secret" @click="error"/>
            <InputComp class="input-container" placeholder="Logar"/>
        </div>
    </header>
</template>

<script setup lang="ts">
import ButtonComp from '@/components/ButtonComp.vue';
import { toast } from 'vue3-toastify';
import InputComp from '@/components/InputComp.vue';

const success = () => {
  toast.success('Logado com sucesso.');
}

const info = () => {
  toast.info('Nada importante');
}

const error = () => {
  toast.error('Erro ao logar.');
}
</script>

<style scoped>

.header {
    color: white;
    width: 100%;
    height: 100px;
    background-color: #FFFF;
}

.header-nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: fit-content;
    width: 100%;
    margin-top: 1rem;
    gap: 1rem;
}

.button-container {
  width: 80px;
}

.input-container {
  width: 400px;
}

</style>