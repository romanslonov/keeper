<template>
  <div class="files-grid">
    <upload v-if="uploadable" @uploaded="onUpload" />
    <file
      v-for="file in sortedFiles"
      :key="file.id"
      :file="file"
      :active="isActive(file)"
      @select="onSelect"
    />
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

<style>
.files-grid {
  --grid-item-size: 160px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--grid-item-size), 1fr));
  grid-gap: 32px;
}
</style>
