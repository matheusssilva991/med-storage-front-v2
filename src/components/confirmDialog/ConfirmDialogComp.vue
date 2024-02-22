<template>
    <ConfirmDialogBaseComp :open="open" :title="title" @close="close">
        <template #content>
            <div class="confirm-dialog-content">
                <div class="confirm-dialog-message">
                    <div>
                        <slot name="icon"></slot>
                    </div>
                    <p>{{ message }}</p>
                </div>
                <div class="confirm-dialog-buttons">
                    <ButtonComp @click="rejectFunction()" :btn-class="rejectClass" :text="rejectText"></ButtonComp>
                    <ButtonComp @click="acceptFunction()" :btn-class="acceptClass" :text="acceptText"></ButtonComp>
                </div>
            </div>
        </template>
    </ConfirmDialogBaseComp>
</template>

<script setup lang="ts">
import ConfirmDialogBaseComp from './ConfirmDialogBaseComp.vue';
import ButtonComp from '../buttons/ButtonComp.vue';

const emit = defineEmits(["close"]);

const close = () => {
	emit("close");
};

const props = defineProps({
    open: {
        type: Boolean,
        required: true
    },
    acceptFunction: {
        type: Function,
        required: true
    },
    rejectFunction: {
        type: Function,
        required: true,
    },
    title: {
        type: String,
        default: "Confirmar?"
    },
    message: {
        type: String,
        default: "Tem certeza que deseja confirmar?"
    }, 
    rejectText: {
        type: String,
        default: "Cancelar"
    },
    acceptText: {
        type: String,
        default: "Confirmar"
    },
    acceptClass: {
        type: String,
        default: "btn-primary"
    },
    rejectClass: {
        type: String,
        default: "btn-secondary"
    }
});

</script>

<style scoped>
.confirm-dialog-message {
    margin-top: 0.5rem;
    margin-bottom: 0.7rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
}

.confirm-dialog-message div:nth-child(1) {
    font-size: 1.5rem;
}

.confirm-dialog-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
}

.confirm-dialog-buttons button {
    width: fit-content;
}
</style>