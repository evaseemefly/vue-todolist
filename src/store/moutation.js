import * as types from "./mutation-type.js";

export default {
  [types.SET_NOW](state, now) {
    state.now = now;
  },
  [types.SET_MONTH](state, isMonth) {
    state.isMonth = isMonth;
  }
};
