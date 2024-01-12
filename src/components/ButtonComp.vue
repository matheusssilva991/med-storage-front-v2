<template>
    <button :class="type">
        <font-awesome-icon :icon="icon" />
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
    icon: {
        type: String,
        default: ''
    }
})

</script>

<style scoped>
button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--border-radius);
    padding: 0.5rem 0.5rem;
    cursor: pointer;
    font-size: 1rem;
    gap: 0.5rem;
}

@media only screen and (max-width: 1023px) {
    button {
        font-size: 0.8rem;
        padding: 0.4rem 0.4rem;
    }
}

@media only screen and (max-width: 719px) {
    button {
        font-size: 0.5rem;
        padding: 0.35rem 0.35rem;
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