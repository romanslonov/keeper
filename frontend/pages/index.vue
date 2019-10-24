<template>
  <div class="container">
    <nav class="nav py-3">
      <v-logo />

      <v-profile-view v-if="authenticated" />

      <div v-else>
        <nuxt-link to="/auth/login">
          Login
        </nuxt-link>
        <nuxt-link to="/auth/register">
          Register
        </nuxt-link>
      </div>
    </nav>
    <header class="header text-center py-5">
      <h1>Keeper</h1>
      <p>All your assets in one, organize, manageable place.</p>
      <v-button size="4" appearance="primary" @click="$router.push(authenticated ? '/h' : '/auth/login/')">
        Get started
      </v-button>
    </header>
  </div>
</template>

<script>
import VProfileView from '~/components/ProfileView'
import VButton from '~/components/Button'
import VLogo from '~/components/Logo'
export default {
  meta: {
    requiredAuth: true
  },
  layout: 'landing',
  components: { VProfileView, VButton, VLogo },
  computed: {
    user () {
      return this.$store.state.user
    },
    authenticated () {
      return this.$store.state.authenticated
    }
  }
}
</script>

<style scoped>
  .container {
    max-width: 1170px;
    padding: 0 32px;
    margin: 0 auto;
  }
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
