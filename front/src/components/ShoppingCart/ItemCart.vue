<template>
    <div class="flex p-4" v-if="data">
        <figure class="w-32">
            <img :src="data.image_url" :alt="data.productName">
        </figure>
        <div class="pl-4 flex flex-col w-full">
            <div>
                <span class="font-semibold">{{ data.productName }}</span>
            </div>
            <div class="self-end my-2">
                <span class="font-semibold text-blue-600">{{currency}} {{ data.price }}</span>
            </div>
            <div class="flex items-center">
                <amount-counter :product="data" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">

    import { Component, Vue, Prop } from 'vue-property-decorator';
    import { CURRENCY_SYMBOL } from '../../globals';
    import IProduct from '../../interfaces/IProduct'

    import AmountCounter from '@/components/shoppingCart/AmountCounter.vue'

    @Component({
        components: {
            AmountCounter
        }
    })
    export default class ShoppingCart extends Vue{
        private currency = CURRENCY_SYMBOL
        @Prop() private data!: IProduct 
    }
</script>