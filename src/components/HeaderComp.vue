<template>
    <header class="header">
        <h1>Header</h1>
        <div class="header-nav">
            <router-link to="/">Home</router-link>
            <router-link to="/register">Register</router-link>
            <router-link to="/databases">Databases</router-link>
            <ButtonComp class="button-container" btn-class="btn-primary" text="Button"  @click="success">
              <template #icon>
                <font-awesome-icon icon="fa-solid fa-user-secret" />
              </template>
            </ButtonComp>

            <ButtonComp class="button-container" btn-class="btn-secondary" text="Button" @click="info">
              <template #icon>
                <font-awesome-icon icon="fa-solid fa-user-secret" />
              </template>
            </ButtonComp>

            <ButtonComp class="button-container" btn-class="btn-danger" text="Button" @click="error">
              <template #icon>
                <font-awesome-icon icon="fa-solid fa-user-secret" />
              </template>
            </ButtonComp>

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