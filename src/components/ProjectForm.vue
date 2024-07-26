<script setup>
import { reactive, computed, toRaw, onMounted } from 'vue'
import { generateId } from 'src/helpers/generateId'
import { Notify } from 'quasar'
import { projectOptions } from 'src/helpers/constants'

const props = defineProps(['projectToEdit'])

const emit = defineEmits(['save', 'close'])

const projectForm = reactive({
  id: generateId(),
  name: '',
  description: '',
  status: '',
})

const isMissingField = computed(() => {
  if (!projectForm.name || !projectForm.description || !projectForm.status)
    return true

  return false
})

const handleSave = () => {
  if (isMissingField.value) {
    Notify.create({
      type: 'negative',
      message: 'Required fields are missing',
    })
    return
  }
  emit('save', toRaw(projectForm))
}

const handleClose = () => {
  emit('close', true)
}

onMounted(() => {
  if (props.projectToEdit) {
    const { projectToEdit } = props
    const { id, name, description, status } = projectToEdit
    projectForm.id = id
    projectForm.name = name
    projectForm.description = description
    projectForm.status = status
  }
})
</script>

<template>
  <div class="form-container">
    <q-input
      dense
      rounded
      outlined
      color="primary"
      placeholder="Name"
      v-model="projectForm.name"
      :rules="[(val) => !!val || 'This field is required']"
    />
    <q-input
      dense
      rounded
      outlined
      color="primary"
      placeholder="Description"
      v-model="projectForm.description"
      :rules="[(val) => !!val || 'This field is required']"
    />

    <q-select
      dense
      rounded
      outlined
      v-model="projectForm.status"
      :options="projectOptions"
      :rules="[(val) => !!val || 'This field is required']"
      label="Status"
    />
    <div class="actions">
      <q-btn
        rounded
        color="white"
        text-color="black"
        label="Close"
        @click="handleClose"
      />
      <q-btn
        rounded
        color="primary"
        :label="projectToEdit ? 'Edit' : 'Save'"
        @click="handleSave"
        :disable="isMissingField"
      />
    </div>
  </div>
</template>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }
}
</style>
