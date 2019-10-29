<template>
  <div class="upload">
    <input ref="inputUpload" name="uploadarea" type="file" multiple hidden>
    <button class="upload__button" @click="$refs.inputUpload.click()">
      <span class="upload__title">
        Upload file
      </span>
      <span class="upload__paragraph">
        or Drop files here
      </span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Upload',
  data () {
    return {
      files: []
    }
  },
  computed: {},
  mounted () {
    this.$refs.inputUpload.addEventListener('change', this.onChange)
  },
  beforeDestroy () {
    this.$refs.inputUpload.removeEventListener('change', this.onChange)
  },
  methods: {
    onChange (e) {
      this.files = [...e.target.files]

      this.files.forEach(file => this.upload(file))
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

          this.files = []
        })
        .catch(err => window.console.error(err))
    }
  }
}
</script>

<style scoped>
.upload__button {
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  width: 100%;
  height: 100%;
  border: 1px dashed var(--border-color);
  outline: none;
  border-radius: 4px;
  padding: 16px 0;
}
.upload__button:hover,
.upload__button:focus {
  border-color: var(--primary);
}
.upload__title {
  font-size: 20px;
  display: block;
  font-weight: bold;
  margin-bottom: 4px;
}
.upload__paragraph {
  font-size: 14px;
  color: var(--text-secondary);
}
</style>
