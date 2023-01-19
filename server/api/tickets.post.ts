import { serverSupabaseServiceRole } from '#supabase/server';

export default defineEventHandler(async event => {
  const client = serverSupabaseServiceRole(event);
  const body = await readBody(event);
  const { amount, name, description } = body;
  const { data, error } = await client
    .from('tickets')
    .insert({ amount, name, description } as never)
    .select();

  if (error) {
    throw createError({
      statusCode: 400
    });
  }

  return { data };
});
