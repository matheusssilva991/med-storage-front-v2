<template>
    <div class="input-container">
        <slot name="icon"></slot>
        <input :type="type" v-model="inputValue" :placeholder="placeholder" :required="isRequired" 
        :disabled="isDisabled" @input="handleEvent()">
    </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';

// Emitir eventos
const emit = defineEmits(['changeValueFromChild']);

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
    },
    name: {
        type: String,
        default: ''
    }
});

const inputValue = ref(props.value);

function handleEvent() {
    emit('changeValueFromChild', props.name, inputValue.value);
}

</script>

<style scoped>
input {
  border: 1px solid var(--color-border-input);
  border-radius: var(--border-radius);
  color: #8a8a8a;
  background-color: var(--color-background-input);
  padding: 0.3em 0.8em;
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
  gap: 0.5em;
}

@media only screen and (max-width: 1024px) {
    input {
        font-size: 0.9em;
        padding: 0.3em 0.7em;
    }

    .input-container {
        gap: 0.3rem;
        font-size: 0.8em;
    }
}

</style>