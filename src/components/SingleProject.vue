<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const emit = defineEmits(['delete', 'edit'])

defineProps({
  project: Object,
})

const handleEdit = (projectId) => {
  emit('edit', projectId)
}

const handleDelete = (projectId) => {
  emit('delete', projectId)
}

const handleManageProject = (projectId) => {
  router.push({ name: 'ProjectTasks', params: { id: projectId } })
}
</script>

<template>
  <q-card bordered class="project-card">
    <q-card-section class="card-content">
      <div class="title text-h6">{{ project.name }}</div>
      <div class="description text-subtitle2">{{ project.description }}</div>
      <span class="text-subtitle3">{{ project.status }}</span>
    </q-card-section>

    <q-separator inset />

    <q-card-actions class="card-actions" align="left">
      <q-btn
        padding="4px 8px"
        rounded
        title="Go to manage project"
        color="info"
        icon="settings"
        @click="handleManageProject(project.id)"
      />
      <q-btn
        padding="4px 8px"
        rounded
        title="Edit project"
        color="primary"
        icon="edit"
        @click="handleEdit(project)"
      />
      <q-btn
        padding="4px 8px"
        rounded
        title="Delete project"
        color="negative"
        icon="delete"
        @click="handleDelete(project.id)"
      />
    </q-card-actions>
  </q-card>
</template>

<style scoped>
.project-card {
  border-radius: 28px;
  height: 100%;
  display: flex;
  flex-direction: column;
  .card-content {
    flex: 1;
  }
}
.title,
.description {
  text-wrap: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
