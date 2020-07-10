<template>
    <div class="w-full bg-white py-4">
        <div class="text-center relative flex flex-col justify-center">
          <div class="absolute right-0 mr-16 lg:hidden">
            <button-icon @click="$emit('cart')" icon="basket" :notice="cartProducts.length > 0" :notice-number="productsInCart" />
          </div>
          <h1 class="text-3xl">Product List</h1>
          <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link :to="{ name: 'Favorites' }">Favorites</router-link>
          </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { namespace } from 'vuex-class'

    import IProduct from '../../interfaces/IProduct'

    import ButtonIcon from '@/components/includes/ButtonIcon.vue'
    
    const cart = namespace('cart')

    @Component({
      components: {
        ButtonIcon
      }
    })
    export default class NavHeader extends Vue{
      @cart.State
        public cartProducts!: IProduct[]
        
      get productsInCart(){
        return this.cartProducts.length > 0 ? this.cartProducts.map(this.total).reduce(this.sum) : null
      }
      
      sum(prev: number, next: number): number{
        return prev + next
      }

      total(item: IProduct): number{
        if(item.amount) return item.amount
        return 0
      }
    }
</script>

<style lang="postcss">

  #nav a {
    @apply font-bold text-blue-800;
  }

  #nav a.router-link-exact-active {
    @apply text-teal-500;
  }

</style>