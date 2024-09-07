<template>
  <Card class="w-sm h-full">
    <Tabs>
      <Tabs.TabPane
        v-for="(item, index) in tabsState.list"
        :key="item.id"
        :tab="index == 0 ? '主处方' : '副处方'"
      >
        <Card>
          <Form>
            <Form.Item label="药品">
              <Input />
              -
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
      </Tabs.TabPane>

      <template #rightExtra>
        <Button type="primary">添加副处方</Button>
      </template>
    </Tabs>
  </Card>
</template>

<script lang="ts" setup>
import { Button, Card, Form, Input, Tabs } from 'ant-design-vue';
import { PresEntity } from '@/service/pres/model/presModel';
import { reactive } from 'vue';

const tabsState = reactive({
  activeKey: '',
  list: [{ id: Date.now().toString() }] as PresEntity[],
});
</script>

<style lang="scss" scoped></style>
