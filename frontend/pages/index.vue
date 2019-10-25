<template>
  <div class="container">
    <nav class="navigation">
      <v-logo />

      <div>
        <nuxt-link class="ml-3" to="/auth/login">
          Login
        </nuxt-link>
        <nuxt-link class="ml-3" to="/auth/register">
          Register
        </nuxt-link>
      </div>
    </nav>
    <header class="header">
      <h1 class="header__title">
        All your assets in one place
      </h1>
      <p class="header__paragraph">
        Keeper gives you everything to easily save, manage all your important stuff.
      </p>
      <v-button size="4" appearance="primary" @click="$router.push(authenticated ? '/h' : '/auth/login/')">
        Get started
      </v-button>
    </header>
  </div>
</template>

<script>
import VButton from '~/components/Button'
import VLogo from '~/components/Logo'
export default {
  layout: 'landing',
  components: { VButton, VLogo },
  computed: {
    authenticated () {
      return this.$store.state.authenticated
    }
  }
}
</script>

<style scoped>
  .header {
    text-align: center;
    padding: 64px 16px;
  }
  .header__title {
    font-size: 56px;
    margin: 0 auto 16px;
  }
  .header__paragraph {
    font-size: 26px;
    max-width: 540px;
    margin: 0 auto 32px;
    color: var(--text-secondary);
    line-height: 1.4;
  }
  .container {
    max-width: 1170px;
    padding: 0 32px;
    margin: 0 auto;
  }
  .navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 32px 16px;
  }
</style>
