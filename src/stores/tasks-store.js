import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useProjectsStore } from './projects-store'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref([])
  const $q = useQuasar()

  const localTasks = localStorage.getItem('tasks')
  if (localTasks) {
    tasks.value = JSON.parse(localTasks)
  }

  const addTask = (task) => {
    try {
      const projectsStore = useProjectsStore()
      const existsProject = projectsStore.projects.some((project) => project.id === task.projectId)
      if(!existsProject){
        $q.notify({
          type: 'negative',
          message: 'Project not found'
        })
        return
      }
      tasks.value.push(task)
      localStorage.setItem('tasks', JSON.stringify(tasks.value))
      $q.notify({
        type: 'positive',
        message: 'Task added successfully'
      })
    } catch (error) {
      $q.notify({
        type: 'negative',
        message: 'Error adding task'
      })
    }
  }

  const deleteTask = (id) => {
    try {
      tasks.value = tasks.value.filter((task) => task.id !== id)
      localStorage.setItem('tasks', JSON.stringify(tasks.value))
      $q.notify({
        type: 'positive',
        message: 'Task deleted successfully'
      })
    } catch (error) {
      $q.notify({
        type: 'negative',
        message: 'Error deleting task'
      })
    }
  }

  const editTask = (editedTask) => {
    try {
      const index = tasks.value.findIndex((task) => task.id === editedTask.id)
      if (index === -1) {
        $q.notify({
          type: 'negative',
          message: 'Error editing task: Task not found'
        })
        return
      }

      tasks.value[index] = editedTask
      localStorage.setItem('tasks', JSON.stringify(tasks.value))

      $q.notify({
        type: 'positive',
        message: 'Task edited successfully'
      })
    } catch (error) {
      $q.notify({
        type: 'negative',
        message: 'Error editing task'
      })
    }
  }

  const getTasksByProjectId = (projectId) => {
    try {
      const tasksById = tasks.value.filter((task) => task.projectId === projectId)
      return tasksById
    } catch (error) {
      $q.notify({
        type: 'negative',
        message: 'Error fetching tasks'
      })
      return []
    }
  }

  const deleteTasksByProjectId = (projectId) => {
    try {
      tasks.value = tasks.value.filter((task) => task.projectId !== projectId)
      localStorage.setItem('tasks', JSON.stringify(tasks.value))
      $q.notify({
        type: 'positive',
        message: 'Tasks project deleted successfully'
      })
    } catch (error) {
      $q.notify({
        type: 'negative',
        message: 'Error deleting tasks'
      })
    }
  }

  return {
    tasks,
    addTask,
    deleteTask,
    editTask,
    getTasksByProjectId,
    deleteTasksByProjectId
  }
})
