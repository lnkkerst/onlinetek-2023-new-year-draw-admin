<script setup lang="ts">
import type { Ticket } from '~~/utils';

const props = withDefaults(defineProps<{ data?: Ticket[] }>(), {
  data: () => []
});
const emit = defineEmits<{
  (e: 'clickEdit', value: Ticket): void;
}>();
</script>

<template>
  <div>
    <v-table>
      <thead>
        <tr>
          <th>名称</th>
          <th>数量</th>
          <th>描述</th>
          <th>操作</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in props.data" :key="JSON.stringify(item)">
          <td>{{ item.name }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ item.description }}</td>
          <td>
            <v-btn
              color="primary"
              variant="text"
              @click="emit('clickEdit', item)"
            >
              修改
            </v-btn>
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
