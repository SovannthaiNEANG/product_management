import Vue from 'vue'
import Vuex from 'vuex'
import users from './dummy_datas/user'
import products from './dummy_datas/product'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
  },
  state : {
    users,
    products,
    isLogin: false,
  },
  mutations: {
    SET_IS_LOGIN(state, payload) {
      state.isLogin = payload
    },
    ADD_NEW_PRODUCT(state, payload) {
      state.products.push(payload)
    },
    UPDATE_PRODUCT(state, {index, payload}) {
      state.products[index] = payload
    },
    DELETE_PRODUCT(state, index) {
      state.products.splice(index, 1)
    }
  },
  actions: {
    listProduct({state}, filter) {
      return state.products.filter( (product) => {
        let isSearchName = true
        let isSearchDesciption = true
        let isSearchPrice = true
        let isSearchQuantity = true
        if (filter.name) {
          isSearchName =  product.name.includes(filter.name)
        }
        if (filter.description) {
          isSearchDesciption =  product.description.includes(filter.description)
        }
        if (filter.price) {
          isSearchPrice =  String(product.price).includes(String(filter.price))
        }
        if (filter.quantity) {
          isSearchQuantity =  String(product.quantity).includes(String(filter.quantity))
        }
        return isSearchName && isSearchDesciption && isSearchPrice && isSearchQuantity
      })
    },
    addNewProduct({commit}, payload) {
      commit('ADD_NEW_PRODUCT', payload)
    },
    updateProduct({commit, state}, {id, payload}) {
      let index = state.products.findIndex( el => el.id == id)
      commit('UPDATE_PRODUCT', {index, payload})
    },
    showProduct({state}, id) {
      return state.products.find( el => el.id == id)
    },
    deleteProduct({commit,state}, id) {
      let index = state.products.findIndex(el => el.id == id)
      commit('DELETE_PRODUCT', index)
    }
  },
  getters: {
  }
})
