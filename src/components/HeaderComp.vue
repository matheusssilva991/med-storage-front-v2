<template>
    <header class="header">
        <h1>Header</h1>
        <div>
            <router-link to="/">Home</router-link>
            <router-link to="/register">Register</router-link>
            <ButtonComp type="btn-primary" text="Button" icon="fa-solid fa-user-secret"/>
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

</style>

<script setup lang="ts">
import ButtonComp from './ButtonComp.vue'
</script>