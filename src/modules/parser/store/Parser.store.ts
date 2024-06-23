import Token from "../helpers/interface.Token";
import Parser from "../helpers/Parser";
import Scanner from "../helpers/Lexer";

interface ParserState {
  tokens: Token[] | null;
  stack: (number | string)[] | null;
}

const ParserStore = {
  namespaced: true,

  state: (): ParserState => ({
    tokens: null,
    stack: null
  }),
  
  mutations: {
    SET_TOKENS(state: ParserState, tokens: Token[]) {
      console.log('Tokens establecidos');
      state.tokens = tokens;      
    },

    SET_STACK(state: ParserState, stack: (number | string)[]) {
      state.stack = stack;
    },
  },

  actions: {
    async initParser({ state, commit }: { state: ParserState; commit: any }) {
      if (!state.tokens) {
        throw new Error('Tokens are not initialized.');
      }

      const parser = new Parser(state.tokens);
      await parser.parse();
    },

    async initLexer({commit}: any, source: string) {
      const tokens = new Scanner(source).scan();
      commit('SET_TOKENS', tokens);
    }
  },

  getters: {
    
  },
};

export default ParserStore;