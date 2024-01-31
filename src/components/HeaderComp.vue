<template>
    <header class="header-container">
      <div class="header">
        <div class="header-logo">
          <router-link to="/">
            <img src="../assets/images/logo.png" alt="Logo MedStorage" width="30%"/>
          </router-link>
        </div>
        <form class="header-login-form" @submit.prevent="login">
          <InputComp type="email" placeholder="E-mail" class="input-login" v-model="email" :is-required="true">
            <template #icon>
              <font-awesome-icon icon="fa-solid fa-user" />
            </template>
          </InputComp>

          <InputComp type="password" placeholder="Senha" class="input-login" v-model="password" :is-required="true">
            <template #icon>
              <font-awesome-icon icon="fa-solid fa-key" />
            </template>
          </InputComp>

          <ButtonComp btn-type="submit" text="Login" class="btn-login">
            <template #icon>
              <font-awesome-icon icon="fa fa-arrow-right-to-bracket" />
            </template>
          </ButtonComp>

          <ButtonComp @click="goToRegister" text="Registrar" btn-class="btn-outline-primary" class="btn-login">
            <template #icon>
              <font-awesome-icon icon="fa-solid fa-user-plus" />
            </template>
          </ButtonComp>
        </form>
      </div>
    </header>
</template>

<script setup lang="ts">
import ButtonComp from '@/components/ButtonComp.vue';
import InputComp from '@/components/InputComp.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowRightToBracket, faUserPlus, faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'vue-router';
import { toastSuccess, toastError } from '@/helpers/toast-messages';
import axios from 'axios';
import { ref } from 'vue';

const router = useRouter(); // Para navegação

library.add(faArrowRightToBracket, faUserPlus, faUser, faKey);

const email = ref('');
const password = ref('');

const login = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/login', {
      email: email.value,
      password: password.value
    });

    const { accessToken } = response.data;
    localStorage.setItem('token', accessToken);
    toastSuccess('Login efetuado com sucesso!');
    router.push('/databases');
  } catch (error: any) {
    const messages = error.response.data.message;
    for (let message of messages) {
      toastError(message);
    }
  }
}

const goToRegister = () => {
  router.push('/register');
}

</script>

<style scoped>

.header-container {
    color: white;
    width: 100%;
    height: 80px;
    background-color: var(--color-background-header);
    display: flex;
    justify-content: center;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px
}

.header {
    width: 97%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.header-login-form {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 45%;
    gap: 0.6rem;
    color: var(--color-heading);
}

.input-login {
  width: 100%;
}

.btn-login {
  width: 10px;
}


</style>@/helpers/toast-messages