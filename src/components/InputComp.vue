<template>
    <input :type="type" :value="value" :placeholder="placeholder">
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
    }
})

</script>
<style scoped>
input {
  border: 1px solid var(--color-border-input);
  border-radius: var(--border-radius);
  color: #8a8a8a;
  background-color: var(--color-background-input);
  padding: 0.5rem 0.5rem;
  font-size: 1rem;
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

@media only screen and (max-width: 1023px) {
    input {
        font-size: 0.8rem;
        padding: 0.4rem 0.4rem;
    }
}

@media only screen and (max-width: 719px) {
    input {
        font-size: 0.5rem;
        padding: 0.35rem 0.35rem;
    }
}

</style>