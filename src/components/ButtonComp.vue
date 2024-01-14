<template>
    <button :class="type">
        <slot name="icon"></slot>
        {{ text }}
    </button>
</template>

<script setup lang="ts">

const props = defineProps({
    text: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'btn-primary',
        validator: (value: string) => {
            return [
                'btn-primary',
                'btn-outline-primary',
                'btn-secondary',
                'btn-outline-secondary',
                'btn-danger',
                'btn-outline-danger'
            ].includes(value)
        }
    },
});

</script>

<style scoped>

button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-radius: var(--border-radius);
    padding: 0.4em 0.4em;
    cursor: pointer;
}

@media only screen and (max-width: 1024px) {
    button {
        font-size: 0.6em;
        padding: 0.35em 0.35em;
    }
}

@media only screen and (max-width: 720px) {
    button {
        font-size: 0.5em;
        padding: 0.35em 0.35em;
    }
}

/* Primary */
.btn-primary {
    border: 0.5px solid var(--color-border-btn-primary);
    background-color: var(--color-background-btn-primary);
    color: var(--color-text-btn-primary);
}

.btn-primary:hover {
    border: 0.5px solid var(--color-border-btn-primary-hover);
    background-color: var(--color-background-btn-primary-hover);
}

.btn-outline-primary {
    border: 0.5px solid var(--color-background-btn-primary);
    background-color: var(--color-text-btn-primary);
    color: var(--color-background-btn-primary);
}

.btn-outline-primary:hover {
    border: 0.5px solid var(--color-background-btn-primary);
    background-color: var(--color-background-btn-primary);
    color: var(--color-text-btn-primary);
}
/* Fim Primary */

/* Secondary */
.btn-secondary {
    border: 0.5px solid var(--color-border-btn-secondary);
    background-color: var(--color-background-btn-secondary);
    color: var(--color-text-btn-secondary);
}

.btn-secondary:hover {
    border: 0.5px solid var(--color-border-btn-secondary-hover);
    background-color: var(--color-background-btn-secondary-hover);
}

.btn-outline-secondary {
    border: 0.5px solid var(--color-background-btn-secondary);
    background-color: var(--color-text-btn-secondary);
    color: var(--color-background-btn-secondary);
}

.btn-outline-secondary:hover {
    border: 0.5px solid var(--color-background-btn-secondary);
    background-color: var(--color-background-btn-secondary);
    color: var(--color-text-btn-secondary);
}
/* Fim Secondary */

/* Danger */
.btn-danger {
    border: 0.5px solid var(--color-border-btn-danger);
    background-color: var(--color-background-btn-danger);
    color: var(--color-text-btn-danger);
}

.btn-danger:hover {
    border: 0.5px solid var(--color-border-btn-danger-hover);
    background-color: var(--color-background-btn-danger-hover);
}

.btn-outline-danger {
    border: 0.5px solid var(--color-background-btn-danger);
    background-color: var(--color-text-btn-danger);
    color: var(--color-background-btn-danger);
}

.btn-outline-danger:hover {
    border: 0.5px solid var(--color-background-btn-danger);
    background-color: var(--color-background-btn-danger);
    color: var(--color-text-btn-danger);
}
/* Fim Danger */

</style>