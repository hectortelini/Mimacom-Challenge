<template>
  <main class="home">
    <div class="flex w-screen h-screen">
      <div class="flex flex-col flex-grow">
        <nav-header />
        <div class="flex flex-wrap px-4 overflow-y-auto">
          <product v-for="(product, index) in products" :key="index" :data="product" />
        </div>
      </div>
      <shopping-cart />
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Product from '@/components/Product.vue'
import IProduct from '../interfaces/IProduct'
import { namespace } from 'vuex-class'
import NavHeader from '@/components/includes/NavHeader.vue'
import ShoppingCart from '@/components/ShoppingCart/ShoppingCart.vue'

const products = namespace('products')

@Component({
  components: {
    NavHeader,
    Product, 
    ShoppingCart
  }
})

export default class Home extends Vue  {
  private products: IProduct[] = [];

  @products.Getter
  public allProducts!: IProduct[]

  @products.Action
  public loadProducts!: () => void

  async mounted() {
    await this.loadProducts();
    this.products = this.allProducts;
  }
}
</script>
