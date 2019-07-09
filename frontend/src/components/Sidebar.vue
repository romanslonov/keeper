<template>
  <div class="sidebar">

    <boards-list />

    <div style="margin-top: 32px;">
        <form @submit.prevent="createBoard">
            <input type="text" placeholder="Name" v-model="form.name">
            <button type="submit">Create board</button>
        </form>
    </div>
  </div>
</template>

<script>
import BoardsList from '@/components/BoardsList';
export default {
  name: 'Sidebar',
  data() {
      return {
          boards: [],
          form: {
              name: '',
          },
      };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
      createBoard() {
          return this.$fetch('/boards/', { 
              method: 'POST', 
              body: JSON.stringify(this.form),
            })
            .then(response => response.json())
            .then(({ board }) => {
                this.boards.push(board);

                this.$router.push({ name: 'Board', params: { id: board.id } });
            })
            .catch(err => console.error(err));
      },
  },
  components: { BoardsList }
};
</script>


<style>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: var(--sidebar-width);
  padding: 32px;
  background-color: #181a1d;
  border-right: 1px solid black;
}
</style>

