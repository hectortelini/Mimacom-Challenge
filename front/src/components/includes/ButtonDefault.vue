<template>
    <button class="btn-default" @click="$emit('click')" :disabled="disabled">
        {{ name }}
    </button>
</template>

<script lang="ts">

    import {Component, Vue, Prop} from 'vue-property-decorator'

    @Component
    export default class ButtonDefault extends Vue {
        @Prop() private readonly name!: string
        @Prop() private disabled!: boolean

    }
</script>

<style lang="postcss">

    .btn-default {
        @apply bg-orange-400 text-white cursor-pointer px-3 py-1 ease-linear duration-150;
    }

    .btn-default:disabled {
        @apply bg-gray-300 cursor-not-allowed;
    }

    .btn-default:hover {
        @apply bg-orange-500;
    }

    .btn-default:focus {
        @apply outline-none;
    }

</style>