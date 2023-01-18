<script setup lang="ts">
import type { Ticket } from '~~/utils';

const props = withDefaults(defineProps<{ data?: Ticket[] }>(), {
  data: () => []
});
</script>

<template>
  <div>
    <v-table>
      <thead>
        <tr>
          <th>号码</th>
          <th>已发放</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in props.data" :key="JSON.stringify(item)">
          <td>{{ item.code }}</td>
          <td>{{ item.used ? '是' : '否' }}</td>
        </tr>
      </tbody>
    </v-table>

    <div v-if="!props.data?.length" text-center text="gray lg" mt="4">
      啥都没有捏~
    </div>
  </div>
</template>

<style scoped></style>
