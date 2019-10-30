<template>
  <div v-if="files.length > 0" class="files-grid">
    <upload v-if="uploadable" @uploaded="onUpload" />
    <file
      v-for="file in sortedFiles"
      :key="file.id"
      :file="file"
      :active="isActive(file)"
      :selectable="selectable"
      @select="onSelect"
    />
  </div>
  <div v-else class="files-empty">
    <font-awesome-icon class="files-empty__icon" :icon="['fas', 'file-upload']" />
    <h1 class="files-empty__title">
      Drop files here
    </h1>
    <p class="files-empty__paragraph">
      to start uploading them
    </p>
  </div>
</template>

<script>
import Upload from '~/components/Upload.vue'
import File from '~/components/File.vue'
export default {
  name: 'FilesGrid',
  components: { File, Upload },
  props: {
    files: {
      type: Array,
      default: () => []
    },
    uploadable: {
      type: Boolean,
      default: true
    },
    selectable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      selected: []
    }
  },
  computed: {
    sortedFiles () {
      const { files } = this
      return files.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
    }
  },
  methods: {
    onSelect (event, file) {
      if (event.target.checked) {
        this.selected.push(file)
      } else {
        this.selected = this.selected.filter(s => s.id !== file.id)
      }

      this.$emit('select', this.selected)
    },
    onUpload (files) {
      this.$emit('upload', files)
    },
    isActive (file) {
      return this.selected.includes(file)
    }
  }
}
</script>

<style scoped>
.files-grid {
  --grid-item-size: 200px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--grid-item-size), 1fr));
  grid-gap: 16px;
}
.files-empty {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  min-height: 100%
}
.files-empty__icon {
  font-size: 50px;
  margin-bottom: 16px;
  color: var(--primary);
}
.files-empty__title {
  margin-bottom: 8px;
}
.files-empty__paragraph {
  color: var(--text-secondary);
}
</style>
