<template>
  <div class="boards-list">
    <ul class="boards-list__list">
      <li
        class="boards-list__item"
        v-for="board in boards" 
        :key="board.id"
      >
        <router-link class="boards-list__link" :to="{ name: 'Board', params: { id: board.id } }">
          {{ board.name }}
          <button @click.stop.prevent="removeBoard(board.id)" :disabled="boards.length === 1">Remove</button>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BoardsList',
  computed: {
    boards() {
      return this.$store.getters['boards/boards'];
    },
    fetched() {
      return this.$store.getters['boards/fetched'];
    },
  },
  created() {
    this.fetchBoards();
  },
  methods: {
    fetchBoards() {
      return this.$store.dispatch('boards/fetch');
    },
    clearBoards() {
      return this.$store.dispatch('boards/clear');
    },
    removeBoard(id) {
      this.$store.dispatch('boards/remove', id)
        .then(() => this.$router.push({ name: 'Home' }));
    },
  },
  beforeDestroy() {
    this.clearBoards(); 
  },
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
</style>
