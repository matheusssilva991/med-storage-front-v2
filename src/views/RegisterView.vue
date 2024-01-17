<template>
  <div class="container">
    <BoxComp class="box" title="Cadastro de usuário">
  
      <template #content>
        <div class="register-form">
          <div class="input-field">
            <label for="name">Name</label>
            <InputComp placeholder="Informe seu nome" id="name"/>
          </div>

          <div class="input-field">
            <label for="E-mail">E-mail</label>
            <InputComp placeholder="Informe seu e-mail" type="email" id="email"/>
          </div>

          <div class="input-field">
            <label for="password">Senha</label>
            <InputComp placeholder="Informe sua senha" type="password" :isRequired="true" id="password"/>
          </div>

          <div class="input-field">
            <label for="institution">Instituição</label>
            <InputComp placeholder="Informe sua instituição" id="institution"/>
          </div>

          <div class="input-field">
            <label for="country">País</label>
            <InputComp placeholder="Informe seu país" id="country"/>
          </div>

          <div class="input-field">
            <label for="city">Cidade</label>
            <InputComp placeholder="Informe sua Cidade" id="city"/>
          </div>

          <div class="input-field">
            <label for="lattes">Currículo Lattes</label>
            <InputComp placeholder="Informe o link do Lattes" id="lattes"/>
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
  gap: 0.3rem;
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

  .button-field button {
    width: 4rem;
  }
}

@media screen and (max-width: 780px) {
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


