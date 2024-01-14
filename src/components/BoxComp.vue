<template>
    <div class="box-container">
        <div class="header">
            <div class="title">
                <slot name="title"></slot>
            </div>
            <div class="inputs">
                <slot name="inputs"></slot>
            </div>
        </div>
        
        <div class="content">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.box-container {
    width: 100%;
    height: 100%;
    background-color: var(--color-box-background);
    border-radius: var(--border-radius);
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
}

.header {
    width: 100%;
    height: 40%;
    display: flex;
    justify-content: space-between;
}

.title {
    width: 50%;
}

.inputs {
    width: 40%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.content {
    width: 100%;
    margin-top: 2rem;
    height: 60%;
}
</style>