<script setup>
import SingleTask from './SingleTask.vue'

defineProps(['tasks'])
const emit = defineEmits(['edit', 'delete'])

const handleDelete = (taskId) => {
  emit('delete', taskId)
}

const handleEdit = (taskId) => {
  emit('edit', taskId)
}
</script>

<template>
  <section class="tasks-list-container">
    <div v-for="task in tasks" :key="task.id">
      <SingleTask @edit="handleEdit" @delete="handleDelete" :task="task" />
    </div>
  </section>
</template>

<style scoped>
.tasks-list-container {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 24px;
  gap: 24px;
}
</style>
