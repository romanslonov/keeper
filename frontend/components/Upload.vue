<template>
  <div class="upload">
    <input ref="inputUpload" name="uploadarea" type="file" multiple hidden>
    <button class="upload__button" @click="$refs.inputUpload.click()">
      Upload file
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

      this.upload(this.files)
    },
    upload () {
      const data = new FormData()

      this.files.forEach(file => data.append('files', file))

      return this.$axios.$post(`/boards/${this.$route.params.id}/files/`, data)
        .then(({ files }) => {
          this.$emit('uploaded', files)

          this.files = []
        })
        .catch(err => window.console.error(err))
    }
  }
}
</script>

<style>
.upload__button {
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  width: 100%;
  height: 100%;
  border: 2px dashed var(--border-color);
  outline: none;
}
.upload__button:hover,
.upload__button:focus {
  border-color: var(--primary);
}
</style>
