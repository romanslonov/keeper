<template>
  <div class="landing-layout">
    <nuxt />
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  name: 'LandingLayout'
}
</script>
