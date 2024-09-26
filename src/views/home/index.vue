<template>
  <div class="size-screen flex min-w-320">
    <HomeChat />
    <HomePre v-if="prescriptStore.currentConId" />
    <HomeDrug v-if="prescriptStore.currentConId" />
  </div>
</template>
<script lang="tsx" setup>
import HomeChat from './components/HomeChat.vue';
import HomeDrug from './components/HomeDrug.vue';
import HomePre from './components/HomePre.vue';
import { usePrescriptionStore } from '@/store/modules/prescription';

const prescriptStore = usePrescriptionStore();
</script>
<style lang="scss"></style>
