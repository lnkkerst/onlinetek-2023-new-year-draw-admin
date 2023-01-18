export default defineEventHandler(async () => {
  const unusedTickets: string[] =
    (await useStorage().getItem('fs:tickets/unused')) ?? [];
  const usedTickets: string[] =
    (await useStorage().getItem('fs:tickets/used')) ?? [];

  return unusedTickets
    .map(val => ({ code: val, used: false }))
    .concat(usedTickets.map(val => ({ code: val, used: true })));
});
