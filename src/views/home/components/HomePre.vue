<template>
  <Card class="w-xl h-full overflow-y-auto">
    <div>
      <Form layout="">
        <Form.Item label="诊断（疾病，可调整）">
          <Input />
        </Form.Item>
        <Form.Item label="医嘱">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </div>
    <Tabs v-model="tabsState.activeKey">
      <Tabs.TabPane
        v-for="(item, index) in tabsState.list"
        :key="item.id"
        :tab="index == 0 ? '主处方' : '副处方'"
      >
        <template v-if="Array.isArray(item.medicine)">
          <Card
            v-for="(pre, pi) in item.medicine"
            :key="pre.publicdrugs_id"
            :title="pre.dosage_txt"
            class="mb-4"
          >
            <template #extra>
              <Button
                v-if="item.medicine.length <= 1 || pi == 0"
                @click="handleAddPre"
              >
                添加药品
              </Button>
              <Button
                v-else-if="pre.hidden"
                type="link"
                :icon="h(SwapOutlined)"
                @click="pre.hidden = false"
              >
                撤销删除
              </Button>
              <Popconfirm
                v-else
                title="确定删除药品？（随后可点击撤销删除恢复）"
                @confirm="handleDelPre(pre.id)"
              >
                <Button type="primary" danger> 删除药品 </Button>
              </Popconfirm>
            </template>
            <Form v-if="!pre.hidden">
              <Form.Item label="药品">
                <Input />
              </Form.Item>
              <Form.Item label="用法">
                <Input />
              </Form.Item>
              <Form.Item label="用量">
                <Input />
              </Form.Item>
              <Form.Item label="用药天数">
                <Input />
              </Form.Item>
            </Form>
          </Card>
        </template>
      </Tabs.TabPane>

      <template #rightExtra>
        <Button type="primary">添加副处方</Button>
      </template>
    </Tabs>
  </Card>
</template>

<script lang="ts" setup>
import { Button, Card, Form, Input, Popconfirm, Tabs } from 'ant-design-vue';
import { PresEntity } from '@/service/pres/model/presModel';
import { h, reactive, watch } from 'vue';
import { uniqueId } from 'lodash-es';
import { MedicineEntity } from '@/service/pres/model/medicineModel';
import { useMessage } from '@/hooks/web/useMessage';
import { SwapOutlined } from '@ant-design/icons-vue';
import { usePrescriptionStore } from '@/store/modules/prescription';

const tabsState = reactive({
  activeKey: '1',
  list: [
    {
      id: '1',
      medicine: [new MedicineEntity()],
    },
  ] as PresEntity[],
});

const { createConfirm } = useMessage();
const PresStore = usePrescriptionStore();

watch(
  () => PresStore.prescriptInfo,
  (val) => {
    if (Array.isArray(val.pres_body?.Drugs)) {
    }
  }
);

function handleAddPre() {
  const self_state_list = tabsState.list.find(
    (el) => el.id == tabsState.activeKey
  );

  if (self_state_list) {
    self_state_list.medicine = [new MedicineEntity()].concat(
      self_state_list.medicine || []
    );

    console.log(self_state_list.medicine);
  }
}

async function handleDelPre(id) {
  const self_state_list = tabsState.list.find(
    (el) => el.id == tabsState.activeKey
  );

  if (self_state_list) {
    self_state_list.medicine?.some((el) => el.id == id && (el.hidden = true));
  }
}
</script>

<style lang="scss" scoped></style>
