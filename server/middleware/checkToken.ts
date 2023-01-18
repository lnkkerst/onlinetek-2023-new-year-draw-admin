export default defineEventHandler(async event => {
  if (!event.node.req.url?.startsWith('/api')) {
    return;
  }

  if (event.node.req.url?.startsWith('/api/ticket')) {
    return;
  }

  const token = getHeader(event, 'Authorization');
  if (token !== useRuntimeConfig().token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Authorization Failed'
    });
  }
});
