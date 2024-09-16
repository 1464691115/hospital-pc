<template>
  <view class="login">
    <view class="content">
      <!-- 头部logo -->
      <view class="header" id="headerHeight">
        <uni-icons
          @click=""
          type="left"
          size="25"
          color="#FFFFFF"
          style="position: absolute; left: 38rpx; top: 90rpx; z-index: 2"
        ></uni-icons>
        <image src="@/static/images/login/login-header.png"></image>
      </view>
      <!-- 主体表单 -->
      <view
        class="main"
        :style="'min-height:calc(100vh - ' + mainHeight + 'px);'"
      >
        <view class="login-title">登录</view>
        <view class="login-tips">输入您的电话号码以登录</view>
        <!-- <BasicInput
          v-model="state.phoneData"
          :maxlength="11"
          input-border
          placeholder="用户名/电话"
        />
        <BasicInput
          v-model="state.passData"
          password
          input-border
          placeholder="验证码"
        /> -->
        <view class="input-box" :class="isRed ? 'error-class' : ''">
          <view v-if="isRed" class="error-phone">无效的电话号码</view>
          <view class="phone-num-type-box">
            <text class="phone-num-type">+86</text>
            <image
              src="../../static/images/login/num-arrow.png"
              class="phone-num-arrow-img"
            />
          </view>
          <input
            v-model="state.phoneData"
            @blur="onPhoneDataBlur"
            class="uni-input"
            placeholder="请输入您的手机号"
            :maxlength="11"
            placeholder-class="input-placeholder"
          />
        </view>
        <view class="input-box">
          <image
            src="../../static/images/login/input-icon.png"
            class="input-icon"
          />
          <input
            v-model="state.passData"
            password="true"
            class="uni-input"
            placeholder="请输入验证码"
            placeholder-class="input-placeholder"
          />
        </view>

        <view class="forget-psd"></view>
        <!-- <navigator url="forget" open-type="navigate" hover-class="none" class="forget-psd">忘记验证码？</navigator> -->

        <Button @click="startLogin">立即登录</Button>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { useUserStore } from '@/store/modules/user';
import { Button } from 'ant-design-vue';
import { useMessage } from '@/hooks/web/useMessage';
import { useRouter } from 'vue-router';

onMounted(() => {
  state.isRotate = false;
});

const router = useRouter();
const { login } = useUserStore();
const { createErrorModal } = useMessage();
const showToast = (text) => createErrorModal({ title: text });

const mainHeight = ref(500);

const state = reactive({
  phoneData: '15392529970', // 用户/电话
  passData: '952795289529', //验证码
  isRotate: false, //是否加载旋转
  isFocus: true, // 是否聚焦
});

const isRed = ref(false); // 手机号错误样式

async function startLogin() {
  //登录
  if (state.isRotate) {
    //判断是否加载中，避免重复点击请求
    return false;
  }
  if (!state.phoneData) {
    showToast('用户名不能为空');
    return;
  }

  if (!state.passData) {
    showToast('验证码不能为空');
    return;
  }

  state.isRotate = true;

  try {
    await login({
      username: state.phoneData,
      code: state.passData,
    });

    router.push({
      path: '/home',
    });
  } catch (error) {
    console.error(error);
    showToast('登录失败');
  } finally {
    setTimeout(function () {
      state.isRotate = false;
    }, 400);
  }
}

function onPhoneDataBlur() {
  if (state.phoneData.length != 11) {
    isRed.value = true;
  } else {
    isRed.value = false;
  }
}
</script>
<style></style>
