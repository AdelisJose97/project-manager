<script setup>
import { ref, defineProps, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const selectedOption = ref(props.modelValue)

watch(selectedOption, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>

<template>
  <q-select
    v-model="selectedOption"
    :options="options"
    clearable
    rounded
    outlined
    dense
    label="Filter by status"
  />
</template>
