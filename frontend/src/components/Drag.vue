<template>
    <div class="drag">
        <div class="drag__drop" :class="{ 'is-dragging': isDragging }">
            <div class="drag__text">Drop files to upload</div>
        </div>
    </div>
</template>

<script>
import VButton from '@/components/Button';
export default {
    name: 'Drag',
    data() {
        return {
            isDragging: false,
        };
    },
    created() {
        document.body.addEventListener('dragover', this.handleDragOver);
        document.body.addEventListener('dragleave', this.handleDragLeave);
        document.body.addEventListener('drop', this.handleDrop);
        document.body.addEventListener('paste', this.handlePaste, false);
    },
    computed: {},
    methods: {
        handleDragOver(e) {
            e.preventDefault();
            e.stopPropagation();

            this.isDragging = true;

            return false;
        },
        handleDragLeave(e) {
            this.isDragging = false;
        },
        handleDrop(e) {
            e.preventDefault();
            e.stopPropagation();

            const files = [...e.dataTransfer.files];

            this.upload(files);

            this.isDragging = false;

            return false;
        },
        handlePaste(pasteEvent) {
            const items = [
                ...(event.clipboardData || event.originalEvent.clipboardData).items
                ]
                .filter(item => item.type.indexOf('image') != -1)
                .map(item => item.getAsFile());

            if (items.length > 0) {
                this.upload(items);
            }
        },
        upload(files) {
            const data = new FormData();

           files.forEach(file => data.append('files', file));

            return this.$fetch(`/boards/${this.$route.params.id}/files/`, {
                method: 'POST',
                body: data,
            })
            .then(response => response.json())
            .then(({ files }) => {
                this.$emit('uploaded', files);
            })
            .catch(err => console.error(err));
        },
    },
    beforeDestroy() {
        document.body.removeEventListener('dragover', this.handleDragover);
        document.body.removeEventListener('dragleave', this.handleDragLeave);
        document.body.removeEventListener('drop', this.handleDrop);
        document.body.removeEventListener('paste', this.handlePaste, false);
    },
    components: { VButton },
}
</script>

<style>
.drag__drop {
    display: none;
    align-items: center;
    justify-content: center;
    position: fixed;
    pointer-events: none;
    top: 0;
    left: 0;
    right: 0;
    height: 100vh;
    border: 2px dashed var(--primary);
    background-color: rgba(11, 120, 255, 0.2);
    z-index: 111;
}

.drag__drop.is-dragging {
    display: flex;
}

.drag__text {
    font-size: 20px;
    background-color: var(--primary);
    color: white;
    padding: 16px;
    border-radius: 4px;
}
</style>
