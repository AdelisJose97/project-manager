import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useTasksStore } from './tasks-store'
import { useQuasar } from 'quasar'

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref([])
  const $q = useQuasar()

  const localProjects = localStorage.getItem('projects')
  if (localProjects) {
    projects.value = JSON.parse(localProjects)
  }

  const addProject = (project) => {
    try {
      projects.value.push(project)
      localStorage.setItem('projects', JSON.stringify(projects.value))
      $q.notify({
        type: 'positive',
        message: 'Project added successfully',
      })
    } catch (error) {
      $q.notify({
        type: 'negative',
        message: 'Error adding project',
      })
    }
  }

  const deleteProject = (projectId) => {
    try {
      projects.value = projects.value.filter(
        (project) => project.id !== projectId
      )
      localStorage.setItem('projects', JSON.stringify(projects.value))

      const tasksStore = useTasksStore()
      tasksStore.deleteTasksByProjectId(projectId)

      $q.notify({
        type: 'positive',
        message: 'Project deleted successfully',
      })
    } catch (error) {
      $q.notify({
        type: 'negative',
        message: 'Error deleting project',
      })
    }
  }

  const editProject = (editedProject) => {
    try {
      const index = projects.value.findIndex(
        (project) => project.id === editedProject.id
      )
      if (index === -1) {
        $q.notify({
          type: 'negative',
          message: 'Error editing project: Project not found',
        })
        return
      }

      projects.value[index] = editedProject
      localStorage.setItem('projects', JSON.stringify(projects.value))

      $q.notify({
        type: 'positive',
        message: 'Project edited successfully',
      })
    } catch (error) {
      $q.notify({
        type: 'negative',
        message: 'Error editing project',
      })
    }
  }

  return {
    projects,
    addProject,
    editProject,
    deleteProject,
  }
})
