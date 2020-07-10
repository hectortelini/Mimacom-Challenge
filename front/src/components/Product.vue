<template>
    <div :class="{'w-full md:w-2/4 lg:w-1/3 xl:w-1/4 flex flex-col px-10 py-4 lg:p-4': !full, 'w-full': full}" v-if="data">
        <div class="flex flex-col bg-white rounded overflow-hidden" :class="{'lg:flex-row p-4': full, 'h-full': !full}">
            <figure class="self-center relative" :class="{'lg:w-1/3': full}">
                <div @click="doFavorite" class="absolute right-0 top-0 cursor-pointer" :class="{'mr-2 mt-2': !full, 'mr-8 mt-4': full}">
                    <em class="text-xl icon icon-heart" :class="{'text-white': !data.favorite, 'text-red-600': data.favorite}"></em>
                </div>
                <router-link :to="{ name: 'Product', params: { id: data.id }}">
                    <img :src="data.image_url" :alt="data.productName">
                </router-link>
            </figure>
            <div class="p-2 flex flex-col" :class="{'lg:w-2/3 lg:h-auto': full, 'h-full': !full}">
                <div class="flex justify-between font-bold">
                    <router-link :to="{ name: 'Product', params: { id: data.id }}">
                        <span :class="{'text-lg': !full, 'text-3xl': full}">{{ data.productName }}</span>
                    </router-link>
                    <span class="text-blue-600" :class="{'text-2xl': full}">{{ data.price }} {{ currency }}</span>
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
                    <button-default @click="addProductToCart" name="+ add" :disabled="!isAvailableToBuy" />
                </div>

            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
import IProduct from '../interfaces/IProduct'
import { namespace } from 'vuex-class'

import ButtonDefault from '@/components/includes/ButtonDefault.vue'

const cart = namespace('cart')
const products = namespace('products')

@Component({
    components: {
        ButtonDefault
    }
})
export default class Product extends Vue{
    private currency = '$'

    @Prop() private data!: IProduct;
    @Prop({default: false}) private full!: boolean;

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