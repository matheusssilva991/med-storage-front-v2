<template>
    <LoggedTemplateComp>
        <template #box-content>
            <BoxComp title="Banco de imagens">
                <h1>Teste</h1>
            </BoxComp>
        </template>
    </LoggedTemplateComp>
</template>

<script setup lang="ts">
import LoggedTemplateComp from '@/components/LoggedTemplateComp.vue';
import BoxComp from '@/components/BoxComp.vue';
</script>

<style scoped>
</style>