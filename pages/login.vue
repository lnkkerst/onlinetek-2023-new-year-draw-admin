<script setup lang="ts">
definePageMeta({
  layout: 'empty'
});

const { $toast } = useNuxtApp();

const token = ref('');
const logining = ref(false);

const handleLogin = async () => {
  logining.value = true;
  try {
    await $fetch('/api/auth', {
      method: 'post',
      headers: { Authorization: token.value }
    });
    useCookie('token').value = token.value;
    $toast.fire({ title: '登陆成功', icon: 'success' });
    useRouter().push('/jackpot');
  } catch (e) {
    if ((e as any).statusCode === 401) {
      $toast.fire({ title: 'Token 不正确', icon: 'error' });
    } else {
      $toast.fire({ title: '未知错误', icon: 'error' });
    }
  } finally {
    logining.value = false;
  }
};
</script>

<template>
  <div grid place-items="center" h-screen w-screen>
    <v-card min-w="96">
      <v-card-title text-center mt="4">验证</v-card-title>

      <v-card-text>
        <v-text-field v-model="token" label="Token"></v-text-field>
        <div grid place-items="center" mb="4">
          <v-btn
            color="primary"
            variant="outlined"
            :loading="logining"
            @click="handleLogin"
          >
            登录
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped></style>
