<template>
  <div class="board">
    <div class="board__header">
      <h2>
        Board: {{ board && board.name }}
      </h2>

      <div v-if="selected.length > 0" class="board-actions">
        <v-button
          class="board-actions__item"
          size="1"
          appearance="icon"
          @click="removeImages"
        >
          <font-awesome-icon style="font-size: 16px;" :icon="['fas', 'file-import']" />
        </v-button>

        <v-button
          class="board-actions__item"
          size="1"
          appearance="icon"
          @click="removeImages"
        >
          <font-awesome-icon style="font-size: 16px;" :icon="['fas', 'trash-alt']" />
        </v-button>
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
import VButton from '~/components/Button'
export default {
  meta: {
    requiredAuth: true
  },
  name: 'Board',
  components: { FilesGrid, Drag, VButton },
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

<style scoped>
.board {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 64px);
}
.board__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.board-actions {
  display: flex;
  align-items: center;
}
.board-actions__item {
  margin-left: 8px;
}
</style>
