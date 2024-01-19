<template>
  <div class="container">
    <BoxComp class="box" title="Solicitar cadastro">
  
      <template #content>
        <form class="register-form" @submit.prevent="register">
          <div class="input-field">
            <label for="name">Name *</label>
            <InputComp placeholder="Informe seu nome" id="name" :isRequired="true" 
            @change-value-from-child="changeValue" name="name" :value="name"/>
          </div>

          <div class="input-field">
            <label for="E-mail">E-mail *</label>
            <InputComp placeholder="Informe seu e-mail" type="email" id="email" :isRequired="true"
            @change-value-from-child="changeValue" name="email" :value="email"/>
          </div>

          <div class="input-field">
            <label for="password">Senha *</label>
            <InputComp placeholder="Informe sua senha" type="password" :isRequired="true" id="password"
            @change-value-from-child="changeValue" name="password" :value="password"/>
          </div>

          <div class="input-field">
            <label for="institution">Instituição *</label>
            <InputComp placeholder="Informe sua instituição" id="institution" :isRequired="true"
            @change-value-from-child="changeValue" name="institution" :value="institution"/>
          </div>

          <div class="input-field">
            <label for="country">País *</label>
            <InputComp placeholder="Informe seu país" id="country" :isRequired="true"
            @change-value-from-child="changeValue" name="country" :value="country"/>
          </div>

          <div class="input-field">
            <label for="city">Cidade</label>
            <InputComp placeholder="Informe sua Cidade" id="city"
            @change-value-from-child="changeValue" name="city" :value="city"/>
          </div>

          <div class="input-field">
            <label for="lattes">Currículo Lattes</label>
            <InputComp placeholder="Informe o link do Lattes" id="lattes"
            @change-value-from-child="changeValue" name="lattes" :value="lattes"/>
          </div>

          <div class="button-field">
            <ConfirmDialog></ConfirmDialog>
            <ButtonComp btn-class="btn-secondary" text="Voltar" @click="goHome"></ButtonComp>
            <ButtonComp btn-class="btn-primary" text="Cadastrar" btn-type="submit"></ButtonComp>
          </div>
        </form>
      </template>
    </BoxComp>
  </div>
</template>

<script setup lang="ts">
import BoxComp from '@/components/BoxComp.vue';
import ButtonComp from '@/components/ButtonComp.vue';
import InputComp from '@/components/InputComp.vue';
import axios from 'axios';
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from "primevue/useconfirm";
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { toast } from 'vue3-toastify';

// Variáveis
const router = useRouter(); // Para navegação
const confirm = useConfirm(); // Para usar o confirmDialog do primeVue
const name = ref('');
const email = ref('');
const password = ref('');
const institution = ref('');
const country = ref('');
const city = ref('');
const lattes = ref('');

// Funções
const goHome = () => {
    confirm.require({
        message: 'Você tem certeza que deseja voltar?',
        header: 'Retornar',
        rejectLabel: 'Cancelar',
        acceptLabel: 'Retornar',
        acceptClass: 'p-button-secondary p-button-sm',
        rejectClass: 'p-button-danger p-button-sm',
        accept: () => router.push({ name: 'home' }),
    });
};

function changeValue(varName: string, value: string) {
  if (varName === 'name')
    name.value = value;
  else if (varName === 'email')
    email.value = value;
  else if (varName === 'password')
    password.value = value;
  else if (varName === 'institution')
    institution.value = value;
  else if (varName === 'country')
    country.value = value;
  else if (varName === 'city')
    city.value = value;
  else if (varName === 'lattes')
    lattes.value = value;
}

async function register(){
  try {
    await axios.post('http://localhost:3000/api/solicitation', {
      type: 'newUser',
      data: {
        name: name.value,
        email: email.value,
        password: password.value,
        institution: institution.value,
        country: country.value,
        city: city.value,
        lattes: lattes.value
      }
    });
    toast.success('Solicitação enviada com sucesso!.');
    router.push({ name: 'home' });
  }
  catch (error: any) {
    const messages = error?.response?.data?.message;
    
    if (typeof messages === 'object') {
      messages.forEach((message: string) => {
        toast.error(message);
      });
    } else {
      toast.error(messages);
    }
  }
}

</script>


<style scoped>

.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box{
  width: 60%;
  margin-top: 2.5rem;
}

.register-form {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

.input-field{
  margin-bottom: 20px;
  width: 48%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.3rem;
}

.button-field {
  margin-top: 1rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.button-field button {
  width: 5rem;
}

@media screen and (max-width: 1024px) {
  .container-title {
    font-size: 1.3rem;
  }

  .input-field {
    font-size: 0.8rem;
  }

  .button-field button {
    width: 4rem;
  }
}

@media screen and (max-width: 780px) {
  .input-field {
    width: 100%;
    gap: 0.2rem;
  }

  .button-field {
    justify-content: center;
  }

  .button-field button {
    width: 3.5rem;
  }
}

</style>


