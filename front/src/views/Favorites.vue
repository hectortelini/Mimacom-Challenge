<template>
  <default-template>
    <div class="flex flex-wrap px-4 overflow-y-auto">
        <product v-for="(product, index) in products" :key="index" :data="product" />
      </div>
  </default-template>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class'

import IProduct from '../interfaces/IProduct'

import DefaultTemplate from '@/components/template/DefaultTemplate.vue'
import Product from '@/components/Product.vue'

const products = namespace('products')

@Component({
  components: {
    DefaultTemplate,
    Product
  }
})

export default class Home extends Vue  {
  private products: IProduct[] = [];

  @products.Getter
  public allProducts!: IProduct[]

  @products.Action
  public loadFavoriteProducts!: () => void

  async mounted() {
    await this.loadFavoriteProducts();
    this.products = this.allProducts;
  }
}
</script>
