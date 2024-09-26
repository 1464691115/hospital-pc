<template>
  <Card class="w-xl h-full overflow-y-scroll" title="药品详情">
    <template v-if="drugList.length">
      <Card
        v-for="item in drugList"
        :key="item.id"
        :title="item.name"
        class="mb-4"
      >
        <div class="mb-4">
          <h3><b>适应症</b></h3>
          <p>
            祛风，除湿，清热解毒，止痒。用于儿童风热型或湿热型丘疹性荨麻疹。症状可见脓疱疮，风团，水疱，瘙痒等。
          </p>
        </div>

        <div class="mb-4">
          <h3><b>用法用量</b></h3>
          <p>
            开水冲服，6至14岁每次1袋，一日3次，3至5岁每次1袋，一日2次，1至2岁每次半袋，一日3次，一岁以下每次牛袋，一日2次。
          </p>
        </div>

        <div class="mb-4">
          <h3><b>注意事项</b></h3>
          <p>
            1.饮食宜清淡，忌食油腻鱼虾海鲜类及辛辣食物。2.服用或注射某种药物而发生的荨麻疹为药物过敏(药疹)所致，应及时到医院就诊。3.婴儿或患有其他疾病者应在医师指导下服用。4.如出现脓疱疮，应在医师指导下服用。5.因肾病，糖尿病，黄疽，肿瘤等疾病引起的皮肤瘙痒，应以治疗病因为主，若需用本品时，应在医师指导下服用。6.服药3~6天症状无缓解，应去医院就诊。对本品过敏者禁用，过敏体质者慎用。8.本品性状发生改变时禁止使用。9.儿童必须在成人监护下使用。10.请将本品放在儿童不能接触的地方。
          </p>
        </div>
      </Card>
    </template>
    <div v-else class="h-70vh flex items-center justify-center">
      <Empty description="请选择处方药品" />
    </div>
  </Card>
</template>

<script lang="ts" setup>
import {
  getPublicDrugsListApi,
  PublicDrugsModule,
} from '@/service/drugs/publicDrugs';
import { usePrescriptionStore } from '@/store/modules/prescription';
import { Card, Empty } from 'ant-design-vue';
import { onMounted, ref, watch } from 'vue';

onMounted(() => {});

const PresStore = usePrescriptionStore();

const drugList = ref([]);

watch(
  () => PresStore.prescriptList,
  (val) => {
    console.log(
      'val.pres_body?.Drugs <=>+++++++++++++++++++>',
      val,
      '<+++++++++++++++++++++++'
    );
    return;
    if (Array.isArray(val.pres_body?.Drugs)) {
      // const query = PublicDrugsModule.select();
      // val.pres_body.Drugs.forEach((el) => {
      //   query.orWhere({
      //     type: '=',
      //     fild: { id: el.id },
      //   });
      // });
      // query.getMany();
    }
  }
);
</script>

<style lang="scss" scoped></style>
