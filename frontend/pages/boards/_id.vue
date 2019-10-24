<template>
  <div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
      <h2 class="mb-3">
        Board: {{ board && board.name }}
      </h2>

      <div>
        <button :disabled="selected.length === 0" @click="moveImages">
          Move ({{ selected.length }})
        </button>

        <select v-if="selected.length > 0" v-model="move.id" name="boards">
          <option v-for="b in boards" :key="b.id" :value="b.id">
            {{ b.name }}
          </option>
        </select>

        <button :disabled="selected.length === 0" @click="removeImages">
          Delete ({{ selected.length }})
        </button>
      </div>
    </div>

    <!-- <S3 @uploaded="onUpload" /> -->

    <drag @uploaded="onUpload" />

    <files-grid :files="files" @upload="onUpload" @select="onSelect" />
  </div>
</template>

<script>
import FilesGrid from '~/components/FilesGrid'
import Drag from '~/components/Drag'
export default {
  meta: {
    requiredAuth: true
  },
  name: 'Board',
  components: { FilesGrid, Drag },
  data () {
    return {
      selected: [],

      move: {
        id: 1
      }
    }
  },
  computed: {
    board () {
      return this.$store.getters['board/board']
    },
    boards () {
      return this.$store.getters['boards/boards']
    }
  },
  watch: {
    '$route.params.id' (id) {
      this.$store.dispatch('board/fetch', id)
        .then(() => this.fetchImages())
      this.selected = []
    }
  },
  async asyncData ({ store, $axios, route }) {
    const { id } = route.params
    await store.dispatch('board/fetch', id)
    const { files } = await $axios.$get(`/boards/${id}/files/`)
    return {
      files
    }
  },
  methods: {
    fetchImages () {
      const { id } = this.$route.params
      return this.$axios.$get(`/boards/${id}/files/`)
        .then(({ files }) => {
          this.files = files
        })
    },
    removeImages () {
      return this.$axios.$post(`/boards/${this.$route.params.id}/files/remove/`, { keys: this.selected.map(s => s.key) })
        .then(() => {
          this.files = this.filterFiles(this.selected)
          this.selected = []
        })
    },
    moveImages () {
      return this.$fetch(`/boards/${this.move.id}/files/`, {
        method: 'PUT',
        body: JSON.stringify({ keys: this.selected.map(s => s.key) })
      })
        .then(() => {
          this.files = this.filterFiles(this.selected)
          this.selected = []
        })
    },
    filterFiles (files) {
      return this.files.filter(file => !files.includes(file))
    },
    onUpload (files) {
      this.files = [...this.files, ...files]
    },
    onSelect (selected) {
      this.selected = selected
    }
  }
}
</script>
