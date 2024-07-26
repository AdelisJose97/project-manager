<script setup>
const emit = defineEmits(['delete', 'edit'])

defineProps({
  task: Object,
})

const classByStatus = {
  Pending: 'bg-info',
  'In Progress': 'bg-secondary',
  Completed: 'bg-positive',
}

const handleEdit = (taskId) => {
  emit('edit', taskId)
}

const handleDelete = (taskId) => {
  emit('delete', taskId)
}
</script>

<template>
  <q-card bordered class="task-card">
    <div
      class="task-status-indicator"
      :class="classByStatus[task?.status] || 'bg-info'"
    ></div>
    <q-card-section class="card-content">
      <div class="title text-h6">{{ task.name }}</div>
      <div class="description text-subtitle2">{{ task.description }}</div>
      <span class="text-subtitle3">{{ task.status }}</span>
    </q-card-section>

    <q-separator inset />

    <q-card-actions class="card-actions" align="left">
      <q-btn
        padding="4px 8px"
        rounded
        title="Edit task"
        color="primary"
        icon="edit"
        @click="handleEdit(task)"
      />
      <q-btn
        padding="4px 8px"
        rounded
        title="Delete task"
        color="negative"
        icon="delete"
        @click="handleDelete(task.id)"
      />
    </q-card-actions>
  </q-card>
</template>

<style scoped>
.task-card {
  position: relative;
  overflow: hidden;
  border-radius: 28px;
  height: 100%;
  display: flex;
  flex-direction: column;
  .card-content {
    flex: 1;
    padding-right: 2rem;
  }

  .task-status-indicator {
    height: 128px;
    width: 128px;
    z-index: 1;
    position: absolute;
    top: -80px;
    right: -80px;
    border-radius: 50%;
  }
}
.title,
.description {
  text-wrap: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
