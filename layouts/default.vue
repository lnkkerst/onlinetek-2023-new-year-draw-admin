<script setup lang="ts">
const tabs = [
  { routeName: 'jackpot', label: '奖池' },
  { routeName: 'records', label: '记录' }
];
const currentTab = ref<null | string>();

onMounted(() => {
  currentTab.value = useRoute().path.split('/').at(-1);
});
</script>

<template>
  <v-app>
    <v-app-bar app extended color="primary">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>学线新年抽签——后台</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

      <template #extension>
        <v-tabs v-model="currentTab">
          <NuxtLink
            v-for="item in tabs"
            :key="JSON.stringify(item)"
            :to="item.routeName"
          >
            <v-tab :value="item.routeName">
              {{ item.label }}
            </v-tab>
          </NuxtLink>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>

    <v-snackbar></v-snackbar>
  </v-app>
</template>

<style scoped></style>
