import { serverSupabaseServiceRole } from '#supabase/server';

export default defineEventHandler(async event => {
  const client = serverSupabaseServiceRole(event);
  const body = await readBody(event);
  const { amount, name, description } = body;
  const { data, error } = await client
    .from('tickets')
    .update({ amount, name, description } as never)
    .eq('id', event.context.params.id)
    .select();

  if (!data || data.length === 0) {
    throw createError({
      statusCode: 404
    });
  }

  if (error) {
    throw createError({
      statusCode: 400
    });
  }

  return { data };
});
