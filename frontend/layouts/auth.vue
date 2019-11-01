<template>
  <div class="auth-layout">
    <nuxt-link to="/">
      <font-awesome-icon class="auth-layout__logo" :icon="['fas', 'fill']" />
    </nuxt-link>
    <div class="auth-layout__wrapper">
      <nuxt />
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['notAuthenticated']
}
</script>

<style scoped>
  .auth-layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--gray-200);
    padding: 16px;
  }
  .auth-layout__logo {
    font-size: 30px;
    margin-bottom: 32px;
  }
  .auth-layout__wrapper {
    width: 100%;
    max-width: 480px;
    padding: 32px;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  }
</style>
