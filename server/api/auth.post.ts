export default defineEventHandler(event => {
  event.node.res.end();
});
