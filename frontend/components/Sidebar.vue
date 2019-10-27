<template>
  <div class="sidebar">
    <div class="sidebar__logo">
      <v-logo />
    </div>
    <ul class="sidebar-list">
      <li class="sidebar-list__item">
        <nuxt-link exact class="sidebar-list__link" to="/h">
          <span>
            <font-awesome-icon class="sidebar-list__icon" :icon="['fas', 'archive']" />
            Recent files
          </span>
        </nuxt-link>
      </li>
    </ul>

    <boards-list />
  </div>
</template>

<script>
import BoardsList from '~/components/BoardsList'
import VLogo from '~/components/Logo'
export default {
  name: 'Sidebar',
  components: { BoardsList, VLogo }
}
</script>

<style>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: var(--sidebar-width);
  padding: 24px;
  background-color: var(--sidebar-bg-color);
  border-right: 2px solid var(--border-color);
}

.sidebar-list {
  padding: 0;
  margin: 0;
  list-style: none;
}
.sidebar-list__icon {
  margin-right: 8px;
}
.sidebar-list__link {
  color: var(--text-secondary);
  text-decoration: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: 4px;
  border-radius: 3px;
  margin-bottom: 8px;
}
.sidebar-list__link.nuxt-link-active {
  color: var(--body-text-color);
}
.sidebar-list__link.nuxt-link-active .sidebar-list__icon {
  color: var(--primary);
}
.sidebar__logo {
  padding: 4px;
  margin-bottom: 32px;
}
</style>
