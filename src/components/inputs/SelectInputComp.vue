<template>
    <div class="select-container">
        <slot name="icon"></slot>
        <select  :required="isRequired" :disabled="isDisabled" :name="name" v-model="optionValue">
            <option v-for="option in props.options" :value="option" :key="option._id">
                {{ option.value }}
            </option>
        </select>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
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
    },
    options: {
        type: Array<any>,
        default: []
    }
});

const optionValue = defineModel();

</script>

<style scoped>
select {
  border: 1px solid var(--color-border-input);
  border-radius: var(--border-radius);
  color: var(--color-text-input);
  background-color: var(--color-background-input);
  padding: 0.15rem 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
  /* box-shadow: 0.6px 1.1px 1.1px hsl(0deg 0% 0% / 0.48); */
}

select:focus {
  border: 1px solid var(--color-text);
  color:var(--color-text);
  outline: none;
}

select:disabled {
  background-color: var(--color-background-input-disabled);
  color: var(--color-text-input-disabled);
  cursor: text;
}

.select-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

option {
    color: var(--color-heading);
    padding: 0.2rem 0.2rem;
    font-size: 0.9rem;
}

option:focus {
    background-color: var(--color-heading);
    color: var(--color-background-input);
}

@media only screen and (max-width: 1024px) {
    select {
        font-size: 0.9rem;
        padding: 0.13rem 0rem;
    }

    .select-container {
        gap: 0.2rem;
        font-size: 0.9rem;
    }
}

@media only screen and (max-width: 768px) {
    select {
        font-size: 0.8rem;
        padding: 0.13rem 0rem;
    }

    .select-container {
        gap: 0.2rem;
        font-size: 0.8rem;
    }
}

</style>