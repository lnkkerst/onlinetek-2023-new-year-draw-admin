<script setup lang="ts">
import type { TicketRecord } from '~~/utils';

const props = withDefaults(defineProps<{ data?: TicketRecord[] }>(), {
  data: () => []
});
const emit = defineEmits<{
  (
    e: 'changeStatus',
    value: { id: string; status: { redeemed: boolean } }
  ): void;
  (e: 'deleteRecord', value: string): void;
}>();
</script>

<template>
  <div>
    <v-table hover fixed-header>
      <thead>
        <tr>
          <th>访客 ID</th>
          <th>中奖号码</th>
          <th>奖品名称</th>
          <th>是否合法</th>
          <th>已兑换</th>
          <th>操作</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in props.data" :key="item.visitorId">
          <td>{{ item.visitorId }}</td>
          <td>{{ item.code }}</td>
          <td>{{ item.ticket?.name }}</td>
          <td>{{ item.valid ? '是' : '否' }}</td>
          <td>{{ item.redeemed ? '是' : '否' }}</td>
          <td>
            <div flex>
              <v-btn
                v-if="!item.redeemed"
                color="primary"
                variant="text"
                @click="
                  emit('changeStatus', {
                    id: item.id,
                    status: { redeemed: true }
                  })
                "
              >
                兑换
              </v-btn>
              <v-btn
                v-else
                color="warning"
                variant="text"
                @click="
                  emit('changeStatus', {
                    id: item.id,
                    status: { redeemed: false }
                  })
                "
              >
                撤销
              </v-btn>

              <v-btn
                color="error"
                variant="text"
                @click="emit('deleteRecord', item.id)"
              >
                删除
              </v-btn>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>

    <div v-if="!props.data?.length" text-center text="gray lg" mt="4">
      啥都没有捏~
    </div>
  </div>
</template>

<style scoped></style>
