<template>
    <div class="flex p-4">
        <figure class="w-32">
            <img :src="data.image_url" :alt="data.productName">
        </figure>
        <div class="pl-4 flex flex-col w-full">
            <div>
                <span class="font-semibold">{{ data.productName }}</span>
            </div>
            <div class="self-end my-2">
                <span class="font-semibold text-blue-600">$ {{ data.price }}</span>
            </div>
            <div class="flex items-center">
                <div class="flex w-24 border justify-between">
                    <button @click="addAmount" class="bg-gray-300 w-6 h-6 flex items-center justify-center focus:none" :disabled="data.stock === 0">+</button>
                    <span class="px-2">{{ data.amount }}</span>
                    <button @click="removeAmount" class="bg-gray-300 w-6 h-6 flex items-center justify-center focus:none">-</button>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import IProduct from '../../interfaces/IProduct'
    import { namespace } from 'vuex-class'


    const products = namespace('products')
    const cart = namespace('cart')

    @Component
    export default class ShoppingCart extends Vue{
        @Prop() private data!: IProduct 

        @cart.Action
        public addProduct!: (product: IProduct) => void

        @cart.Action
        public removeProduct!: (product: IProduct) => void

        @products.Action
        public decreaseStockProduct!: (id: string) => void

        @products.Action
        public increaseStockProduct!: (id: string) => void

        addAmount() {
            this.addProduct( this.data )
            this.decreaseStockProduct( this.data.id )
        }

        removeAmount() {
            this.removeProduct( this.data )
            this.increaseStockProduct( this.data.id )
        }



    }
</script>