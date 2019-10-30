<template>
  <div class="main-layout">
    <!--    <div class="main-layout__header">-->
    <!--      <top-header />-->
    <!--    </div>-->
    <div class="main-layout__content">
      <nuxt />
    </div>
    <div class="main-layout__sidebar">
      <sidebar />
    </div>

    <upload-widget />
  </div>
</template>

<script>
import Sidebar from '~/components/Sidebar'
import UploadWidget from '~/components/UploadWidget'
export default {
  name: 'MainLayout',
  middleware: ['authenticated'],
  components: { Sidebar, UploadWidget }
}
</script>

<style>
.main-layout__content {
  padding: 32px 32px 32px calc(var(--sidebar-width) + 32px);
  min-height: 100vh;
}
</style>
