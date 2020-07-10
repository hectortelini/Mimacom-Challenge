<template>
  <main class="home" v-if="product">
    <div class="flex w-screen h-screen">
      <div class="my-10 mx-8">
        <product :data="product" :full="true" />
      </div>
      <shopping-cart />
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import IProduct from '../interfaces/IProduct'
import { namespace } from 'vuex-class'

import Product from '@/components/Product.vue'
import ShoppingCart from '@/components/ShoppingCart/ShoppingCart.vue'


const products = namespace('products')

@Component({
  components: {
    Product, 
    ShoppingCart
  }
})

export default class SingleProduct extends Vue  {

  @products.State
  public product!: IProduct

  @products.Action
  public loadProduct!: (id: string) => void

  async mounted() {
    await this.loadProduct(this.$route.params.id);
    console.log(this.product);
  }
}
</script>
