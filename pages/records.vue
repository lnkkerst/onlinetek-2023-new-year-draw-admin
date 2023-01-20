<script setup lang="ts">
import type { TicketRecord } from '~~/utils';

const { $toast } = useNuxtApp();

const collapse = ref(true);
const loading = ref(false);
const emptyOutDialog = ref(false);
const emptying = ref(false);
const filterReset = {
  visitorId: '',
  code: '',
  ticketId: '',
  validity: {
    valid: true,
    invalid: true
  },
  redeem: {
    redeemed: true,
    notRedeemed: true
  }
};
const filter = ref({
  ...filterReset
});
const tickets = await useFetch('/api/tickets').then(res =>
  res.data.value?.data.map(val => ({ name: val.name, id: val.id }))
);
const data = ref<TicketRecord[]>([]);

const fetchFilteredData = async <
  T extends { count: number; data: TicketRecord[] }
>(): Promise<T> => {
  const {
    visitorId,
    code,
    ticketId,
    validity: { valid, invalid },
    redeem: { redeemed, notRedeemed }
  } = filter.value;
  return (await $fetch('/api/records', {
    query: {
      visitorId,
      code,
      ticketId,
      valid,
      invalid,
      redeemed,
      notRedeemed
    }
  })) as any as T;
};
const handleEmptyOut = async () => {
  emptying.value = true;
  try {
    await $fetch('/api/records', { method: 'delete' });
    $toast.fire({ title: '清空成功', icon: 'success' });
    data.value = await $fetch('/api/records').then((res: any) => res.data);
  } catch (_e) {
    $toast.fire({ title: '清空失败，未知错误', icon: 'error' });
  }
  emptying.value = false;
};
const refresh = async () => {
  loading.value = true;
  data.value = (await fetchFilteredData()).data;
  loading.value = false;
};

onMounted(async () => {
  refresh();
});
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

      <div grow></div>

      <v-tooltip text="清空" location="bottom">
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            color="error"
            icon="mdi-delete"
            size="small"
            @click="emptyOutDialog = true"
          ></v-btn>
        </template>
      </v-tooltip>
      <v-btn
        ml-2
        icon="mdi-refresh"
        color="secondary"
        size="small"
        @click="refresh"
      ></v-btn>
    </div>

    <v-dialog v-model="emptyOutDialog" max-w-xl>
      <v-card>
        <v-card-title>高危操作</v-card-title>
        <v-card-text>确定要清空所有抽奖记录吗？</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            color="error"
            :loading="emptying"
            @click="
              async () => {
                await handleEmptyOut();
                emptyOutDialog = false;
              }
            "
          >
            确定
          </v-btn>
          <v-btn text @click="emptyOutDialog = false">取消</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <Collapse :collapse="collapse" my="2">
      <div p="6" m="1" shadow rounded>
        <v-text-field v-model="filter.visitorId" label="访客 ID"></v-text-field>
        <v-text-field v-model="filter.code" label="中奖号码"></v-text-field>

        <v-select
          v-model="filter.ticketId"
          label="奖品"
          item-title="name"
          item-value="id"
          :items="tickets"
        ></v-select>

        <v-row items-center px="8">
          <div w="30">合法性：</div>
          <v-checkbox
            v-model="filter.validity.valid"
            color="primary"
            label="合法"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="filter.validity.invalid"
            color="primary"
            label="不合法"
            hide-details
          ></v-checkbox>
        </v-row>

        <v-row items-center px="8">
          <div w="30">是否兑换：</div>
          <v-checkbox
            v-model="filter.redeem.redeemed"
            color="primary"
            label="已兑换"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="filter.redeem.notRedeemed"
            color="primary"
            label="未兑换"
            hide-details
          ></v-checkbox>
        </v-row>

        <div mt="6" grid place-items-center>
          <div>
            <v-btn
              mr="8"
              color="primary"
              prepend-icon="mdi-check"
              @click="refresh"
            >
              应用
            </v-btn>
            <v-btn
              ml="8"
              prepend-icon="mdi-restore"
              @click="filter = { ...filterReset }"
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
      <RecordsTable :data="data" min-w-128></RecordsTable>
    </div>
  </div>
</template>

<style scoped></style>
