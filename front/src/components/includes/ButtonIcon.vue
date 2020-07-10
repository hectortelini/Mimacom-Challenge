<template>
    <div @click="$emit('click')" class="btn-icon">
        <em :class="`flex items-center icon icon-${icon}`"></em>
        <div v-if="notice" class="rounded-full h-4 w-4 bg-blue-700 flex justify-center item-center absolute bottom-0 right-0">
            <span class="text-xs font-bold text-white">{{noticeNumber}}</span>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';

    @Component
    export default class ButtonIcon extends Vue {
        @Prop() private icon!: string
        @Prop({default: false}) private notice!: boolean
        @Prop({default: null}) private noticeNumber!: number | null
    }
</script>

<style lang="postcss">

    .btn-icon {
        @apply bg-gray-200 rounded-md h-10 w-10 flex justify-center items-center cursor-pointer ease-in-out duration-150 relative;
    }

    .btn-icon:hover {
        @apply bg-gray-800 text-white;
    }

    .btn-icon:focus {
        @apply outline-none;
    }
    
</style>
