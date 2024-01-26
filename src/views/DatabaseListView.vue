<template>
    <LoggedTemplateComp>
        <template #box-content>
            <BoxComp title="Banco de imagens">
                <template #button>
                    <ButtonComp btn-class="btn-primary" text="Novo">
                        <template #icon>
                            <font-awesome-icon icon="fa-solid fa-plus" />
                        </template>
                    </ButtonComp>
                </template>
                <h1>Teste</h1>
                <template #content>
                </template>
            </BoxComp>
        </template>
    </LoggedTemplateComp>
</template>

<script setup lang="ts">
import LoggedTemplateComp from '@/components/LoggedTemplateComp.vue';
import BoxComp from '@/components/BoxComp.vue';
import ButtonComp from '@/components/ButtonComp.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

library.add(faPlus);
</script>

<style scoped>
</style>