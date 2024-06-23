<template>
  <div class="container mt-5">
    <h2>Pila de Análisis Sintáctico Ascendente</h2>
    
    <div class="row mt-5">
      <div class="col-md-6">

        <div class="stack-container shadow-sm">
          <div 
            v-for="(item, index) in stack" 
            :key="index" 
            :class="['item', { 'active': index === currentPointer }]"
          >
            {{ item }}
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="instructions-container">
          <h3 class="mb-3 text-info fw-bold">Instrucciones de Uso</h3>
          <p class="text-start">Utilizar en la cadena de entrada solo los símbolos de la gramática, de lo contrario se rechazará la entrada por error léxico.</p>

          <h4 class="mt-4 text-center text-secondary">Producciones</h4>
          <div class="d-flex justify-content-center fw-bold">
            <ul class="productions-list text-start">
              <li>E → E + T</li>
              <li>E → T</li>
              <li>T → T * F</li>
              <li>T → F</li>
              <li>F → (E)</li>
              <li>F → id</li>
            </ul>
          </div>
          <div class="form-group d-flex flex-column align-items-center">
            <input class="form-control mb-2 w-50" type="text" v-model="cadena" placeholder="Ingrese la cadena">
            <button class="btn btn-primary w-50 fw-bold" @click="analizar" :disabled="!isValid">Analizar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      // stack: [1, 2, 3, 4, 5],
      stack: [],
      currentPointer: 0, // Inicialmente apunta al primer elemento de la pila
      cadena: ''
    }
  },

  computed: {
    isValid() {
      return this.cadena.trim() !== '';
    },
  },

  mounted() {
    setInterval(() => {
      this.currentPointer = (this.currentPointer + 1) % this.stack.length;
    }, 1000);
  },

  methods: {
    ...mapActions('parser', ['initLexer', 'initParser']),

    async analizar () {
      await this.initLexer(this.cadena);
      await this.initParser();
    }
  }
}
</script>

<style scoped>
.stack-container {
  display: flex;
  flex-direction: column-reverse; 
  align-items: center;
  margin-top: 10px;
  border: 1px solid #000;
  border-radius: 15px;
  padding: 10px;
  width: 500px; 
  margin: 0 auto;
  max-height: 500px;
  overflow-y: auto; /* Habilitar barra de desplazamiento vertical si es necesario */
}

.item {
  margin: 5px;
  padding: 10px;
  border: 2px solid #000;
  width: 100px;
  border-radius: 10px;
  font-weight: bold;
  font-size: 18px;
  transition: background-color 0.3s ease; /* Transición suave para el cambio de color de fondo */
}

.item.active {
  background-color: #0055ff; /* Color de fondo para resaltar el elemento activo */
}

.productions-list {
  list-style: none;
}
</style>
