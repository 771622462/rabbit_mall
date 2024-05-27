<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { getCategoryAPI } from './apis/testAPI';
import { onMounted } from 'vue';

// onMounted(() => {
//   getCategoryAPI().then(ans => console.log(ans))
// })
</script>

<template>
  <RouterView></RouterView>
</template>

<style scoped lang="scss">
.test {
  color: $priceColor;
}
</style>
