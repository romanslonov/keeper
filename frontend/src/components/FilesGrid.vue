<template>
  <div class="files-grid">
    <div class="files-grid-item" v-for="file in files" :key="file.id" tabindex="0">
      <img class="files-grid-item__img" :src="`${file.url}`" :alt="file.name">
      <div class="files-grid-item__name">{{ file.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilesGrid',
  props: {
    files: {
      type: Array,
      default: () => []
    }
  },
};
</script>

<style>
.files-grid {
  display: flex;
  flex-wrap: wrap;
}

.files-grid-item {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
  width: 90px;
  margin-right: 64px;
  margin-bottom: 64px;
}

.files-grid-item:focus {
  outline: none;
}

.files-grid-item:focus .files-grid-item__img {
  border-color: var(--primary);
}

.files-grid-item__name {
  color: var(--secondary);
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-top: 12px;
  width: 100%;
  text-align: center;
}

.files-grid-item__img {
  border-radius: 4px;
  max-width: 100%;
  object-fit: contain;
  width: 90px;
  height: auto;
  max-height: 90px;
  background-color: #fff;
  border: 3px white solid;
}
</style>
