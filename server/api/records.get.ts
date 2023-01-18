export default defineEventHandler(async () => {
  return await useStorage().getItem('fs:records/all');
});
