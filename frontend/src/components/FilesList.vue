<template>
  <div class="folder-list">
    <div class="folder-list-header">
      <div class="folder-list-item__checkbox">
        <input type="checkbox">
      </div>
      <div class="folder-list-item__name">Name</div>
      <div class="folder-list-item__date">Uploaded at</div>
      <div class="folder-list-item__actions">Actions</div>
    </div>

    <div class="folder-list-content">
      <div class="folder-list-item" v-for="file in files" :key="file.id">
        <div class="folder-list-item__checkbox">
          <input type="checkbox">
        </div>
        <div class="folder-list-item__preview">
          <img
            class="folder-list-item__preview-img"
            :src="`${domain}/${file.path}`"
            :alt="file.fileName"
          >
        </div>
        <div class="folder-list-item__name">{{ file.originalName }}</div>
        <div class="folder-list-item__date">{{ file.uploadedAt }}</div>
        <div class="folder-list-item__actions">
          <button>Download</button>
          <button @click="remove(file)">Remove</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DOMAIN } from '@/constants';
export default {
  name: "FilesList",
  props: {
    files: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    domain() {
      return DOMAIN;
    },
  },
};
</script>

<style>
.folder-list {}

.folder-list-item, .folder-list-header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.folder-list-item {
  padding: 8px;
  background: hsl(222, 4%, 14%);
  border-radius: 3px;
}

.folder-list-header {
  margin-bottom: 16px;
}

.folder-list-header .folder-list-item__checkbox {
  padding-left: 8px;
  margin-right: calc(92px + 32px);
}

.folder-list-header .folder-list-item__actions {
  padding-right: 16px;
}

.folder-list-content .folder-list-item__checkbox {
  margin-right: 32px;
}

.folder-list-content .folder-list-item__preview {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-right: 32px;
}

.folder-list-item__checkbox {
  width: 12px;
}

.folder-list-item__preview-img {
  border-radius: 4px;
  max-width: 100%;
  object-fit: contain;
  width: 40px;
  height: 40px;
}

.folder-list-item__name {
  width: 30%;
  margin-right: 32px;
}

.folder-list-item__actions {
  margin-left: auto;
}
</style>
