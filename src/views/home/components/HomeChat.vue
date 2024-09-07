<template>
  <div class="size-screen">
    <TUIKit
      class="size-full"
      :SDKAppID="1600049682"
      userID="001"
      userSig="eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwgYGhlDh4pTsxIKCzBQlK0MzAwMDE0szCyOITGpFQWZRKlDc1NTUCCgFES3JzAWJmRuZGJkaGluYQk3JTAea6p3umV6e710QGZmXZ*FXYmDuk1Meo*8RGhJmaGSU7F-uWBVqbKJt4JhkZulqq1QLAIH3L24_"
    />
    <TUICallKit
      class="callkit-container"
      :allowedMinimized="true"
      :allowedFullScreen="false"
    />
  </div>
</template>
<script lang="ts" setup>
import { TUIKit } from '@/TUIKit';
import { TUICallKit } from '@tencentcloud/call-uikit-vue';
</script>
<style lang="scss"></style>
