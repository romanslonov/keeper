<template>
  <div class="about">
    <h1 style="display:flex;justify-content:space-between;">
      <span>Uploaded images</span>
      <form @submit.prevent="onUpload">
        <input name="uploadarea" type="file" multiple>
        <button type="submit">Send</button>
      </form>
    </h1>

    <div class="folder-list" v-if="images && images.length > 0">

      <div class="folder-list-header">
        <div class="folder-list-item__checkbox">
          <input type="checkbox">
        </div>
        <div class="folder-list-item__name">Name</div>
        <div class="folder-list-item__date">Uploaded at</div>
        <div class="folder-list-item__actions">Actions</div>
      </div>

      <div class="folder-list-content">
        <div class="folder-list-item" v-for="image in images" :key="image.id">
          <div class="folder-list-item__checkbox">
            <input type="checkbox">
          </div>
          <div class="folder-list-item__preview">
            <img class="folder-list-item__preview-img" :src="`${domain}/${image.path}`" :alt="image.fileName">
          </div>
          <div class="folder-list-item__name">{{ image.originalName }}</div>
          <div class="folder-list-item__date">{{ image.uploadedAt }}</div>
          <div class="folder-list-item__actions">
            <button>Download</button>
            <button @click="remove(image)">Remove</button>
          </div>
        </div>
      </div>
    </div>

    <div v-else style="text-align:center;padding:16px;">Loading...</div>
    
  </div>
</template>

<script>
import { DOMAIN } from '@/constants';
export default {
  data() {
    return {
      images: [],
      status: null,
    };
  },
  computed: {
    domain() {
      return DOMAIN;
    },
  },
  created() {
    this.checkHealth();
    this.fetchImages();
  },
  methods: {
    fetchImages() {
      return this.$fetch('/images/')
        .then(response => response.json())
        .then(({ images }) => {
          this.images = images;
        });
    },
    checkHealth() {
      return this.$fetch('/health/')
        .then(response => response.json())
        .then(({ status }) => {
          this.status = status;
        })
        .catch(err => console.error(err));
    },
    onUpload(e) {
      const files = [...e.target.querySelector('input').files];
      const data = new FormData();

      files.forEach(file => data.append('files', file));

      return this.$fetch('/upload', {
        method: 'POST',
        body: data,
      })
      .then(response => response.json())
      .then(({ images }) => {
        this.images = [...this.images, ...images];
      })
      .catch(err => console.error(err));
    },
    remove(image) {
      return this.$fetch('/images', {
        method: 'DELETE',
        body: JSON.stringify([image.id]),
      })
        .then(() => {
          this.images = this.images.filter(img => img.id !== image.id);
        })
        .catch((err) => console.error(err));
    },
  },
}
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
