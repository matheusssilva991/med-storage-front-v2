<template>
  <main class="main-container">
    <div class="main-content">
      <div class="text-container">
        <h1>Med Storage</h1>
        <p>
          Explore a vasta coleção de imagens médicas especializadas e obtenha acesso a informações essenciais sobre
          diversos tipos de exames. No Med Storage, nossa missão é fornecer a você um recurso confiável e
          abrangente para suas necessidades de imagens médicas.
        </p>
  
        <p>
          Sabemos o quanto a precisão e a clareza são importantes ao lidar com informações médicas, e é por isso
          que nossa plataforma foi desenvolvida com os mais altos padrões de qualidade. Cada imagem em nosso banco
          de dados é selecionada criteriosamente e é acompanhada de detalhes relevantes, fornecendo uma
          experiência enriquecedora para profissionais da área da saúde, pesquisadores e estudantes.
        </p>
      </div>
  
      <div class="image-container">
        <img src="./../assets/images/medico.png" alt="Med Storage" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">

</script>

<style scoped>

h1 {
  font-size: 2.5rem;
}

p {
  font-size: 1.2rem;
}

.main-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.main-content {
  padding: 0 5%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: fit-content;
  width: 100%;
  margin-top: 1rem;
}

.text-container {
  text-align: justify;
  margin-top: 5% !important;
  width: 45%;
}

.image-container {
  display: flex;
  justify-content: center;
  width: 45%;
  margin-top: 5%;
  overflow: hidden;
  max-height: 700px;
}

.image-container img{
  display: block;
  width: 100%;
  height: auto;
  max-height: 500px;
  max-width: fit-content;
}

@media screen and (max-width: 1024px) {
  h1 {
    font-size: 2.3rem;
  }

  p {
    font-size: 1.1rem;
  }
}

@media screen and (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }

  p {
    font-size: 1rem;
  }

	.main-content {
    flex-direction: column;
  }

  .text-container {
    width: 80%;
  }

  .image-container {
    margin: 0.2rem auto;
  }
}
</style>