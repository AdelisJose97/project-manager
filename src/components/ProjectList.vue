<script setup>
import SingleProject from './SingleProject.vue'

const props = defineProps(['projects'])
const emit = defineEmits(['edit', 'delete'])

const handleDelete = (projectId) => {
  emit('delete', projectId)
}

const handleEdit = (projectId) => {
  emit('edit', projectId)
}
</script>

<template>
  <section class="project-list-container">
    <div v-for="project in projects" :key="project.id">
      <SingleProject
        @edit="handleEdit"
        @delete="handleDelete"
        :project="project"
      />
    </div>
  </section>
</template>

<style scoped>
.project-list-container {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 24px;
  gap: 24px;
}
.card-actions {
  display: flex;
  justify-content: center;
}
</style>
