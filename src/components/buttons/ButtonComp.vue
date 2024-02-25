<template>
    <button :class="buttonClass" :type="btnType" :disabled="isDisabled" 
    >
        <div class="icon-container">
            <slot name="icon"></slot>
        </div>
        {{ text }}
    </button>
</template>

<script setup lang="ts">
import type { PropType, ButtonHTMLAttributes } from 'vue';
import { ref } from 'vue';

const props = defineProps({
    text: {
        type: String,
        required: true
    },
    btnClass: {
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
    btnType: {
        type: String as PropType<ButtonHTMLAttributes['type']>,
        default: 'button',
        validator: (value: string) => {
            return [
                'button',
                'submit',
                'reset',
                undefined
            ].includes(value)
        }
    },
    isDisabled: {
        type: Boolean,
        default: false
    }
});

const buttonClass = ref(props.btnClass);
buttonClass.value = props.isDisabled ? buttonClass.value + ` disabled` : buttonClass.value;

</script>

<style scoped>

button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-radius: var(--border-radius);
    padding: 0.22rem 0.7rem;
    cursor: pointer;
    min-width: fit-content;
    gap: 0.3rem;
    font-size: 1rem;
}

button:active {
    transform: scale(0.98);
}

.icon-container:deep(*) {
    font-size: 1rem;
}

button.disabled {
    cursor: not-allowed;
    opacity: 0.3;
    background-color: var(--color-background-btn-disabled);
    content: #ffff;
}

button.disabled:active {
    transform: scale(1);
}

button.disabled:hover {
    background-color: var(--color-background-btn-disabled);
}

@media only screen and (max-width: 1024px) {
    button {
        font-size: 0.9rem;
        padding: 0.2rem 0.6rem;
    }

    .icon-container:deep(*) {
        font-size: 0.9rem;
    }
}

@media only screen and (max-width: 768px) {
    button {
        font-size: 0.8rem;
        padding: 0.2rem 0.5rem;
    }

    .icon-container:deep(*) {
        font-size: 0.8rem;
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