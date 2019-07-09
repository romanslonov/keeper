<template>
    <div>
        <div>Board: {{ board && board.name }}</div>

        <S3 @uploaded="onUpload" />

        <v-files-grid :files="files" />
    </div>
</template>

<script>
import VFilesGrid from '@/components/FilesGrid';
import S3 from '@/components/S3';
export default {
    name: 'Board',
    data() {
        return {
            board: {},
            files: [],
        };
    },
    created() {
        this.fetchBoard(this.$route.params.id);
    },
    methods: {
        fetchBoard(id) {
            return this.$fetch(`/boards/${id}/`)
                .then(response => response.json())
                .then(({ board }) => {
                    this.board = board;

                    this.fetchImages();
                })
                .catch(err => console.log(err));
        },
        fetchImages() {
            const { id } = this.$route.params;
            return this.$fetch(`/boards/${id}/files/`)
                .then(response => response.json())
                .then(({ files }) => {
                    this.files = files;
                });
        },
        onUpload(files) {
            this.files = [...this.files, ...files];
        },
    },
    watch: {
        '$route.params.id': function(id) {
            this.fetchBoard(id);
        },
    },
    components: { S3, VFilesGrid },
}
</script>
