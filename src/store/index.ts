import { createStore } from 'vuex';
import ParserStore from '@/modules/parser/store/Parser.store';

export default createStore({
  modules: {
    parser: ParserStore,
  }
})
