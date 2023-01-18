export default defineNuxtRouteMiddleware(to => {
  if (!process.client) {
    return;
  }
  if (to.path === '/login') {
    return;
  }
  if (!useCookie('token').value) {
    useNuxtApp().$toast.fire({ title: '请先进行验证', icon: 'info' });
    return navigateTo('login');
  }
});
