<template>
  <div class="boards-list">
    <div class="boards-header">
      <div class="boards-header__title">Boards</div>
      <button @click="modals.create = true">+</button>
    </div>
    <ul class="boards-list__list" v-if="fetched">
      <li class="boards-list__item" v-for="board in boards" :key="board.id">
        <router-link class="boards-list__link" :to="{ name: 'Board', params: { id: board.id } }">
          {{ board.name }}
          <div v-if="isCurrentUserOwner(board)">
            <button @click.stop.prevent="onBoardClick('share', board)">Share</button>
            <button
              @click.stop.prevent="onBoardClick('remove', board)"
              :disabled="boards.length === 1"
            >x</button>
          </div>
          <div v-else>
            <small>Shared</small>
          </div>
        </router-link>
      </li>
    </ul>

    <modal :open="modals.create" title="Create new board" @close="modals.create = false">
      <form @submit.prevent="createBoard">
        <input type="text" placeholder="Name" v-model="createForm.name" />
        <button type="submit">Create board</button>
      </form>
    </modal>

    <modal :open="modals.share" title="Share board" @close="modals.share = false">
      <form @submit.prevent="shareBoard">
        <input type="text" placeholder="email" v-model="shareForm.emails" />
        <button type="submit">Share board</button>
      </form>
    </modal>

    <modal :open="modals.remove" title="Remove this board?" @close="modals.remove = false">
      <form @submit.prevent="removeBoard">
        <button type="button">Cancel</button>
        <button type="submit">Yes, remove board</button>
      </form>
    </modal>
  </div>
</template>

<script>
import Modal from "@/components/Modal";
export default {
  name: "BoardsList",
  data() {
    return {
      createForm: {
        name: ""
      },
      shareForm: {
        emails: ""
      },
      modals: {
        create: false,
        share: false,
        remove: false
      },
      selectedBoard: {}
    };
  },
  computed: {
    boards() {
      return this.$store.getters["boards/boards"];
    },
    fetched() {
      return this.$store.getters["boards/fetched"];
    }
  },
  created() {
    this.fetchBoards();
  },
  methods: {
    createBoard() {
      return this.$store
        .dispatch("boards/create", this.createForm)
        .then(board => {
          this.$store.dispatch("board/set", board);
          this.createForm.name = "";
          this.modals.create = false;
          this.$router.push({ name: "Board", params: { id: board.id } });
        });
    },
    shareBoard() {
      const emails = this.shareForm.emails.replace(/ /g, "").split(",");

      return this.$store
        .dispatch("boards/share", { id: this.selectedBoard.id, emails })
        .then(board => {
          this.shareForm.emails = "";
          this.modals.share = false;
        });
    },
    fetchBoards() {
      return this.$store.dispatch('boards/fetch');
    },
    removeBoard() {
      this.$store.dispatch("board/remove", this.selectedBoard.id).then(() => {
        this.modals.remove = false;
        this.$router.push({ name: "Home" });
      });
    },
    onRemoveBoard(board) {
      this.selectedBoard = board;
      this.modals.remove = true;
    },
    onBoardClick(action, board) {
      this.selectedBoard = board;

      switch (action) {
        case "share":
          this.modals.share = true;
          break;
        case "remove":
          this.modals.remove = true;
          break;
      }
    },
    isCurrentUserOwner(board) {
      return board.ownerId === this.$store.getters.user.id;
    }
  },
  components: { Modal }
};
</script>

<style>
.boards-list__list {
  padding: 0;
  margin: 0;
  list-style: none;
}
.boards-list__item {
  margin-bottom: 8px;
}
.boards-list__link {
  color: var(--body-color);
  text-decoration: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: 4px;
  border-radius: 3px;
}
.boards-list__link.is-active {
  background-color: hsla(0, 0%, 0%, 0.3);
}

.boards-header {
  padding: 4px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.boards-header__title {
  font-weight: bold;
}
</style>
