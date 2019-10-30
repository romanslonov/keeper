<template>
  <div class="home">
    <h2 class="mb-3">
      Recent files
    </h2>

    <v-files-grid :uploadable="false" :files="files" />

    <v-drag />
  </div>
</template>

<script>
import VDrag from '~/components/Drag'
import VFilesGrid from '~/components/FilesGrid'
export default {
  meta: {
    requiredAuth: true
  },
  components: {
    VFilesGrid,
    VDrag
  },
  asyncData: async ({ store, $axios }) => {
    const { files } = await $axios.$get('/files/')
    return {
      files
    }
  },
  methods: {}
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 64px);
}
</style>
