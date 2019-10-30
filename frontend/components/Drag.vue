<template>
  <div class="drag">
    <div class="drag__drop" :class="{ 'is-dragging': isDragging }">
      <div class="drag__text">
        Drop files to upload
      </div>
    </div>
  </div>
</template>

<script>
// import VButton from '@/components/Button'
export default {
  name: 'Drag',
  // components: { VButton },
  data () {
    return {
      isDragging: false
    }
  },
  computed: {},
  mounted () {
    document.body.addEventListener('dragover', this.handleDragOver)
    document.body.addEventListener('dragleave', this.handleDragLeave)
    document.body.addEventListener('drop', this.handleDrop)
    document.body.addEventListener('paste', this.handlePaste, false)
  },
  beforeDestroy () {
    document.body.removeEventListener('dragover', this.handleDragover)
    document.body.removeEventListener('dragleave', this.handleDragLeave)
    document.body.removeEventListener('drop', this.handleDrop)
    document.body.removeEventListener('paste', this.handlePaste, false)
  },
  methods: {
    handleDragOver (e) {
      e.preventDefault()
      e.stopPropagation()

      this.isDragging = true

      return false
    },
    handleDragLeave (e) {
      this.isDragging = false
    },
    handleDrop (e) {
      e.preventDefault()
      e.stopPropagation()

      const files = [...e.dataTransfer.files]

      if (files.length > 0) {
        files.forEach(file => this.upload(file))
      }

      this.isDragging = false

      return false
    },
    handlePaste (pasteEvent) {
      const items = [
        ...(event.clipboardData || event.originalEvent.clipboardData).items
      ]
        .filter(item => item.type.includes('image'))
        .map(item => item.getAsFile())

      if (items.length > 0) {
        this.items.forEach(item => this.upload(item))
      }
    },
    upload (file) {
      const data = new FormData()

      data.append('files', file)

      const id = this.$store.getters['queue/queue'].length + 1

      this.$store.commit('queue/add', {
        id,
        name: file.name,
        progress: 0
      })

      return this.$axios.$post(`/boards/${this.$route.params.id}/files/`, data, {
        onUploadProgress: (progressEvent) => {
          this.$store.commit('queue/update', {
            id,
            progress: Math.round((progressEvent.loaded * 100) / progressEvent.total)
          })
          progressEvent.progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        }
      })
        .then(({ files }) => {
          this.$emit('uploaded', files)
        })
        .catch(err => window.console.error(err))
    }
  }
}
</script>

<style>
.drag__drop {
    display: none;
    align-items: center;
    justify-content: center;
    position: fixed;
    pointer-events: none;
    top: 0;
    left: 0;
    right: 0;
    height: 100vh;
    border: 2px dashed var(--primary);
    background-color: rgba(11, 120, 255, 0.2);
    z-index: 111;
}

.drag__drop.is-dragging {
    display: flex;
}

.drag__text {
    font-size: 20px;
    background-color: var(--primary);
    color: white;
    padding: 16px;
    border-radius: 4px;
}
</style>
