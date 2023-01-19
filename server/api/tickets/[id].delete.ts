import { serverSupabaseServiceRole } from '#supabase/server';

export default defineEventHandler(async event => {
  const client = serverSupabaseServiceRole(event);
  const { data, error } = await client
    .from('tickets')
    .delete()
    .eq('id', event.context.params.id)
    .select();

  if (!data) {
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
