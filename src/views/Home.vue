<template>
  <div class="container mt-5 font-principal">
    <h1 class="tittle-color">Análisis Sintáctico Ascendente</h1>
""
    <div style="margin: 0 auto;" class="text-start w-75">
      <p>El análisis sintáctico ascendente corresponde a la construcción de un árbol de análisis sintáctico para una cadena de entrada que empieza en las hojas y avanza hacía la raíz del árbol.

      En la siguiente imagen podemos una secuencia de cómo se construye el árbol de <span class="bold-text">análisis sintáctico ascendente</span>, podemos visualizar que parte desde los nodos hoja hacía la raíz del árbol.
      </p>


      <img src="@/assets/imagen__ascendente.png" alt="Imagen Ascendente" class="img-fluid rounded border boder-dark shadow-sm mx-auto d-block"/>
      <figcaption class="font-italic text-center mt-2">Diagrama del análisis sintáctico ascendente</figcaption>

      <h3 class="mt-3">Reducciones</h3>

      Podemos considerar que este análisis consiste en aplicar el proceso conocido como <span class="bold-text">reducciones</span>
    </div>
  </div>
</template>

<style scoped>
  .tittle-color {
    color: var(--color_principal);
    font-weight: bold;
    font-family: "Roboto Mono", sans-serif;
    text-transform: uppercase;
  }
</style>