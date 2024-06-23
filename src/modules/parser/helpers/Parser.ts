import Token from "./interface.Token";
import TipoToken from './TipoToken';
import { Store } from 'vuex';

type Action = number | [string, number];
type LRTable = {
  [key: string]: {
    [key: string]: Action;
  };
};

class Parser {
  private tokens: Token[];
  private index: number;
  private preanalisis: Token;

  private IrTable: LRTable;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
    this.index = 0;
    this.preanalisis = tokens[this.index];

    this.IrTable = {
      '0': {
        'id': ['s', 5],
        '(': ['s', 4],
        'E': 1,
        'T': 2,
        'F': 3
      },

      '1': {
        '+': ['s', 6],
        '$': ['acc', 0],
      }, 

      '2': {
        '+': ['r', 2],
        '*': ['s', 7], 
        ')': ['r', 2],
        '$': ['r', 2],
      },

      '3': {
        '+': ['r', 4],
        '*': ['r', 4], 
        ')': ['r', 4],
        '$': ['r', 4],
      },

      '4': {
        'id': ['s', 5],
        '(': ['s', 4], 
        'E': 8,
        'T': 2,
        'F': 3
      },

      '5': {
        '+': ['r', 6],
        '*': ['r', 6],
        ')': ['r', 6],
        '$': ['r', 6],
      },

      '6': {
        'id': ['s', 5],
        '(': ['s', 4],
        'T': 9,
        'F': 3
      },

      '7': {
        'id': ['s', 5],
        '(': ['s', 4],
        'F': 10
      },

      '8': {
        '+': ['s', 6],
        ')': ['s', 11],
      },

      '9': {
        '+': ['r', 1],
        '*': ['s', 7],
        ')': ['r', 1],
        '$': ['r', 1],
      },

      '10': {
        '+': ['r', 3],
        '*': ['r', 3],
        ')': ['r', 3],
        '$': ['r', 3],
      },

      '11': {
        '+': ['r', 5],
        '*': ['r', 5],
        ')': ['r', 5],
        '$': ['r', 5],
      }
    }
  }

  private obtenerSimboloDeReduccion(ruleNumber: number): string {
    switch (ruleNumber) {
      case 1: return 'E';
      case 2: return 'E';
      case 3: return 'T';
      case 4: return 'T';
      case 5: return 'F';
      case 6: return 'F';
      default: throw new Error(`Regla de reducción no válida: ${ruleNumber}`);
    }
  }

  private obtenerNumeroDeSimbolosEnCuerpo(ruleNumber: number): number {
    switch (ruleNumber) {
      case 1: return 3; // E -> E + T
      case 2: return 1; // E -> T
      case 3: return 3; // T -> T * F
      case 4: return 1; // T -> F
      case 5: return 3; // F -> ( E )
      case 6: return 1; // F -> id
      default: throw new Error(`Regla de reducción no válida: ${ruleNumber}`);
    }
  }

  public parse() {
    let stack: (number | string)[] = [0]; // Pila

    while (true) {
      const currentState = stack[stack.length - 1];
      console.log(`Estado actual: ${currentState} Symbol: ${this.preanalisis.lexema}`);
      const action: Action = this.IrTable[currentState.toString()][this.preanalisis.lexema];
      console.log(`Action ${action}`);

      if (Array.isArray(action)) {
        const [actionType, nextState] = action;

        if (actionType === 's') {
            stack.push(nextState);
            this.index++;
            this.preanalisis = this.tokens[this.index];
        }

        else if (actionType === 'r') {
          console.log('Reducción');
          const symbolsNumber = this.obtenerNumeroDeSimbolosEnCuerpo(nextState);

          // Tenemos que sacar los estados de la pila.
          for (let i = 0; i < symbolsNumber; i++) {
            stack.pop();
          }

          // Actualizar estado de la pila y obtener el símbolo de reducción
          const currentState = stack[stack.length - 1];
          const reductionSymbol = this.obtenerSimboloDeReduccion(nextState);
          const nextAction = this.IrTable[currentState.toString()][reductionSymbol];
          Array.isArray(nextAction) ? stack.push(nextAction[1]) : stack.push(nextAction);
          console.log(`Producción`, reductionSymbol);
        }

        else if (actionType === 'acc') {
          console.log('Aceptar cadena');
          break;
        }
      }

      else {
        throw new Error (`Error sintáctico en la cadena ${this.tokens[this.index - 1]}`);
      }
    }
  }
}

export default Parser;