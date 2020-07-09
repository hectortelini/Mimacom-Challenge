<template>
    <div class="w-full">
        <div class="text-center">
          <h1 class="text-3xl">Product List</h1>
          <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link :to="{ name: 'Favorites' }">Favorites</router-link>
          </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    export default class NavHeader extends Vue{
        
    }
</script>