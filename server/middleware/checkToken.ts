export default defineEventHandler(async event => {
  if (!event.node.req.url?.startsWith('/api')) {
    return;
  }

  const exclude = ['/api/ticket', '/api/ticket/', '/api/auth'];

  if (exclude.includes(event.node.req.url.split('?')[0])) {
    return;
  }

  const token = getCookie(event, 'token');
  if (token !== useRuntimeConfig().token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Authorization Failed'
    });
  }
});
