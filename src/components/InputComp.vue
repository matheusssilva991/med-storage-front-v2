<template>
    <div class="input-container">
        <slot name="icon"></slot>
        <input :type="type" :value="value" :placeholder="placeholder" :required="isRequired" 
        :disabled="isDisabled">
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('');

const props = defineProps({
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
    value: {
        type: String,
        default: ''
    },
    isDisabled: {
        type: Boolean,
        default: false
    }
});

</script>
<style scoped>
input {
  border: 1px solid var(--color-border-input);
  border-radius: var(--border-radius);
  color: #8a8a8a;
  background-color: var(--color-background-input);
  padding: 0.5em 0.8em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  /* box-shadow: 0.6px 1.1px 1.1px hsl(0deg 0% 0% / 0.48); */
}

input:focus {
  border: 1px solid var(--color-text);
  color:var(--color-text);
  outline: none;
}

input:focus::placeholder {
  color: var(--color-input-placeholder);
}

.input-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

@media only screen and (max-width: 1024px) {
    input {
        font-size: 0.9em;
        padding: 0.4em 0.8em;
    }

    .input-container {
        gap: 0.3rem;
        font-size: 0.7rem;
    }
}

</style>