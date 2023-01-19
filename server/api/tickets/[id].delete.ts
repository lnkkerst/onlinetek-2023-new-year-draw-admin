import { serverSupabaseServiceRole } from '#supabase/server';

export default defineEventHandler(async event => {
  const client = serverSupabaseServiceRole(event);
  const { data, error } = await client
    .from('tickets')
    .delete()
    .eq('id', event.context.params.id)
    .select();

  if (error) {
    if (error.code === '23503') {
      throw createError({
        statusCode: 409,
        message: "Can't delete"
      });
    }
    throw createError({
      statusCode: 400
    });
  }

  if (!data) {
    throw createError({
      statusCode: 404
    });
  }

  return { data };
});
