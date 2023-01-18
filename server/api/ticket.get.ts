export default defineEventHandler(async () => {
  const unusedTickets: any[] =
    (await useStorage().getItem('fs:tickets/unused')) ?? [];
  if (unusedTickets.length === 0) {
    return {
      result: 'faild, no tickets :('
    };
  }

  const usedTickets: any[] =
    (await useStorage().getItem('fs:tickets/used')) ?? [];

  usedTickets.push(...unusedTickets.splice(unusedTickets.length - 1));

  await useStorage().setItem('fs:tickets/unused', unusedTickets);
  await useStorage().setItem('fs:tickets/used', usedTickets);

  const records: any[] = (await useStorage().getItem('fs:records/all')) ?? [];
  records.push({ visitorId: '', ticket: usedTickets.at(-1), valid: true });
  await useStorage().setItem('fs:records/all', records);

  return { result: 'success', data: { code: usedTickets.at(-1) } };
});
