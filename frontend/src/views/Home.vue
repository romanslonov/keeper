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
        :src="`https://localhost:3000/${file.path}`" 
        :alt="file.originalname"
        width="400"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      status: '',
      files: [],
    };
  },
  created() {
    this.checkHealth();
  },
  methods: {
    checkHealth() {
      return fetch('https://localhost:3000/api/v1/health/')
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

      return fetch('https://localhost:3000/api/v1/upload', {
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
