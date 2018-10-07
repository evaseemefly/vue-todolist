
//组装并导出store的地方


import Vue from 'vue'

import Vuex from 'vuex'
import state from './state.js'
import * as getters from './getter'
import mutations from './moutation'

Vue.use(Vuex)

export default new Vuex.Store({
    state,
    getters,
    mutations
})