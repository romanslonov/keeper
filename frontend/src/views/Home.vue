<template>
  <div class="home">
    App status: {{ status }}

    <form @submit.prevent="onUpload">
      <input name="uploadarea" type="file" multiple>
      <button type="submit">Send</button>
    </form>

    <div v-if="files && files.length > 0">
      <h3>Uploaded images:</h3>
      <img
        v-for="file in files"
        :key="file.originalname"
        :src="`${domain}/${file.path}`" 
        :alt="file.originalname"
        width="400"
      />
    </div>
  </div>
</template>

<script>
import { DOMAIN } from '@/constants';
export default {
  name: 'home',
  data() {
    return {
      status: '',
      files: [],
    };
  },
  computed: {
    domain() {
      return DOMAIN;
    },
  },
  created() {
    this.checkHealth();
  },
  methods: {
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
      .then(({ files }) => {
        this.files = files;
      })
      .catch(err => console.error(err));
    },
  },
};
</script>
