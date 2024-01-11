<template>
    <header class="header">
        <h1>Header</h1>
        <div>
            <router-link to="/">Home</router-link>
            <router-link to="/register">Register</router-link>
        </div>
    </header>
</template>

<style scoped>

.header {
    color: white;
    width: 100%;
    height: 100px;
}

</style>

<script setup lang="ts">
</script>