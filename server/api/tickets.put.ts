export default defineEventHandler(async event => {
  const body = await readBody(event);

  const unusedTickets: any[] =
    (await useStorage().getItem('fs:tickets/unused')) ?? [];

  for (let x = 1; x <= body.amount; ++x) {
    unusedTickets.push(Math.floor(Math.random() * 32768));
  }

  await useStorage().setItem('fs:tickets/unused', unusedTickets);

  return { result: 'success' };
});
