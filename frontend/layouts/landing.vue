<template>
  <div class="landing-layout">
    <nuxt />
  </div>
</template>

<script>
export default {
  middleware: ['authenticated'],
  name: 'LandingLayout'
}
</script>
