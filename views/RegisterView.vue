<template>
  <section class = "menu-principal">
      <header>
          <h2>Criar conta</h2>
      </header>
      <main class = "formulario-cadastro-pessoa">
          <form action = "" method = "POST" target = "_self">
              <article class = "lado-esquerdo-menu">
                  <label for = "nome" class = "labels">Nome:</label>
                  <input class = "campo-texto" type = "text" name = "nome" id = "nome" placeholder = "Informe seu nome" required>
                  <label for = "senha" class = "labels">Senha:</label>
                  <input class = "campo-texto" type = "password" name = "senha" id = "senha" placeholder = "Informe uma senha" required>
                  <label for = "pais" class = "labels">Pa&iacute;s:</label>
                  <input class = "campo-texto" type = "text" name = "pais" id = "pais" placeholder = "País" required>
                  <label for = "lattes" class = "labels">LATTES:</label>
                  <input class = "campo-texto" type = "text" name = "lattes" id = "lattes" placeholder = "Seu Curriculo LATTES" required>
              </article>
              <aside class = "lado-direito-menu">
                  <main>
                      <label for = "email" class = "labels">E-mail:</label>
                      <input class = "campo-texto" type = "email" name = "email" id = "email" placeholder = "Informe seu e-mail" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required>
                      <label for = "instituicao" class = "labels">Institui&ccedil;&atilde;o:</label>
                      <input class = "campo-texto" type = "text" name = "instituicao" id = "instituicao" placeholder = "Informe sua Instituição" required>
                      <label for = "cidade" class = "labels">Cidade:</label>
                      <input class = "campo-texto" type = "text" name = "cidade" id = "cidade" placeholder = "Informe sua Cidade" required>
                  </main>
                  <footer>
                      <button class = "botao-voltar">voltar</button>
                      <input class = "botao-salvar" type = "submit" value = "salvar">
                  </footer>
              </aside>
          </form>
      </main>
  </section>
</template>
  
<style>
  
</style>
