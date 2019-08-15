<template>
  <div class="files-grid">
    <div class="files-grid-item" v-for="file in files" :class="{ 'files-grid-item--active': isActive(file) }" :key="file.id" @click="select(file)">
      <div class="files-grid-item__container">
        <img class="files-grid-item__img" :src="`${file.url}`" :alt="file.name">
      </div>
      <div class="files-grid-item__name">{{ file.name }}</div>
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
    select(file) {
      if (this.selected.includes(file)) {
        this.selected = this.selected.filter(s => s.id !== file.id);
        this.$emit('deselect', file);
      } else {
        this.selected.push(file);
        this.$emit('select', file);
      }
    },
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
}

.files-grid-item__container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
}

.files-grid-item:focus {
  outline: none;
}

.files-grid-item--active .files-grid-item__img  {
  border-color: var(--primary);
}

.files-grid-item__name {
  /* color: var(--secondary); */
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
  height: auto;
  max-height: var(--grid-item-size);
  background-color: #fff;
  border: 3px white solid;
}
</style>
