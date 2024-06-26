import Token from "../helpers/interface.Token";
import Parser from "../helpers/Parser";
import Scanner from "../helpers/Lexer";

interface ParserState {
  tokens: Token[] | null;
  stack: (number | string)[] | null;
  pointer: number | null;
  messages: string[] | null;
  message_acc: string | null;
  syntax_error: boolean;
}

const ParserStore = {
  namespaced: true,

  state: (): ParserState => ({
    tokens: null,
    stack: null,
    pointer: null,
    messages: [],
    message_acc: null,
    syntax_error: false,
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
    },

    SET_MESSAGE_ACC (state: ParserState, message: string) {
      state.message_acc = message;
    },

    SET_ERROR (state: ParserState, error: boolean) {
      state.syntax_error = error;
    },

    RESET(state: ParserState) {
      state.tokens = null;
      state.stack = null;
      state.pointer = null;
      state.messages = [];
      state.message_acc = null;
      state.syntax_error = false;
    }
  },

  actions: {
    async initLexer({commit}: any, source: string) {
      try {
        const tokens = new Scanner(source).scan();
        commit('SET_TOKENS', tokens);
      } catch (error) {
        commit('SET_MESSAGE_ACC', error);
        commit('SET_ERROR', true);
      }
    },

    resetParser ({commit}: any) {
      commit('RESET');
    }
  },

  getters: {
    
  },
};

export default ParserStore;