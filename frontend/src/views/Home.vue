<template>
  <div class="home">
    App status: {{ status }}
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  data() {
    return {
      status: '',
    };
  },
  components: {
    HelloWorld,
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
  },
};
</script>
