<template>
  <div class="container">
    <BoxComp class="box">
      <template #title>
        <h1>Cadastro de usuário</h1>
      </template>
      <template #inputs>
        <InputComp placeholder="Selecionar">
          <template #icon>
            <font-awesome-icon icon="fa-solid fa-user-secret" />
          </template>
        </InputComp>

        <InputComp placeholder="Filtrar">
          <template #icon>
            <font-awesome-icon icon="fa-solid fa-user-secret" />
          </template>
        </InputComp>
      </template>
  
      <template #content>
        <div class="register-form">
          <InputComp placeholder="Nome" />
          <InputComp placeholder="E-mail" />
          <InputComp placeholder="Senha" />
          <ButtonComp type="btn-primary" text="Cadastrar"></ButtonComp>
          <ButtonComp type="btn-secondary" text="Voltar"></ButtonComp>
        </div>
      </template>
    </BoxComp>
  </div>
</template>

<script setup lang="ts">
import BoxComp from '@/components/BoxComp.vue';
import InputComp from '@/components/InputComp.vue';
import ButtonComp from '@/components/ButtonComp.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';

library.add(faUserSecret);
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

</style>


