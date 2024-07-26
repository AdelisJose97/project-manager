<script setup>
import Modal from 'src/components/AppModal.vue'
import Search from 'src/components/AppSearch.vue'
import TasksList from 'src/components/TasksList.vue'
import { computed, onMounted, ref } from 'vue'
import { useTasksStore } from 'src/stores/tasks-store'
import TaskForm from 'src/components/TaskForm.vue'
import { useQuasar } from 'quasar'
import { useRoute } from 'vue-router'
import { taskOptions } from 'src/helpers/constants'
import Select from 'src/components/AppSelect.vue'

const route = useRoute()

const useTasks = useTasksStore()
const { addTask, editTask, deleteTask, getTasksByProjectId } = useTasks

const $q = useQuasar()

const showModal = ref(false)
const taskToEdit = ref(null)
const tasksByProject = ref([])
const searchQuery = ref('')
const taskFilters = ref('')

const getTasks = () => {
  const tasksByProjectId = getTasksByProjectId(route.params.id)
  tasksByProject.value = tasksByProjectId
}

const toggleModal = () => {
  showModal.value = !showModal.value
}

const closeModal = () => {
  if (taskToEdit.value) {
    taskToEdit.value = null
  }
  showModal.value = false
}

const handleSaveTask = (task) => {
  if (taskToEdit.value) {
    editTask(task)
  } else {
    addTask(task)
  }

  showModal.value = false
  getTasks()
}

const handleEditTask = (task) => {
  taskToEdit.value = task
  toggleModal()
}

const handleDeleteTask = (projectId) => {
  $q.dialog({
    title: 'Delete task',
    message: 'Are you sure you want to delete this task?',
    ok: 'Delete',
    cancel: 'Cancel',
  }).onOk(() => {
    deleteTask(projectId)
    getTasks()
  })
}

const filteredTasks = computed(() => {
  return tasksByProject?.value.filter(
    (task) =>
      task.name.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
      (taskFilters.value ? task.status === taskFilters.value : true)
  )
})

const countTasksByStatus = (status) => {
  return computed(() => {
    return tasksByProject.value.filter((task) => task.status === status).length
  })
}

onMounted(() => {
  getTasks()
})
</script>

<template>
  <q-page class="tasks-page">
    <section class="top">
      <div class="actions">
        <div>
          <q-btn
            title="Add new task"
            rounded
            color="primary"
            icon="add"
            @click="toggleModal"
          />
          <Search label="Search task" v-model="searchQuery" />
        </div>
        <div class="filter-container">
          <Select v-model="taskFilters" :options="taskOptions" />
        </div>
      </div>
      <div class="indicators">
        <q-chip color="info" text-color="white" icon="hourglass_empty">
          <q-badge floating color="red" rounded>
            {{ countTasksByStatus('Pending') }}
          </q-badge>
          Pending
        </q-chip>
        <q-chip color="secondary" text-color="white" icon="hourglass_full">
          <q-badge floating color="red" rounded>
            {{ countTasksByStatus('In Progress') }}
          </q-badge>
          In Progress
        </q-chip>
        <q-chip color="positive" text-color="white" icon="check_circle">
          <q-badge floating color="red" rounded>
            {{ countTasksByStatus('Completed') }}
          </q-badge>
          Completed
        </q-chip>
      </div>
    </section>

    <template v-if="tasksByProject.length === 0">
      <div class="no-tasks">
        <h3>No tasks available</h3>
      </div>
    </template>

    <template v-else-if="filteredTasks.length === 0">
      <div class="no-tasks">
        <h3>No tasks match the search criteria</h3>
      </div>
    </template>
    <template v-else>
      <TasksList
        :tasks="filteredTasks"
        @delete="handleDeleteTask"
        @edit="handleEditTask"
      />
    </template>
  </q-page>
  <Modal title="Task" v-model:isVisible="showModal" @close="closeModal">
    <TaskForm
      :project-id="$route.params.id"
      :task-to-edit="taskToEdit"
      @close="closeModal"
      @save="handleSaveTask"
    />
  </Modal>
</template>

<style scoped>
.tasks-page {
  max-width: 1280px;
  margin: auto;
  padding: 2rem;
  .top {
    display: flex;
    gap: 2rem;
    flex-direction: column;
    position: sticky;
    top: 50px;
    margin: -2rem -2rem 0 -2rem;
    padding: 2rem 2rem 1rem;
    z-index: 99;
    background: #ffffff;
    justify-content: center;
    .filter-container {
      min-width: 200px;
    }
    .actions {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      div:not(.filter-container) {
        display: flex;
        gap: 0.5rem;
      }
    }
  }

  .no-tasks {
    text-align: center;
    h3 {
      font-size: 1.5rem;
    }
  }
}

@media (max-width: 499px) {
  .actions {
    flex-direction: column;

    label {
      width: 100%;
    }
  }
}
</style>
