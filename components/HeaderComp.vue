<template>
    <header class="header">
        <h1>Header</h1>
        <div class="header-nav">
            <router-link to="/">Home</router-link>
            <router-link to="/register">Register</router-link>
            <ButtonComp type="btn-primary" text="Button" icon="fa-solid fa-user-secret" @click="success"/>
            <ButtonComp type="btn-secondary" text="Button" icon="fa-solid fa-user-secret" @click="info"/>
            <ButtonComp type="btn-danger" text="Button" icon="fa-solid fa-user-secret" @click="error"/>
        </div>
    </header>
</template>

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

</style>

<script setup lang="ts">
import ButtonComp from './ButtonComp.vue'
import { toast } from 'vue3-toastify';

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