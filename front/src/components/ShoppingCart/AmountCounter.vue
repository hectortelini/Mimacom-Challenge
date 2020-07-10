<template>
    <div class="amount-counter" v-if="product">
        <button @click="addAmount" class="amount-counter__btn" :disabled="product.stock === 0">+</button>
        <span class="px-2">{{ product.amount }}</span>
        <button @click="removeAmount" class="amount-counter__btn">-</button>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import IProduct from '../../interfaces/IProduct'
    import { namespace } from 'vuex-class'


    const products = namespace('products')
    const cart = namespace('cart')

    @Component
    export default class AmountCounter extends Vue{
        @Prop() private product!: IProduct 

        @cart.Action
        public addProduct!: (product: IProduct) => void

        @cart.Action
        public removeProduct!: (product: IProduct) => void

        @products.Action
        public decreaseStockProduct!: (id: string) => void

        @products.Action
        public increaseStockProduct!: (id: string) => void

        addAmount() {
            this.addProduct( this.product )
            this.decreaseStockProduct( this.product.id )
        }

        removeAmount() {
            this.removeProduct( this.product )
            this.increaseStockProduct( this.product.id )
        }

    }
</script>

<style lang="postcss">

    .amount-counter{
        @apply flex w-24 border justify-between rounded-sm;
    }

    .amount-counter__btn{
       @apply bg-white w-6 h-6 flex items-center justify-center ease-in-out duration-150 font-semibold;
    }

    .amount-counter__btn:hover{
        @apply bg-gray-300;
    }

    .amount-counter__btn:disabled{
        @apply bg-gray-100 text-gray-300 cursor-not-allowed;
    }

    .amount-counter__btn:focus{
        @apply outline-none;
    }

</style>