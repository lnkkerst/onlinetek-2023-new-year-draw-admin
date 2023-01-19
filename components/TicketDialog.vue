<script setup lang="ts">
import type { Ticket } from '~~/utils';

const props = defineProps<{
  data?: Ticket;
  action: 'edit' | 'add';
  modelValue: boolean;
}>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const emptyForm: Omit<Ticket, 'id' | 'used'> = {
  name: '',
  amount: 0,
  description: ''
};
const form = ref<typeof emptyForm>(
  props.action === 'add' ? { ...emptyForm } : props.data ?? emptyForm
);
const formEl = ref<any>();

watch(
  () => props.modelValue,
  val => {
    if (val) {
      form.value =
        props.action === 'add' ? { ...emptyForm } : props.data ?? emptyForm;
    }
  }
);

const handleAdd = async () => {
  console.log(formEl);
  if (!formEl.value) {
    return;
  }
  const { valid } = await formEl.value?.validate?.();
  console.log(valid);
  if (!valid) {
    return;
  }
  $fetch('/api/tickets', { method: 'post', body: { ...form.value } });
};
const handleEdit = async () => {
  console.log('edi');
};
</script>

<script lang="ts">
export default defineComponent({
  inheritAttrs: false
});
</script>

<template>
  <v-dialog
    :model-value="props.modelValue"
    persistent
    @update:model-value="val => emit('update:modelValue', val)"
  >
    <v-card>
      <v-card-title>
        <span>{{ { add: '添加奖项', edit: '编辑奖项' }[props.action] }}</span>
      </v-card-title>
      {{ form }}
      <v-card-text>
        <v-container>
          <v-form ref="formEl">
            <v-text-field
              v-model="form.name"
              label="名称"
              :rules="[v => !!v || '必须有名称']"
            ></v-text-field>
            <v-text-field
              v-model.number="form.amount"
              type="number"
              label="数量"
              :rules="[
                v =>
                  (v !== '' && v >= 0 && v === parseInt(v)) ||
                  '数量必须是自然数'
              ]"
            ></v-text-field>
            <v-textarea label="描述" placeholder="可以空着"></v-textarea>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          v-if="props.action === 'edit'"
          color="primary"
          @click="handleEdit"
        >
          确认
        </v-btn>
        <v-btn v-if="props.action === 'add'" color="primary" @click="handleAdd">
          添加
        </v-btn>
        <v-btn @click="emit('update:modelValue', false)">取消</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
