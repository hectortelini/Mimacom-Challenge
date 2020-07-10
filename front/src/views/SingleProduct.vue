<template>
  <default-template>
    <div class="my-10 mx-8">
      <product :data="product" :full="true" />
    </div>
  </default-template>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
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

export default class SingleProduct extends Vue  {


  @products.State
  private product!: IProduct 

  @products.Action
  public loadProduct!: (id: string) => void

  async mounted() {
    await this.loadProduct(this.$route.params.id);
  }
}
</script>
