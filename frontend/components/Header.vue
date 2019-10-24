<template>
  <header class="header">
    <search />

    <profile-view />
  </header>
</template>

<script>
import ProfileView from '~/components/ProfileView'
import Search from '~/components/Search'
export default {
  name: 'Header',
  components: { Search, ProfileView }
}
</script>

<style scoped>
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 32px;
}
</style>
