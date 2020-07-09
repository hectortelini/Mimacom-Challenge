<template>
  <main class="home">
    <div class="flex w-screen h-screen">
        <div class="w-full">
            <div class="flex flex-col lg:flex-row p-4 bg-white my-10 mx-8">
                <figure>
                    <img :src="product.image_url" :alt="product.productName">
                </figure>
                <div class="w-full px-4 flex flex-col">
                    <div class="flex justify-between">
                        <h2 class="text-3xl font-bold">{{ product.productName }}</h2>
                        <span class="font-bold text-2xl text-blue-600">{{ product.price }} $</span>
                    </div>
                    <div class="flex-grow mt-4">
                        <p>
                            {{ product.productDescription }}
                        </p>
                    </div>
                    <div class="flex justify-between">
                        <span>
                            {{ stockLeft }} 
                        </span>
                        <button class="btn-default" :disabled="!isAvailableToBuy">
                            + add
                        </button>
                    </div>
                </div>
            </div>
        </div>
      <shopping-cart />
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Product from '@/components/Product.vue'
import IProduct from '../interfaces/IProduct'
import { namespace } from 'vuex-class'
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

  get stockLeft() {
        return  this.product.stock ? `${this.product.stock} Left` : 'No Stock'
    }

  async mounted() {
    await this.loadProduct(this.$route.params.id);
    console.log(this.product);
  }
}
</script>
