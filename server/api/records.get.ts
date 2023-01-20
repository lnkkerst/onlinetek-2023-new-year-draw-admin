import { serverSupabaseServiceRole } from '#supabase/server';
import type { TicketRecord } from '~/utils';

export default defineEventHandler(async event => {
  const client = serverSupabaseServiceRole(event);
  const query = getQuery(event);
  let {
    visitorId,
    code,
    ticketId,
    valid,
    invalid,
    redeemed,
    notRedeemed,
    page = 1,
    size = 1000
  } = query;
  page = parseInt(page as string);
  size = parseInt(size as string);
  let select = client.from('records').select(
    `
id,
visitorId,
ticket (
  id,
  name
),
code,
redeemed,
valid
`,
    { count: 'exact' }
  );

  if (visitorId) {
    select = select.eq('visitorId', visitorId);
  }
  if (code) {
    select = select.eq('code', code);
  }

  if (ticketId) {
    select = select.eq('ticket', ticketId);
  }

  if (valid === 'true') {
    if (invalid !== 'true') {
      select = select.eq('valid', true);
    }
  } else if (invalid === 'true') {
    select = select.eq('valid', false);
  }

  if (redeemed === 'true') {
    if (notRedeemed !== 'true') {
      select = select.eq('redeemed', true);
    }
  } else if (notRedeemed === 'true') {
    select = select.eq('redeemed', false);
  }

  select = select.range((page - 1) * size, page * size - 1);

  const { data, count } = await select;
  return { count: count as number, data: data as any as TicketRecord[] };
});
