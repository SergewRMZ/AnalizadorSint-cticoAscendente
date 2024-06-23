import Token from "../helpers/interface.Token";
import Parser from "../helpers/Parser";
import Scanner from "../helpers/Lexer";
import { Store } from 'vuex';

interface ParserState {
  tokens: Token[] | null;
  stack: (number | string)[] | null;
  pointer: number | null;
  messages: string[] | null;
}

const ParserStore = {
  namespaced: true,

  state: (): ParserState => ({
    tokens: null,
    stack: null,
    pointer: null,
    messages: []
  }),
  
  mutations: {
    SET_TOKENS(state: ParserState, tokens: Token[]) {
      state.tokens = tokens;      
    },

    SET_STACK(state: ParserState, stack: (number | string)[]) {
      state.stack = stack;
    },

    SET_POINTER(state: ParserState, pointer: number) {
      state.pointer = pointer;
    },

    SET_MESSAGE(state: ParserState, message: string) {
      state.messages?.push(message);
    }
  },

  actions: {
    async initLexer({commit}: any, source: string) {
      const tokens = new Scanner(source).scan();
      commit('SET_TOKENS', tokens);
    }
  },

  getters: {
    
  },
};

export default ParserStore;