<template>
  <main class="home">
    <div class="flex w-screen h-screen">
      <div class="flex flex-col flex-grow relative">
        <nav-header />
        <perfect-scrollbar>
          <div class="flex flex-wrap px-4">
            <product v-for="(product, index) in products" :key="index" :data="product" />
          </div>
        </perfect-scrollbar>
        <div @click="onOpenCart" class="absolute opacity-75 cursor-pointer bottom-0 right-0 mr-8 mb-8 rounded-full bg-orange-500 text-white p-4 w-16 h-16 flex-shrink-0 flex items-center justify-center lg:hidden">
          <em class="icon icon-basket"></em>
        </div>
      </div>
      <shopping-cart @on-close="onOpenCart" :open="cartOpened"/>
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
  private cartOpened = false; 

  @products.Getter
  public allProducts!: IProduct[]

  @products.Action
  public loadProducts!: () => void

  async mounted() {
    await this.loadProducts();
    this.products = this.allProducts;
  }

  onOpenCart() {
    this.cartOpened = !this.cartOpened;
  }
}
</script>
