<template>
  <div class="about">
    <div style="display:flex;justify-content:space-between;">
      <h1>Files</h1>

      <!-- <v-upload @uploaded="onUpload" /> -->
    </div>

    <!-- <v-files-list :files="images" /> -->
    <v-files-grid :files="files" />
  </div>
</template>

<script>
import VFilesGrid from "@/components/FilesGrid";
import VFilesList from "@/components/FilesList";
import VUpload from "@/components/Upload";
export default {
  data() {
    return {
      status: null
    };
  },
  computed: {},
  created() {
    this.checkHealth();
    this.fetchImages();
  },
  methods: {
    fetchImages() {
      return this.$fetch("/files/")
        .then(response => response.json())
        .then(({ files }) => {
          this.files = files;
        });
    },
    checkHealth() {
      return this.$fetch("/health/")
        .then(response => response.json())
        .then(({ status }) => {
          this.status = status;
        })
        .catch(err => console.error(err));
    },
    remove(file) {
      return this.$fetch("/files", {
        method: "DELETE",
        body: JSON.stringify([file.id])
      })
        .then(() => {
          this.files = this.files.filter(f => f.id !== file.id);
        })
        .catch(err => console.error(err));
    }
  },
  components: { VUpload, VFilesList, VFilesGrid }
};
</script>