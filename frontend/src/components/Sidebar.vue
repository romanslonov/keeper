<template>
  <div class="sidebar">

    <ul class="sidebar-list">
      <li class="sidebar-list__item">
        <router-link exact class="sidebar-list__link" :to="{ name: 'Home' }">Recent files</router-link>
      </li>
    </ul>

    <boards-list />

    <div style="margin-top: 32px;">
      <form @submit.prevent="createBoard">
        <input type="text" placeholder="Name" v-model="form.name" />
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
      form: {
        name: '',
      },
    };
  },
  methods: {
    createBoard() {
      return this.$store.dispatch('boards/create', this.form)
        .then((board) => {
          this.form.name = '';
          this.$router.push({ name: 'Board', params: { id: board.id } });
        });
    }
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
  background-color: var(--sidebar-bg-color);
  border-right: 1px solid var(--border-color);
}

.sidebar-list {
  padding: 0;
  margin: 0;
  list-style: none;
}
.sidebar-list__link {
  color: var(--body-color);
  text-decoration: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: 4px;
  border-radius: 3px;
  margin-bottom: 8px;
}
.sidebar-list__link.is-active {
  background-color: hsla(0, 0%, 0%, 0.3);
}
</style>

