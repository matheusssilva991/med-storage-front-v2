<template>
    <div class="box-container">
        <div class="header">
            <h1 class="title">
                {{ props.title }}
            </h1>
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
const props = defineProps({
    title: {
        type: String,
        required: true
    }
})

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

@media only screen and (max-width: 1024px) {
    .content {
        margin-top: 1.3rem;
    }

    .title {
        font-size: 1.3rem;
    }
}

@media only screen and (max-width: 780px) {
    .box-container {
        padding: 1.5rem;
    }

    .header {
        flex-direction: column;
        gap: 0.5rem;
    }

    .title {
        width: 100%;
    }

    .inputs {
        width: 100%;
    }
}

</style>