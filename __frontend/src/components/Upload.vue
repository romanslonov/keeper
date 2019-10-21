<template>
    <div class="upload">
        <input ref="inputUpload" name="uploadarea" type="file" multiple hidden>
        <v-button 
            type="submit"
            appearance="primary"
            @click="$refs.inputUpload.click()"
        >
            Upload file
        </v-button>

        <div v-if="files.length > 0">
            <ul class="upload-list">
                <li v-for="file in files" :key="file.lastModified">{{ file.name }}</li>
            </ul>
            <v-button appearance="primary" @click="upload">Upload</v-button>
        </div>
    </div>
</template>

<script>
import VButton from '@/components/Button';
export default {
    name: 'Upload',
    data() {
        return {
            files: [],
        };
    },
    mounted() {
        this.$refs.inputUpload.addEventListener('change', this.onChange);
    },
    computed: {},
    methods: {
        onChange(e) {
            this.files = [...e.target.files];
        },
        upload() {
            const data = new FormData();

            this.files.forEach(file => data.append('files', file));

            return this.$fetch('/upload', {
                method: 'POST',
                body: data,
            })
            .then(response => response.json())
            .then(({ images }) => {
                this.$emit('uploaded', images);

                this.files = [];
            })
            .catch(err => console.error(err));
        },
    },
    beforeDestroy() {
        this.$refs.inputUpload.removeEventListener('change', this.onChange);
    },
    components: { VButton },
}
</script>

<style>
.upload-list {
    margin: 0;
    padding: 8px;
    border-radius: 4px;
    background-color: hsl(222, 4%, 14%);
    list-style: none;
}
</style>
