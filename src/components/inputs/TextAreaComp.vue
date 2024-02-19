<template>
    <div class="text-area-container">
        <slot name="icon"></slot>
        <textarea :type="type" :readonly="isReadonly" :placeholder="placeholder" :cols="cols" :rows="rows"
        :name="name" :maxlength="maxLength" :required="isRequired" v-model="inputValue"></textarea>
    </div>
</template>

<script setup lang="ts">

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
    isReadonly: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        default: ''
    },
    maxLength: {
        type: Number,
        default: 100
    },
    cols: {
        type: Number,
        default: 5
    },
    rows: {
        type: Number,
        default: 10
    },
});

const inputValue = defineModel({default: '' });

</script>

<style scoped>
textarea {
  border: 1px solid var(--color-border-input);
  border-radius: var(--border-radius);
  color: var(--color-text-input);
  background-color: var(--color-background-input);
  padding: 0.6em 0.6em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  /* box-shadow: 0.6px 1.1px 1.1px hsl(0deg 0% 0% / 0.48); */
}

textarea:focus {
  border: 1px solid var(--color-text);
  color:var(--color-text);
  outline: none;
}

textarea:focus::placeholder {
  color: var(--color-placeholder-input);
}

textarea:disabled {
  background-color: var(--color-background-input-disabled);
  color: var(--color-text-input-disabled);
  cursor: text;
}

.text-area-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5em;
}

@media only screen and (max-width: 1024px) {
    textarea {
        font-size: 0.9em;
        padding: 0.5em 0.5em;
    }

    .text-area-container {
        gap: 0.3rem;
        font-size: 0.8em;
    }
}

</style>