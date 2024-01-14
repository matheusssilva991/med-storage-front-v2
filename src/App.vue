<script setup lang="ts">
import { RouterView } from 'vue-router';
import HeaderComp from './components/HeaderComp.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';

library.add(faUserSecret);

</script>

<template>
  <HeaderComp/>
  <!--
  <ButtonComp type="btn-primary" text="Button" icon="fa-solid fa-user-secret"/>
  <ButtonComp type="btn-secondary" text="Button" icon="fa-solid fa-user-secret"/>
  <ButtonComp type="btn-danger" text="Button" icon="fa-solid fa-user-secret"/>
  <ButtonComp type="btn-outline-primary" text="Button" icon="fa-solid fa-user-secret"/>
  <ButtonComp type="btn-outline-secondary" text="Button" icon="fa-solid fa-user-secret"/>
  <ButtonComp type="btn-outline-danger" text="Button" icon="fa-solid fa-user-secret"/>
  <input class="input-base" type="text" placeholder="E-mail">
  <input class="input-base" type="text" placeholder="Password">
  -->
  <RouterView />
</template>

<style scoped>

</style>
