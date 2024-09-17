<template>
  <div class="size-screen flex min-w-320">
    <HomeChat />
    <HomePre v-if="prescriptStore.currentPreId" />
    <HomeDrug v-if="prescriptStore.currentPreId" />
  </div>
</template>
<script lang="tsx" setup>
import { onMounted } from 'vue';
import HomeChat from './components/HomeChat.vue';
import HomeDrug from './components/HomeDrug.vue';
import HomePre from './components/HomePre.vue';
import { usePrescriptionStore } from '@/store/modules/prescription';

const prescriptStore = usePrescriptionStore();
</script>
<style lang="scss"></style>
