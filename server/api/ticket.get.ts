export default defineEventHandler(async event => {
  setResponseHeaders(event, {
    'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Expose-Headers': '*'
  });
  if (getMethod(event) === 'OPTIONS') {
    event.node.res.statusCode = 204;
    event.node.res.statusMessage = 'No Content.';
    return 'OK';
  }

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
