<template>
  <div class="landing-layout">
    <nuxt />
  </div>
</template>

<script>
export default {
  middleware: ['notAuthenticated'],
  name: 'LandingLayout'
}
</script>
