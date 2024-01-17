<template>
  <div class="container">
    <BoxComp class="box">
      <template #title>
        <h1>Cadastro de usuário</h1>
      </template>
  
      <template #content>
        <div class="register-form">
          <div class="input-field">
            Nome
            <InputComp placeholder="Informe seu nome" />
          </div>

          <div class="input-field">
            E-mail
            <InputComp placeholder="Informe seu e-mail" type="email"/>
          </div>

          <div class="input-field">
            Senha
            <InputComp placeholder="Informe sua senha" type="password" :isRequired="true"/>
          </div>

          <div class="input-field">
            Instituição
            <InputComp placeholder="Informe sua instituição"/>
          </div>

          <div class="input-field">
            País
            <InputComp placeholder="Informe seu país"/>
          </div>

          <div class="input-field">
            Cidade
            <InputComp placeholder="Informe sua Cidade"/>
          </div>

          <div class="input-field">
            Lattes
            <InputComp placeholder="Informe o link do seu currículo Lattes"/>
          </div>

          <div class="button-field">
            <ConfirmDialog></ConfirmDialog>
            <ButtonComp button-class="btn-secondary" text="Voltar" @click="goHome"></ButtonComp>
            <ButtonComp button-class="btn-primary" text="Cadastrar"></ButtonComp>
          </div>
        </div>
      </template>
    </BoxComp>
  </div>
</template>

<script setup lang="ts">
import BoxComp from '@/components/BoxComp.vue';
import ButtonComp from '@/components/ButtonComp.vue';
import InputComp from '@/components/InputComp.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from "primevue/useconfirm";
import { useRouter } from 'vue-router';

const router = useRouter();
const confirm = useConfirm();

library.add(faUserSecret);

function handleGoHome() {
  router.push({ name: 'home' });
}

const goHome = () => {
    confirm.require({
        message: 'Você tem certeza que deseja voltar?',
        header: 'Retornar',
        icon: 'icon-delete',
        rejectLabel: 'Cancelar',
        acceptLabel: 'Retornar',
        acceptClass: 'p-button-success',
        accept: handleGoHome,
    });
};

</script>


<style scoped>

.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box{
  width: 60%;
  margin-top: 20px;
}

.register-form {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

.input-field{
  margin-bottom: 20px;
  width: 48%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
}

.button-field {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.button-field button {
  width: 5rem;
}

@media screen and (max-width: 720px) {
  .input-field {
    width: 100%;
  }
}

</style>


