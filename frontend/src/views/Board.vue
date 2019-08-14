<template>
    <div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
            <h2 style="margin: 0;">Board: {{ board && board.name }}</h2>

            <div>
                <button @click="moveImages" :disabled="selected.length === 0">
                    Move ({{ selected.length }})
                </button>

                <select name="boards" v-if="selected.length > 0" v-model="move.id">
                    <option v-for="board in boards" :value="board.id" :key="board.id">{{ board.name }}</option>
                </select>

                <button @click="removeImages" :disabled="selected.length === 0">
                    Delete ({{ selected.length }})
                </button>
            </div>
        </div>

        <!-- <S3 @uploaded="onUpload" /> -->

        <drag @uploaded="onUpload" />

        <files-grid :files="files" @select="onSelected" />
    </div>
</template>

<script>
import FilesGrid from '@/components/FilesGrid';
import S3 from '@/components/S3';
import Drag from '@/components/Drag';
export default {
    name: 'Board',
    data() {
        return {
            board: {},
            files: [],
            selected: [],

            move: {
                id: 1,
            },
        };
    },
    computed: {
        boards() {
            return this.$store.getters['boards/boards'];
        },
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
        removeImages() {
            return this.$fetch(`/boards/${this.$route.params.id}/files/`, {
                method: 'DELETE',
                body: JSON.stringify({ keys: this.selected.map(s => s.key) }),
            })
            .then(() => {
                this.files = this.filterFiles(this.selected);
                this.selected = [];
            });
        },
        moveImages() {
            return this.$fetch(`/boards/${this.move.id}/files/`, {
                method: 'PUT',
                body: JSON.stringify({ keys: this.selected.map(s => s.key) }),
            })
            .then(() => {
                this.files = this.filterFiles(this.selected);
                this.selected = [];
            });
        },
        filterFiles(files) {
            return this.files.filter((file) => !files.includes(file));
        },
        onUpload(files) {
            this.files = [...this.files, ...files];
        },
        onSelected(files) {
            this.selected = files;
        },
    },
    watch: {
        '$route.params.id': function(id) {
            this.fetchBoard(id);
        },
    },
    components: { S3, FilesGrid, Drag },
}
</script>
