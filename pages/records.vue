<script setup lang="ts">
import type { TicketRecord } from '~~/utils';

const { data } = useFetch('/api/records');
</script>

<template>
  <div>
    <RecordsTable :data="data?.data"></RecordsTable>
  </div>
</template>

<style scoped></style>
