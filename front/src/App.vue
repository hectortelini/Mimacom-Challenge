<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style class="postcss">

html, body{
  @apply bg-gray-300 text-gray-800 antialiased
}

#nav {
  @apply bg-gray-300;
}

#nav a {
  @apply font-bold text-blue-800;
}

#nav a.router-link-exact-active {
  @apply text-teal-500;
}
</style>
