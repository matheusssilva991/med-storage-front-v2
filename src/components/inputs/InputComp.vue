<template>
    <div class="input-container">
        <slot name="icon"></slot>
        <input :type="type" v-model="inputValue" :placeholder="placeholder" :required="isRequired" 
        :disabled="isDisabled">
    </div>
</template>

<script setup lang="ts">

defineProps({
    type: {
        type: String,
        default: 'text'
    },
    placeholder: {
        type: String,
        default: ''
    },
    isRequired: {
        type: Boolean,
        default: false
    },
    isDisabled: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        default: ''
    }
});

const inputValue = defineModel();

</script>

<style scoped>
input {
  border: 1px solid var(--color-border-input);
  border-radius: var(--border-radius);
  color: var(--color-text-input);
  background-color: var(--color-background-input);
  padding: 0.22rem 0.7rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
  font-size: 1rem;
  /* box-shadow: 0.6px 1.1px 1.1px hsl(0deg 0% 0% / 0.48); */
}

input:focus {
  border: 1px solid var(--color-text);
  color:var(--color-text);
  outline: none;
}

input:focus::placeholder {
  color: var(--color-placeholder-input);
}

input:disabled {
  background-color: var(--color-background-input-disabled);
  color: var(--color-text-input-disabled);
  cursor: text;
}

.input-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

@media only screen and (max-width: 1024px) {
    input {
        font-size: 0.9rem;
        padding: 0.2rem 0.6rem;
    }

    .input-container {
        gap: 0.3rem;
        font-size: 0.9rem;
    }
}

@media only screen and (max-width: 768px) {
    input {
        font-size: 0.8rem;
        padding: 0.2rem 0.5rem;
    }

    .input-container {
        gap: 0.3rem;
        font-size: 0.8rem;
    }
}

</style>