import { serverSupabaseServiceRole } from '#supabase/server';
import type { Ticket } from '~/utils';

export default defineEventHandler(async event => {
  const client = serverSupabaseServiceRole(event);
  const query = getQuery(event);
  let { page = 1, size = 1000, name } = query;
  page = parseInt(page as string);
  size = parseInt(size as string);

  let select = client.from('tickets').select('*', { count: 'exact' });

  if (name) {
    select = select.eq('name', name);
  }

  select = select.range((page - 1) * size, page * size - 1);

  const { data, count } = await select;
  return { count: count as number, data: data as Ticket[] };
});
