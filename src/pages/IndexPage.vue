<script setup>
import { computed, ref } from 'vue'
import ProjectList from 'components/ProjectList.vue'
import Search from 'components/AppSearch.vue'
import Modal from 'components/AppModal.vue'
import ProjectForm from 'components/ProjectForm.vue'
import { useProjectsStore } from 'src/stores/projects-store'
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
import Select from 'src/components/AppSelect.vue'
import { projectOptions } from 'src/helpers/constants'

defineOptions({
  name: 'IndexPage',
})

const useProjects = useProjectsStore()
const { projects } = storeToRefs(useProjects)
const { addProject, editProject, deleteProject } = useProjects

const $q = useQuasar()

const showModal = ref(false)
const projectToEdit = ref(null)
const searchQuery = ref('')
const projectFilters = ref('')

const toggleModal = () => {
  showModal.value = !showModal.value
}

const closeModal = () => {
  if (projectToEdit.value) {
    projectToEdit.value = null
  }
  showModal.value = false
}

const handleSaveProject = (project) => {
  if (projectToEdit.value) {
    editProject(project)
  } else {
    addProject(project)
  }
  showModal.value = false
}

const handleEditProject = (project) => {
  projectToEdit.value = project
  toggleModal()
}

const handleDeleteProject = (projectId) => {
  $q.dialog({
    title: 'Delete project',
    message: 'Are you sure you want to delete this project?',
    ok: 'Delete',
    cancel: 'Cancel',
  }).onOk(() => {
    deleteProject(projectId)
  })
}

const filteredProjects = computed(() => {
  return projects?.value.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
      (projectFilters.value ? project.status === projectFilters.value : true)
  )
})
</script>

<template>
  <q-page class="projects-page">
    <section class="top">
      <div>
        <q-btn
          title="Add new project"
          color="primary"
          icon="add"
          rounded
          @click="toggleModal"
        />

        <Search label="Search project" v-model="searchQuery" />
      </div>

      <div class="filter-container">
        <Select v-model="projectFilters" :options="projectOptions" />
      </div>
    </section>

    <template v-if="projects.length === 0">
      <div class="no-projects">
        <h3>No projects available</h3>
      </div>
    </template>

    <template v-else-if="filteredProjects.length === 0">
      <div class="no-projects">
        <h3>No projects match the search criteria</h3>
      </div>
    </template>
    <template v-else>
      <ProjectList
        :projects="filteredProjects"
        @delete="handleDeleteProject"
        @edit="handleEditProject"
      />
    </template>
  </q-page>
  <Modal title="Project" v-model:isVisible="showModal" @close="closeModal">
    <ProjectForm
      :projectToEdit="projectToEdit"
      @close="closeModal"
      @save="handleSaveProject"
    />
  </Modal>
</template>

<style scoped>
.projects-page {
  max-width: 1280px;
  margin: auto;
  padding: 2rem;
  .top {
    position: sticky;
    top: 50px;
    margin: -2rem -2rem 0 -2rem;
    padding: 2rem 2rem 1rem;
    z-index: 99;
    background: #ffffff;
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    .filter-container {
      min-width: 200px;
    }
    div:not(.filter-container) {
      display: flex;
      gap: 0.5rem;
    }
  }

  .no-projects {
    text-align: center;
    h3 {
      font-size: 1.5rem;
    }
  }
}

@media (max-width: 499px) {
  .top {
    flex-direction: column;

    label {
      width: 100%;
    }
  }
}
</style>
