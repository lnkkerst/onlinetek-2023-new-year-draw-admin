export default defineEventHandler(async event => {
  const { token } = await readBody(event);
  if (token === useRuntimeConfig().token.toString()) {
    return 'ok';
  }
  throw createError({
    statusCode: 401
  });
});
