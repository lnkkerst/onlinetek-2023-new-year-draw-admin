import { serverSupabaseServiceRole } from '#supabase/server';

export default defineEventHandler(async event => {
  const client = serverSupabaseServiceRole(event);
  const { error } = await client
    .from('records')
    .delete()
    .neq('id', '0f71529e-ade5-4ae2-8ab0-4feaa8504a6c');

  if (error) {
    throw createError({
      statusCode: 400
    });
  }

  return { result: 'success' };
});
