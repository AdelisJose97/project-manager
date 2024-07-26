<script setup>
const isVisible = defineModel('isVisible', { required: true })

const emit = defineEmits(['close'])

const handleClose = () => {
  emit('close')
}

defineProps({
  title: String,
})
</script>
<template>
  <q-dialog @hide="handleClose" v-model="isVisible" backdrop-filter="blur(4px)">
    <q-card class="card">
      <q-card-section class="row items-center q-pb-none text-h6">
        {{ title }}
      </q-card-section>

      <q-card-section>
        <slot />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.card {
  width: 400px;
  max-width: 85%;
}
</style>
