<template>
  <div class="files-grid">
    <div class="files-grid-item" v-for="file in files" :class="{ 'files-grid-item--active': isActive(file) }" :key="file.id">
      <div class="files-grid-item__container">
        <img class="files-grid-item__img" :src="`${file.url}`" :alt="file.name">
      </div>
      <div class="files-grid-item__name">{{ file.name }}</div>
      <div class="files-grid-item__checkbox">
        <input v-model="selected" :value="file" type="checkbox" name="item-checkbox" :id="file.id">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilesGrid',
  data() {
    return {
      selected: [],
    };
  },
  props: {
    files: {
      type: Array,
      default: () => []
    },
  },
  methods: {
    isActive(file) {
      return this.selected.includes(file);
    },
  },
};
</script>

<style>
.files-grid {
  --grid-item-size: 160px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--grid-item-size), 1fr));
  grid-gap: 32px;
}

.files-grid-item {
  display: flex;
  flex-direction: column;
  position: relative;
}

.files-grid-item:hover > .files-grid-item__checkbox,
.files-grid-item--active > .files-grid-item__checkbox {
  display: block;
}

.files-grid-item__container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  border: 3px white solid;
  border-radius: 4px;
}

.files-grid-item:focus {
  outline: none;
}

.files-grid-item--active .files-grid-item__container  {
  border-color: var(--primary);
}

.files-grid-item__name {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-top: 12px;
  width: 100%;
  text-align: center;
}

.files-grid-item__img {
  max-width: 100%;
  height: auto;
  max-height: var(--grid-item-size);
  background-color: #fff;
}

.files-grid-item__checkbox {
  display: none;
  position: absolute;
  top: 8px;
  left: 8px;
}
</style>
