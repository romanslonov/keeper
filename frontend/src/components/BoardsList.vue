<template>
  <div class="boards-list">
    <ul class="boards-list__list">
      <li 
        tabindex="0"
        role="banner"
        class="boards-list__item" 
        v-for="board in boards" 
        :key="board.id" 
        @click="$router.push({ name: 'Board', params: { id: board.id } })"
      >
        {{ board.name }}
        <button @click="removeBoard(board.id)">Remove</button>
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
      return this.$store.dispatch('boards/remove', id);
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
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: 4px;
  border-radius: 3px;
  margin-bottom: 8px;
  background-color: hsla(0, 0%, 100%, 0.1);
}
</style>
