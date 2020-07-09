<template>
    <div class="w-full md:w-2/4 lg:w-1/3 xl:w-1/4 flex flex-col px-10 py-4 lg:p-4" v-if="data">
        <div class="flex flex-col bg-white h-full rounded overflow-hidden">
            <figure class="self-center relative">
                <div @click="doFavorite" class="absolute right-0 top-0 mr-2 mt-2 cursor-pointer">
                    <em class="text-xl icon icon-heart" :class="{'text-white': !data.favorite, 'text-red-600': data.favorite}"></em>
                </div>
                <img :src="data.image_url" :alt="data.productName">
            </figure>
            <div class="p-2 flex flex-col h-full">
                <div class="flex justify-between font-bold">
                    <router-link :to="{ name: 'Product', params: { id: data.id }}">
                        <span class="text-lg">{{ data.productName }}</span>
                    </router-link>
                    <span class="text-blue-600">{{ data.price }} {{ currency }}</span>
                </div>
                <div class="flex-grow">
                    <p class="text-left">
                        {{ data.productDescription }}
                    </p>
                </div>
                <div class="flex justify-between items-center">
                    <span>
                        {{ stockLeft }} 
                    </span>
                    <button @click="addProductToCart" class="btn-default" :disabled="!isAvailableToBuy">
                        + add
                    </button>
                </div>

            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
import IProduct from '../interfaces/IProduct'
import { namespace } from 'vuex-class'

const cart = namespace('cart')
const products = namespace('products')

@Component
export default class Product extends Vue{
    private currency = '$'

    @Prop() private data!: IProduct;

    get stockLeft() {
        return  this.data.stock ? `${this.data.stock} Left` : 'No Stock'
    }

    get isAvailableToBuy() {
        return this.data.stock > 0
    }

    @cart.Action
    public addProduct!: (product: IProduct) => void

    @products.Action
    public decreaseStockProduct!: (id: string) => void

    @products.Action
    public favoriteProduct!: (product: IProduct) => void

    addProductToCart() {
        this.decreaseStockProduct(this.data.id)
        this.addProduct(this.data)
    }

    doFavorite(){
        this.favoriteProduct( this.data )
    }


        
}
</script>

<style lang="postcss">
    .btn-default {
        @apply bg-orange-400 text-white cursor-pointer px-3 py-1;
    }

    .btn-default:disabled {
        @apply bg-gray-300 cursor-not-allowed;
    }

</style>