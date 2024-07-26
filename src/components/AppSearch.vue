<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const searchQuery = ref(props.modelValue)

watch(searchQuery, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>

<template>
  <q-input
    dense
    rounded
    outlined
    color="primary"
    debounce="300"
    :placeholder="label"
    v-model="searchQuery"
  >
    <template v-slot:append>
      <q-icon name="search" />
    </template>
  </q-input>
</template>
