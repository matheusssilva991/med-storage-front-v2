<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderComp from './components/HeaderComp.vue'

</script>

<template>
  <HeaderComp/>
  <div>
    <router-link to="/home">Home</router-link>
    <router-link to="/register">Register</router-link>
  </div>

  <RouterView />
</template>

<style scoped>
</style>
