import { serverSupabaseServiceRole } from '#supabase/server';
import type { TicketRecord } from '~/utils';

export default defineEventHandler(async event => {
  const client = serverSupabaseServiceRole(event);
  const query = getQuery(event);
  let { page = 1, size = 20 } = query;
  page = parseInt(page as string);
  size = parseInt(size as string);
  const { data, count } = await client
    .from('records')
    .select('*', { count: 'exact' })
    .range((page - 1) * size, page * size - 1);

  return { count: count as number, data: data as TicketRecord[] };
});
