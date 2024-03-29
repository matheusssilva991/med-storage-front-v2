<template>
    <header :class="{ 'header-container': true, 'header-container-clicked': isClicked }">
        <div class="header">
            <div class="header-logo">
                <router-link to="/" v-if="!isLogged">
                    <img src="../assets/images/logo.png" alt="Logo MedStorage" width="150px"/>
                </router-link>
                <router-link to="/databases" v-else>
                    <img src="../assets/images/logo.png" alt="Logo MedStorage" width="150px"/>
                </router-link>
            </div>
            <div v-if="isSmallScreen && !isLogged" class="header-login-sandwich" @click="isClicked = !isClicked">
                <font-awesome-icon icon="fa-solid fa-bars" :class="{ rotated: isClicked }" />
            </div>
            <form v-if="(isSmallScreen && isClicked || !isSmallScreen) && !isLogged" class="header-login-form"
                @submit.prevent="login">
                <div class="header-login-form-inputs">
                    <InputComp type="email" placeholder="E-mail" class="input-login" v-model="email" :is-required="true">
                        <template #icon>
                            <font-awesome-icon icon="fa-solid fa-user" />
                        </template>
                    </InputComp>

                    <InputComp type="password" placeholder="Senha" class="input-login" v-model="password"
                        :is-required="true">
                        <template #icon>
                            <font-awesome-icon icon="fa-solid fa-key" />
                        </template>
                    </InputComp>
                </div>
                <div class="header-login-form-btn">
                    <ButtonComp btn-type="submit" text="Login" class="btn-login" id="login-btn">
                        <template #icon>
                            <font-awesome-icon icon="fa fa-arrow-right-to-bracket" />
                        </template>
                    </ButtonComp>

                    <ButtonComp @click="goToRegister" text="Registrar" btn-class="btn-outline-primary" 
                    class="btn-login" id="register-btn">
                        <template #icon>
                            <font-awesome-icon icon="fa-solid fa-user-plus" />
                        </template>
                    </ButtonComp>
                </div>

            </form>
            <div v-if="isLogged" class="logged-menu-dropdown">
                <ButtonDropdownComp :text="user.name">
                    <template #icon>
                        <font-awesome-icon icon="fa-solid fa-circle-user" />
                    </template>
                    <template #dropdownItens>
                        <li @click="isOpenEditProfileModal = !isOpenEditProfileModal">
                            Editar Perfil
                        </li>
                        <li @click="logout">
                            <router-link to="/">Logout</router-link>
                        </li>
                    </template>
                </ButtonDropdownComp>
            </div>
        </div>
        <EditUserProfileModalComp v-if="isOpenEditProfileModal" :open="isOpenEditProfileModal"
         @close="isOpenEditProfileModal = !isOpenEditProfileModal" :userId="user._id" />
    </header>
</template>

<script setup lang="ts">
import ButtonComp from '@/components/buttons/ButtonComp.vue';
import InputComp from '@/components/inputs/InputComp.vue';
import ButtonDropdownComp from './buttons/ButtonDropdownComp.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faArrowRightToBracket, faUserPlus, faUser,
    faKey, faBars, faCircleUser
} from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'vue-router';
import { toastSuccess, toastError } from '@/helpers/toast-messages';
import axios from 'axios';
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { checkToken } from '@/helpers/auth';
import EditUserProfileModalComp from './modals/user/EditUserProfileModalComp.vue';

// Variáveis
const router = useRouter(); // Para navegação
library.add(faArrowRightToBracket, faUserPlus, faUser, faKey, faBars, faCircleUser);

const email = ref('');
const password = ref('');
const windowWidth = ref(window.innerWidth)
const windowHeight = ref(window.innerHeight)
const isSmallScreen = ref(false);
const isClicked = ref(false);
const isLogged = ref(false);
const user = ref();
const currentRoute = ref(router.currentRoute.value.path);
const isOpenEditProfileModal = ref();

if (windowWidth.value < 720) {
    isSmallScreen.value = true;
}

// Funções
const login = async () => {
    try {
        const response = await axios.post('http://localhost:3000/api/login', {
            email: email.value,
            password: password.value
        });

        const { accessToken } = response.data;
        localStorage.setItem('token', accessToken);
        isLogged.value = true;
        user.value = await checkToken(accessToken);

        await router.push('/databases');
        toastSuccess('Login efetuado com sucesso!');
    } catch (error: any) {
        const messages = error.response.data.message;

        if (Array.isArray(messages)) {
            for (let message of messages) {
                toastError(message);
            }
        } else {
            toastError(messages);
        }
    }
}

const logout = () => {
    localStorage.removeItem('token');
    isLogged.value = false;
    email.value = '';
    password.value = '';
    toastSuccess('Logout efetuado com sucesso!');
}

const goToRegister = () => {
    router.push('/register');
}

const handleResize = () => {
    windowWidth.value = window.innerWidth;
    windowHeight.value = window.innerHeight;
}

onMounted(async () => {
    window.addEventListener('resize', handleResize);

    const token = localStorage.getItem('token');
    user.value = await checkToken(token);

    if (user.value) {
        isLogged.value = true;
        currentRoute.value = localStorage.getItem('currentRoute') || '/databases';
        

        if (currentRoute.value === '/' || currentRoute.value === '/register') {
            await router.push('/databases');
        } else {
            await router.push(currentRoute.value);
        }
    }
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    localStorage.removeItem('currentRoute');
})

watch(windowWidth, (newWidth) => {
    if (newWidth < 768) {
        isSmallScreen.value = true;
    } else {
        isClicked.value = false;
        isSmallScreen.value = false;
    }
});

watch(router.currentRoute, (newRoute) => {
    currentRoute.value = newRoute.path;
    localStorage.setItem('currentRoute', newRoute.path);
})

</script>

<style scoped>
.header-container {
    color: white;
    width: 100%;
    height: 80px;
    background-color: var(--color-background-header);
    display: flex;
    justify-content: center;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px;
    flex-wrap: wrap;
}

.header-container-clicked {
    height: 180px;
}

.header {
    width: 98%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.header-login-form {
    display: flex;
    align-items: center;
    width: 60%;
    color: var(--color-heading);
    justify-content: flex-end;
    gap: 1.5rem;
}

.header-login-form-inputs {
    display: flex;
    width: 50%;
    gap: 0.5rem;
}

.header-login-form-btn {
    display: flex;
    justify-content: flex-end;
    width: fit-content;
    gap: 0.7rem;
}

.header-login-sandwich {
    font-size: 1rem;
    color: var(--color-text);
}

.header-login-sandwich:hover {
    cursor: pointer;
    color: var(--color-heading);
}

.input-login {
    width: 100%;
}

.btn-login {
    width: fit-content;
}

.rotated {
    transform: rotate(90deg);
}


@media only screen and (max-width: 768px) {

    .header {
        gap: 1rem;
        justify-content: space-around;
        width: 100vw;
        flex-wrap: wrap;
    }

    .header-login-form {
        flex-direction: column;
        width: 70%;
        justify-content: flex-start;
        gap: 0.5rem;
    }

    .header-login-form-inputs {
        flex-direction: column;
        gap: 0.5rem;
        width: 60%;
    }

    .header-login-form-btn {
        gap: 1rem;
        width: 60%;
    }
}
</style>