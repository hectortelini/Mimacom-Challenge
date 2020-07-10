<template>
  <main class="home">
    <div class="flex w-screen h-screen">
      <div class="flex flex-col flex-grow relative">
        <nav-header @cart="onOpenCart" />
        <perfect-scrollbar>
          <slot></slot>
        </perfect-scrollbar>
      </div>
      <shopping-cart @on-close="onOpenCart" :open="cartOpened"/>
    </div>
  </main>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import NavHeader from '@/components/includes/NavHeader.vue'
    import ShoppingCart from '@/components/shoppingCart/ShoppingCart.vue'

    @Component({
    components: {
        NavHeader,
        ShoppingCart
    }
})
    export default class DefaultTemplate extends Vue {

        private cartOpened = false; 

        onOpenCart() {
            this.cartOpened = !this.cartOpened;
        }
        
    }
    
</script>