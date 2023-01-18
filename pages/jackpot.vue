<script setup lang="ts">
const { $toast } = useNuxtApp();

const { data, refresh } = await useFetch('/api/tickets', {
  headers: { Authorization: useCookie('token').value as string }
});
const amount = ref(0);

const handleAdd = async () => {
  try {
    $fetch('/api/tickets', {
      method: 'put',
      headers: { Authorization: useCookie('token').value as string },
      body: { amount: amount.value }
    });

    $toast.fire({ title: '添加成功', icon: 'success' });
    await refresh();
  } catch (e) {
    $toast.fire({ title: '添加失败', icon: 'error' });
  }
};
</script>

<template>
  <div>
    <div flex flex-start-right>
      <div grow></div>
      <div w-66>
        <v-text-field
          v-model="amount"
          label="数量"
          type="number"
        ></v-text-field>
      </div>
      <v-btn
        ml-6
        mt-1
        icon="mdi-plus"
        color="primary"
        @click="handleAdd"
      ></v-btn>
    </div>
    <TicketsTable :data="data"></TicketsTable>
  </div>
</template>

<style scoped></style>
