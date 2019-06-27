<template>
  <div class="about">
    <h1>Uploaded images</h1>
    <div v-if="images && images.length > 0">
      <h3>Uploaded images:</h3>
      <img
        v-for="image in images"
        :key="image.fileName"
        :src="`${domain}/${image.path}`" 
        :alt="image.fileName"
        width="400"
      />
    </div>
  </div>
</template>

<script>
import { DOMAIN } from '@/constants';
export default {
  data() {
    return {
      images: [],
    };
  },
  computed: {
    domain() {
      return DOMAIN;
    },
  },
  created() {
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
  },
}
</script>
