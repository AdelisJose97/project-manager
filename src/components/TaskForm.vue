<script setup>
import { reactive, computed, toRaw, onMounted } from 'vue'
import { generateId } from 'src/helpers/generateId'
import { Notify } from 'quasar'
import { taskOptions } from 'src/helpers/constants'

const props = defineProps(['taskToEdit', 'projectId'])

const emit = defineEmits(['save', 'close'])

const taskForm = reactive({
  id: generateId(),
  projectId: props.projectId,
  name: '',
  description: '',
  status: '',
})

const isMissingField = computed(() => {
  if (!taskForm.name || !taskForm.description || !taskForm.status) return true

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
  emit('save', toRaw(taskForm))
}

const handleClose = () => {
  emit('close', true)
}

onMounted(() => {
  if (props.taskToEdit) {
    const { taskToEdit } = props
    const { id, name, description, status } = taskToEdit
    taskForm.id = id
    taskForm.name = name
    taskForm.description = description
    taskForm.status = status
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
      v-model="taskForm.name"
      :rules="[(val) => !!val || 'This field is required']"
    />
    <q-input
      dense
      rounded
      outlined
      color="primary"
      placeholder="Description"
      v-model="taskForm.description"
      :rules="[(val) => !!val || 'This field is required']"
    />

    <q-select
      dense
      rounded
      outlined
      v-model="taskForm.status"
      :options="taskOptions"
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
        :label="taskToEdit ? 'Edit' : 'Save'"
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
