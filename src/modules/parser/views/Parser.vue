<template>
  <div class="container mt-5">
    <h2 class="fw-bold">Análisis Sintáctico Ascendente</h2>
    
    <div class="row mt-5">
      <div class="col-md-6">

        <div v-if="stack" class="stack-container shadow-sm">
          <div 
            v-for="(item, index) in stack" 
            :key="index" 
            :class="['item', { 'active': index === currentPointer }]"
          >
            {{ item }}
          </div>
        </div>

        <div class="container_msg mt-3 text-start" ref="messageContainer">
          <div
            v-for="(message, index) in messages"
            :key="index"
            class="message"
          >

          {{ message }}

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
            <div class="btn-group w-50" role="group">
              <button class="btn btn-primary w-50 fw-bold" @click="analizar" :disabled="!isValid || isProcessing">Analizar</button>
              <button class="btn btn-dark w-50 fw-bold" @click="resetear" :disabled="isProcessing">Restablecer</button>
            </div>
            <div v-if="message_acc" :class="['alert mt-3 w-50', syntax_error ? 'alert-danger' : 'alert-success']" role="alert">
              {{ message_acc }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Parser from '../helpers/Parser';

export default {
  data() {
    return {
      cadena: 'id * id + id',
      isProcessing: false,
    }
  },

  computed: {
    ...mapState('parser', ['tokens', 'stack', 'pointer', 'messages', 'message_acc', 'syntax_error']),
    isValid() {
      return this.cadena.trim() !== '';
    },

    currentPointer() {
      return this.pointer;
    },
  },

  methods: {
    ...mapActions('parser', ['initLexer', 'resetParser']),

    async analizar () {
      try {
        this.isProcessing = true;
        await this.initLexer(this.cadena);
        await new Parser(this.tokens, this.$store).parse(); 
        this.isProcessing = false;
      } catch (error) {
        
      } 
      
    },

    resetear () {
      this.resetParser();
      this.cadena = '';
    },

    scrollToBottom() {
      const container = this.$refs.messageContainer;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }

  },

  updated() {
    this.$nextTick(() => {
      this.scrollToBottom();
    });
  }

}
</script>

<style scoped>
.container_msg {
  margin: 0 auto;
  width: 500px;
  max-height: 200px;
  overflow-y: auto; /* Habilitar barra de desplazamiento vertical si es necesario */
}

.message {
  padding: 5px;
  margin: 5px 0;
  background-color: #dfdfdf;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 700;
}

.stack-container {
  display: flex;
  flex-direction: column-reverse; 
  align-items: center;
  margin-top: 10px;
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
