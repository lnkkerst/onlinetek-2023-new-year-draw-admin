<script setup lang="ts">
const props = withDefaults(defineProps<{ collapse?: boolean }>(), {
  collapse: true
});

const content = ref<HTMLElement>();

const style = ref({});
watch(
  () => props.collapse,
  val => {
    style.value = val
      ? { maxHeight: '0' }
      : { maxHeight: `${content.value?.scrollHeight}px` };
  }
);

onMounted(() => {
  style.value = props.collapse
    ? { maxHeight: '0' }
    : { maxHeight: `${content.value?.scrollHeight}px` };
});
</script>

<template>
  <div
    ref="content"
    transition-all
    overflow-hidden
    duration="300"
    :style="style"
  >
    <slot />
  </div>
</template>

<style scoped></style>
