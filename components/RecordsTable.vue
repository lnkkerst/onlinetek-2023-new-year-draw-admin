<script setup lang="ts">
import type { TicketRecord } from '~~/utils';

const props = withDefaults(defineProps<{ data?: TicketRecord[] }>(), {
  data: () => []
});
</script>

<template>
  <div>
    <v-table>
      <thead>
        <tr>
          <th>访客 ID</th>
          <th>中奖号码</th>
          <th>是否合法</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in props.data" :key="JSON.stringify(item)">
          <td>{{ item.visitorId }}</td>
          <td>{{ item.ticket }}</td>
          <td>{{ item.valid ? '是' : '否' }}</td>
        </tr>
      </tbody>
    </v-table>

    <div v-if="!props.data?.length" text-center text="gray lg" mt="4">
      啥都没有捏~
    </div>
  </div>
</template>

<style scoped></style>
