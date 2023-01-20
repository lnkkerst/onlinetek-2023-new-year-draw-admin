import { serverSupabaseServiceRole } from '#supabase/server';
import type { Ticket } from '~/utils';
import { checkVisitorId } from '~/server/utils/checkVisitorId';

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

  const client = serverSupabaseServiceRole(event);

  const { visitorId } = getQuery(event);

  const { data: inDb } = await client
    .from('records')
    .select(
      `
code,
ticket (
name,
description
)
`
    )
    .eq('visitorId', visitorId)
    .limit(1)
    .single();

  if (inDb) {
    const {
      code,
      ticket: { name, description }
    } = inDb as any;
    return {
      result: 'success',
      data: {
        code,
        name,
        description
      }
    };
  }

  const { data } = (await client.from('tickets').select().gt('amount', 0)) as {
    data: Ticket[] | null;
  };

  if (!data || data.length === 0) {
    return { result: 'faild', message: 'No tickets :(' };
  }

  const code = Array.from(
    { length: 6 },
    () =>
      'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM012345678978318731'[
        Math.floor(Math.random() * 26 * 2 + 10)
      ]
  ).join('');

  const valid = !!visitorId && checkVisitorId(visitorId);

  let total = 0;
  data.forEach(val => (total += val.amount));
  const resultIndex = Math.floor(Math.random() * total);
  let cur = 0;
  let result: Ticket | undefined;
  for (const item of data) {
    cur += item.amount;
    if (cur >= resultIndex) {
      result = item;
      break;
    }
  }
  if (!result) {
    result = data.at(-1) as Ticket;
  }

  if (valid) {
    await client
      .from('tickets')
      .update({ amount: result.amount - 1 } as never)
      .eq('id', result.id);
  }

  await client
    .from('records')
    .insert({ visitorId, ticket: result.id, code, valid } as never);

  return {
    result: 'success',
    data: {
      code,
      name: result.name,
      description: result.description
    }
  };
});
