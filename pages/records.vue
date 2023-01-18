<script setup lang="ts">
import type { TicketRecord } from '~~/utils';

const { data: ticketRecords } = useFetch('/api/records', {
  headers: { Authorization: useCookie('token').value as string }
});
</script>

<template>
  <div>
    <RecordsTable :data="ticketRecords"></RecordsTable>
  </div>
</template>

<style scoped></style>
