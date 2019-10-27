<template>
  <div v-if="files.length > 0" class="upload-widget">
    <header class="upload-widget__header">
      <h4>
        Uploading...
      </h4>
      <button @click="clear">
        x
      </button>
    </header>
    <ul class="upload-widget__list">
      <li v-for="file in files" :key="file.name" class="upload-widget-item">
        <div class="upload-widget-item__name">
          {{ file.name }}
        </div>
        <div class="upload-widget-progress-bar">
          <div class="upload-widget-progress-bar__fill" :style="{ width: `${file.progress}%` }" />
        </div>
        <div class="upload-widget-item__info">
          {{ file.progress }}%
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'UploadWidget',
  computed: {
    files () {
      return this.$store.getters['queue/queue']
    }
  },
  methods: {
    clear () {
      return this.$store.commit('queue/clear')
    }
  }
}
</script>

<style scoped>
  .upload-widget {
    background-color: #fff;
    position: fixed;
    bottom: 32px;
    right: 32px;
    box-shadow: 0 0 20px 0 rgba(0,0,0,.2);
    border-radius: 4px;
    overflow: hidden;
    min-width: 320px;
  }
  .upload-widget__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--indigo-700);
    color: white;
    padding: 16px;
  }
  .upload-widget__list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .upload-widget-item {
    font-size: 14px;
    padding: 16px;
    border-bottom: 1px solid var(--border-color);
  }

  .upload-widget-item__name {
    font-weight: bold;
  }

  .upload-widget-item__info {
    color: var(--text-secondary);
  }

  .upload-widget-progress-bar {
    background-color: var(--gray-400);
    height: 4px;
    border-radius: 40px;
    margin: 6px 0;
  }
  .upload-widget-progress-bar__fill {
    background-color: var(--indigo-700);
    border-radius: 40px;
    height: 4px;
  }
</style>
