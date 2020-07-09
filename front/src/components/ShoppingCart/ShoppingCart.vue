<template>
    <div class="h-screen absolute lg:relative flex flex-col lg:opacity-100 lg:flex lg:w-1/4 lg:p-4 flex-shrink-0 bg-white border-l border-gray-500 shadow-xl overflow-hidden"
    :class="{
        'opacity-1 w-screen p-4': this.open,
        'opacity-0 hidden p-0': !this.open

        }"
    >
        <div class="w-full text-center relative flex items-center justify-center">
            <div @click="onClose" class="absolute left-0 ml-4 flex justify-center items-center cursor-pointer lg:hidden">
                <em class="icon icon-left-open-big text-2xl"></em>
            </div>
            <span class="text-3xl">Cart</span>
        </div>
        <div class="relative flex-grow overflow-y-auto">
            <perfect-scrollbar v-if="cartProducts.length > 0">
                <div class="flex flex-col h-full">
                    <item-cart v-for="(product) in cartProducts" :key="`${product.id}-${product.amount}`" :data="product" />
                </div>
            </perfect-scrollbar>
            <div v-else class="flex flex-col h-full justify-center text-center">
                <span class="font-bold text-xl text-gray-500">
                    Your cart is empty :(
                </span>
                <span class="font-bold text-xs text-gray-500">
                    Try to add some products
                </span>
            </div>
        </div>
        <div class="flex flex-col xl:flex-row-reverse justify-between sm:items-center">
            <div class="text-xl font-semibold py-4 self-end border-b lg:border-b-0 border-gray-200 w-full mb-8 lg:mb-0 text-right">
                <span class="mr-8">
                    Total Amount:
                </span>
                <span class="text-orange-400">
                    ${{totalPrice}}
                </span>
            </div>
            <div class="mr-4">
                <button class="w-full bg-orange-400 text-white text-xl font-bold py-2 px-6">
                    Checkout
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Emit } from 'vue-property-decorator';

    import IProduct from '../../interfaces/IProduct'
    import { namespace } from 'vuex-class'
    import ItemCart from '@/components/ShoppingCart/ItemCart.vue';

    const cart = namespace('cart')

    @Component({
        components: {
            ItemCart
        }
    })
    export default class ShoppingCart extends Vue{

        @Prop({default: false}) private open!: boolean

        @cart.State
        public cartProducts!: IProduct[]

        get allItems() {
            return this.$store.state.cart.cartProducts 
        }

        get totalPrice(){
            return this.cartProducts.length > 0 ? this.cartProducts.map(this.amount).reduce(this.sum) : 0
        }

        amount(item: IProduct): number{
            return item.price * item.amount!
        }

        sum(prev: number, next: number): number{
            return prev + next
        }

        @Emit()
        onClose(){
            console.log('hola')
            this.open
        }
        

    }
</script>