<template>
  <div class="sidebar">
    <main class="sidebar__main">
      <header class="sidebar__header">
        <nuxt-link to="/h">
          <font-awesome-icon :icon="['fas', 'fill']" />
        </nuxt-link>
      </header>

      <section class="sidebar__section">
        <h4 class="sidebar__title">
          Workspace
        </h4>
        <ul class="sidebar-list">
          <li class="sidebar-list__item">
            <nuxt-link to="/h" class="sidebar-list__link">
              <div class="sidebar-list__side">
                <span class="sidebar-list__icon">
                  <font-awesome-icon :icon="['fas', 'archive']" />
                </span>
                <span class="sidebar-list__name">
                  Recent files
                </span>
              </div>
            </nuxt-link>
          </li>
        </ul>
      </section>

      <section class="sidebar__section">
        <h4 class="sidebar__title">
          Boards
        </h4>
        <ul class="sidebar-list">
          <li v-for="board in boards" :key="board.id" class="sidebar-list__item">
            <nuxt-link :to="`/boards/${board.id}/`" class="sidebar-list__link">
              <div class="sidebar-list__side">
                <span class="sidebar-list__icon">
                  <font-awesome-icon :icon="['fas', isBoardActive(board) ? 'folder-open' : 'folder']" />
                </span>
                <span class="sidebar-list__name">
                  {{ board.name }}
                </span>
              </div>
              <div v-if="isCurrentUserOwner(board)" class="sidebar-list__side">
                <v-button size="1" icon appearance="subtle" @click.stop.prevent="onBoardClick('share', board)">
                  <font-awesome-icon style="font-size: 12px;" :icon="['fas', 'share']" />
                </v-button>
                <v-button
                  size="1"
                  icon
                  appearance="subtle"
                  :disabled="boards.length === 1"
                  @click.stop.prevent="onBoardClick('remove', board)"
                >
                  <font-awesome-icon style="font-size: 12px;" :icon="['fas', 'trash-alt']" />
                </v-button>
              </div>
            </nuxt-link>
          </li>
        </ul>
      </section>
    </main>

    <footer class="sidebar__footer">
      <profile-view />
    </footer>

    <modal :open="modals.create" title="Create new board" @close="modals.create = false">
      <form @submit.prevent="createBoard">
        <input v-model="createForm.name" type="text" placeholder="Name">
        <button type="submit">
          Create board
        </button>
      </form>
    </modal>

    <modal :open="modals.share" title="Share board" @close="modals.share = false">
      <form @submit.prevent="shareBoard">
        <input v-model="shareForm.emails" type="text" placeholder="email">
        <button type="submit">
          Share board
        </button>
      </form>
    </modal>

    <modal :open="modals.remove" title="Remove this board?" @close="modals.remove = false">
      <form @submit.prevent="removeBoard">
        <button type="button">
          Cancel
        </button>
        <button type="submit">
          Yes, remove board
        </button>
      </form>
    </modal>
  </div>
</template>

<script>
import ProfileView from '~/components/./ProfileView'
import Modal from '~/components/Modal'
import VButton from '~/components/Button'
export default {
  name: 'Sidebar',
  components: { Modal, ProfileView, VButton },
  data () {
    return {
      createForm: {
        name: ''
      },
      shareForm: {
        emails: ''
      },
      modals: {
        create: false,
        share: false,
        remove: false
      },
      selectedBoard: {}
    }
  },
  computed: {
    boards () {
      return this.$store.getters['boards/boards']
    },
    fetched () {
      return this.$store.getters['boards/fetched']
    }
  },
  created () {
    return this.$store.dispatch('boards/fetch')
  },
  methods: {
    createBoard () {
      return this.$store
        .dispatch('boards/create', this.createForm)
        .then((board) => {
          this.$store.dispatch('board/set', board)
          this.createForm.name = ''
          this.modals.create = false
          this.$router.push(`/boards/${board.id}/`)
        })
    },
    shareBoard () {
      const emails = this.shareForm.emails.replace(/ /g, '').split(',')

      return this.$store
        .dispatch('board/share', { id: this.selectedBoard.id, emails })
        .then((board) => {
          this.shareForm.emails = ''
          this.modals.share = false
        })
    },
    removeBoard () {
      this.$store.dispatch('boards/remove', this.selectedBoard.id).then(() => {
        this.modals.remove = false
        this.$router.push('/')
      })
    },
    onRemoveBoard (board) {
      this.selectedBoard = board
      this.modals.remove = true
    },
    onBoardClick (action, board) {
      this.selectedBoard = board

      switch (action) {
        case 'share':
          this.modals.share = true
          break
        case 'remove':
          this.modals.remove = true
          break
      }
    },
    isCurrentUserOwner (board) {
      return board.ownerId === this.$store.getters.user.id
    },
    isBoardActive (board) {
      return board.id === Number(this.$route.params.id)
    }
  }
}
</script>

<style>
.sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: var(--sidebar-width);
  background-color: var(--sidebar-bg-color);
  border-right: 1px solid var(--border-color);
}
.sidebar__header {
  font-size: 24px;
  padding: 24px;
}
.sidebar__section {
  margin-bottom: 32px;
}
.sidebar__title {
  font-size: 14px;
  text-transform: uppercase;
  padding-left: 24px;
  margin-bottom: 16px;
}
.sidebar__footer {
  padding: 16px 24px;
  border-top: 1px solid var(--border-color);
}

.sidebar-list {
  padding: 0;
  margin: 0;
  list-style: none;
}
.sidebar-list__item {
  position: relative;
  padding: 0 24px;
  margin-bottom: 12px;
}
.sidebar-list__side {
  display: flex;
  align-items: center;
}
.sidebar-list__link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--text-secondary);
}
.sidebar-list__link.nuxt-link-active:before {
  content: '';
  position: absolute;
  height: 100%;
  width: 4px;
  top: 0;
  left: 0;
  background-color: var(--primary);
  border-radius: 0 3px 3px 0;
}
.sidebar-list__link.nuxt-link-active {
  color: var(--body-text-color);
}
.sidebar-list__link.nuxt-link-active .sidebar-list__icon {
  color: var(--primary);
}
.sidebar-list__icon {
  display: inline-block;
  font-size: 24px;
  width: 24px;
  margin-right: 8px;
}
/*.sidebar__title {*/
/*  font-weight: 700;*/
/*  text-transform: uppercase;*/
/*  font-size: 13px;*/
/*  margin-bottom: 8px;*/
/*}*/

/*.sidebar-list {*/
/*  padding: 0;*/
/*  margin: 0 0 24px;*/
/*  list-style: none;*/
/*}*/
/*.sidebar-list__icon {*/
/*  display: inline-block;*/
/*  margin-right: 8px;*/
/*  width: 18px;*/
/*}*/
/*.sidebar-list__link {*/
/*  color: var(--text-secondary);*/
/*  text-decoration: none;*/
/*  cursor: pointer;*/
/*  margin-bottom: 8px;*/
/*}*/
/*.sidebar-list__link.nuxt-link-active {*/
/*  color: var(--body-text-color);*/
/*}*/
/*.sidebar-list__link.nuxt-link-active .sidebar-list__icon {*/
/*  color: var(--primary);*/
/*}*/
/*.sidebar__logo {*/
/*  padding: 4px;*/
/*  margin-bottom: 32px;*/
/*}*/
</style>
