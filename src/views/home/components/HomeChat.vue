<template>
  <div v-if="tuiChatState.userID" class="size-screen">
    <TUIKit
      class="size-full"
      v-bind="tuiChatState"
      @changeTim="setCurrentPreId"
    />
    <TUICallKit
      class="callkit-container"
      :allowedMinimized="true"
      :allowedFullScreen="false"
    />
  </div>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/store/modules/user';
import { genTestUserSig, TUIKit } from '@/TUIKit';
import { TUICallKit } from '@tencentcloud/call-uikit-vue';
import { onMounted, reactive } from 'vue';
import { getAppGlobalConfig } from '@/utils/env';
import { getDoctorInfoApi } from '@/service/doctor/doctor';
import { getUserRoleId } from '@/utils/auth';
import { getRoleApi } from '@/service/sys/user';
import { Persistent } from '@/utils/cache/persistent';
import { USER_ROLE_ID_KEY } from '@/enums/cacheEnum';
import { usePrescriptionStore } from '@/store/modules/prescription';
import { getPresListApi } from '@/service/pres/pres';

onMounted(async () => {
  await getRoleApi('user').then((res) => {
    if (!res?.[0]?.userrole_id) return;

    Persistent.setLocal(USER_ROLE_ID_KEY, res[0].userrole_id);
  });

  await getDoctorInfoApi({ found_id: getUserRoleId() }).then((res) => {
    if (res && res.id) {
      initChatStatus(res.id);
    }
  });
});

const {} = useUserStore();
const { setCurrentPreId } = usePrescriptionStore();
const { $chat_SDKAppID: SDKAppID, $chat_secretKey: SECRETKEY } =
  getAppGlobalConfig();

const tuiChatState = reactive({
  SDKAppID,
  userID: '',
  userSig: '',
});

function initChatStatus(userID) {
  const { userSig } = genTestUserSig({
    SDKAppID,
    secretKey: SECRETKEY,
    userID,
  });

  Object.assign(tuiChatState, {
    userID,
    userSig,
  });
}
</script>
<style lang="scss"></style>
