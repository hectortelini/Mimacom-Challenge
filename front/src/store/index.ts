import Vue from 'vue'
import Vuex from 'vuex'

// modules
import ProductsModule from '@/store/modules/ProductsModule'
import CartModule from '@/store/modules/CartModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    products: ProductsModule,
    cart: CartModule
  }
})
