<script setup lang="ts">
const { $toast } = useNuxtApp();

const { state: data } = useAsyncState(
  $fetch('/api/records').then((res: any) => res.data),
  []
);

const handleEmptyOut = async () => {
  try {
    await $fetch('/api/records', { method: 'delete' });
    $toast.fire({ title: '清空成功', icon: 'success' });
    data.value = await $fetch('/api/records').then((res: any) => res.data);
  } catch (_e) {
    $toast.fire({ title: '清空失败，未知错误', icon: 'error' });
  }
};
</script>

<template>
  <div>
    <div flex my="3">
      <div grow></div>
      <v-btn color="error" variant="text" @click="handleEmptyOut">清空</v-btn>
    </div>
    <RecordsTable :data="data"></RecordsTable>
  </div>
</template>

<style scoped></style>
