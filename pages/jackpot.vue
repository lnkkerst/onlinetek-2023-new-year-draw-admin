<script setup lang="ts">
import type { Ticket } from '~~/utils';

const loading = ref(false);
const collapse = ref(true);
const filterFormReset = {
  name: ''
};
const filterForm = ref({ ...filterFormReset });
const filter = ref<any>({
  name: undefined
});
const data = computedAsync(
  async () => {
    return await $fetch('/api/tickets', {
      query: { name: filter.value.name }
    });
  },
  undefined,
  loading
);
const dialog = ref<{
  open: boolean;
  action: 'add' | 'edit';
  ticket?: Ticket;
}>({
  open: false,
  action: 'add'
});

const refresh = () => {
  filter.value = { ...filter.value };
};
</script>

<template>
  <div>
    <div flex items-center>
      <v-btn
        prepend-icon="mdi-filter"
        variant="outlined"
        @click="collapse = !collapse"
      >
        筛选
      </v-btn>
      <span ml="2">{{ `共${(data as any)?.count}条数据` }}</span>
      <div grow></div>
      <v-btn
        icon="mdi-plus"
        size="small"
        color="primary"
        @click="dialog = { open: true, action: 'add' }"
      ></v-btn>
      <v-btn
        ml-2
        icon="mdi-refresh"
        color="secondary"
        size="small"
        @click="refresh"
      ></v-btn>
    </div>

    <Collapse :collapse="collapse" my="2">
      <div p="6" m="1" shadow rounded>
        <v-text-field v-model="filterForm.name" label="名称"></v-text-field>
        <div grid place-items-center>
          <div>
            <v-btn
              mr="8"
              color="primary"
              prepend-icon="mdi-check"
              @click="filter = { ...filterForm }"
            >
              应用
            </v-btn>
            <v-btn
              ml="8"
              prepend-icon="mdi-restore"
              @click="filterForm = { ...filterFormReset }"
            >
              重置
            </v-btn>
          </div>
        </div>
      </div>
    </Collapse>

    <div relative overflow-x-auto border>
      <v-overlay v-model="loading" contained flex items-center justify-center>
        <v-progress-circular
          indeterminate
          color="primary"
          :size="50"
          :width="4"
        ></v-progress-circular>
      </v-overlay>
      <TicketsTable
        :data="data?.data"
        min-w-128
        @click-edit="e => (dialog = { open: true, action: 'edit', ticket: e })"
      ></TicketsTable>
    </div>

    <TicketDialog
      v-model="dialog.open"
      :action="dialog.action"
      :data="dialog.ticket"
      @modify="refresh"
    ></TicketDialog>
  </div>
</template>

<style scoped></style>
