<template>
  <div class="files-grid">
    <file 
      v-for="file in sortedFiles" 
      :file="file" 
      :key="file.id" 
      :active="isActive(file)" 
      @select="onSelect"
    />
  </div>
</template>

<script>
import File from '@/components/File.vue';
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
  computed: {
    sortedFiles() {
      return this.files.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
    },
  },
  methods: {
    onSelect(event, file) {
      if (event.target.checked) {
        this.selected.push(file);
      } else {
        this.selected = this.selected.filter(s => s.id !== file.id);
      }
      
      this.$emit('select', this.selected)
    },
    isActive(file) {
      return this.selected.includes(file);
    },
  },
  components: { File },
};
</script>

<style>
.files-grid {
  --grid-item-size: 160px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--grid-item-size), 1fr));
  grid-gap: 32px;
}
</style>
