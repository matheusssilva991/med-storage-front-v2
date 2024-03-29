<template>
    <button :class="btnClass" :type="btnType" @click="() => active = !active">
        <div class="icon-container">
            <slot name="icon"></slot>
        </div>
        {{ text }}
        <div class="icon-container">
            <font-awesome-icon icon="fa-solid fa-caret-down" />
        </div>
    </button>
    <ul class="dropdown" v-if="active">
        <slot name="dropdownItens"></slot>
    </ul>
</template>

<script setup lang="ts">
import type { PropType, ButtonHTMLAttributes } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { ref } from 'vue';

const active = ref(false);

library.add(faCaretDown);

defineProps({
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
    }
});

</script>

<style scoped>

.dropdown {
    color: var(--color-text);
    background-color: var(--color-background-header);
    position: absolute;
    margin-top: 0.3rem;
    border-radius: var(--border-radius);
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px;
    z-index: 1;
    border: 1px solid var(--color-dropdown-border);
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.dropdown:deep(li) {
    padding: 0.2rem 0.7rem;
    cursor: pointer;
    font-size: 1rem;
}

.dropdown:deep(*) {
    font-size: 1rem;
    padding: 0.2rem 0.7rem;
}

.dropdown:deep(li:hover) {
    background-color: var(--color-heading);
    color: var(--color-background-header);
}

.dropdown:deep(a) {
    text-decoration: none;
    color: var(--color-text);
}

.dropdown:deep(a:hover) {
    text-decoration: none;
    color: var(--color-background-header);
}

.dropdown:deep(a:active) {
    text-decoration: none;
    color: var(--color-background-header);
}

.icon-container:deep(*) {
    font-size: 1.1rem;
}


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
    font-size: 1.1rem;
}

@media only screen and (max-width: 1024px) {
    button {
        font-size: 1rem;
        padding: 0.2rem 0.6rem;
    }

    .icon-container:deep(*) {
        font-size: 1rem;
    }

    .dropdown:deep(li) {
        font-size: 0.9em;
        padding: 0.2rem 0.6rem;
    }

    .dropdown:deep(*) {
        font-size: 0.9rem;
        padding: 0.1rem 0.6rem;
    }
}

@media only screen and (max-width: 768px) {
    button {
        font-size: 0.9rem;
        padding: 0.2rem 0.5rem;
    }

    .icon-container:deep(*) {
        font-size: 0.9rem;
    }

    .dropdown:deep(li) {
        font-size: 0.8rem;
        padding: 0.2rem 0.5rem;
    }

    .dropdown:deep(*) {
        font-size: 0.8rem;
        padding: 0.1rem 0.5rem;
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