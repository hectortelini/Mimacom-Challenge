<template>
    <div class="w-full lg:w-1/3 xl:w-1/4 flex flex-col p-4" v-if="data">
        <div class="flex flex-col bg-white h-full rounded overflow-hidden">
            <figure class="self-center">
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

    addProductToCart() {
        this.decreaseStockProduct(this.data.id)
        this.addProduct(this.data)
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