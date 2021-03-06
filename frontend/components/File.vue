<template>
  <div class="file" :class="{ 'file--active': active }">
    <div class="file__preview" @click="open">
      <div v-if="!isLoaded" class="file__fake">
        <font-awesome-icon class="files-empty__icon" :icon="['fas', 'file-image']" />
      </div>
      <img
        v-show="isLoaded"
        ref="image"
        class="file__img"
        :src="`${file.thumbnail}`"
        :alt="file.name"
        @dragstart.prevent
      >
    </div>
    <div class="file__meta">
      <div class="file__name">
        {{ file.name }}
      </div>
      <div class="file__date">
        {{ returnFormattedDate(file.uploadedAt) }}
      </div>
    </div>
    <div v-if="selectable" class="file__checkbox">
      <input
        :id="file.id"
        type="checkbox"
        name="item-checkbox"
        @change="$emit('select', $event, file)"
        @click.stop
      >
    </div>

    <div v-if="isOpen" class="file-overlay">
      <button class="file-overlay__close" @click.stop="close">
        x
      </button>

      <div class="file-overlay__container">
        <img
          ref="file"
          class="file-overlay__img"
          :src="file.url"
          :alt="file.name"
        >
        <div class="file-overlay__meta">
          {{ file.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns'

export default {
  props: {
    file: {
      type: Object,
      default: () => {}
    },
    active: {
      type: Boolean,
      default: false
    },
    selectable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      isOpen: false,
      isLoaded: false
    }
  },
  mounted () {
    this.$refs.image.onload = () => {
      this.isLoaded = true
    }
    // if (this.$refs.image) {
    //   window.console.log(this.$refs.image)
    // }
  },
  methods: {
    open () {
      this.isOpen = true
    },
    close () {
      this.isOpen = false
    },
    returnFormattedDate (date) {
      return format(new Date(date), 'MMM dd, yyyy, h:mm a')
    }
  }
}
</script>

<style>
.file {
  --max-height-image: 140px;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: white;
  border: 1px solid var(--gray-300);
  border-radius: 3px;
  padding: 4px;
}

.file:hover > .file__checkbox,
.file--active > .file__checkbox {
  display: block;
}

.file.file--active, .file:hover {
  box-shadow: 0 0 12px 0 rgba(0,0,0,.2);
}

.file:focus {
  outline: none;
}

.file__preview {
  height: var(--max-height-image);
}

.file__meta {
  padding: 0 8px 8px;
}

.file.file--active {
  border-color: var(--primary);
}

.file__name {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 12px 0 6px;
  width: 100%;
  font-size: 13px;
  font-weight: bold;
}

.file__date {
  font-size: 12px;
  color: var(--text-secondary);
}

.file__img {
  width: 100%;
  min-height: 100%;
  max-height: var(--max-height-image);
  object-fit: cover;
  background-color: #fff;
  border-radius: 3px;
}

.file__checkbox {
  display: none;
  position: absolute;
  top: 8px;
  left: 8px;
}
.file__fake {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: var(--gray-200);
  font-size: 30px;
  color: var(--text-secondary);
}

.file-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 20;
}

.file-overlay__container {
  display: flex;
  flex-direction: column;
}

.file-overlay__img {
  width: auto;
  max-width: 100%;
  max-height: calc(100vh - 80px);

}

.file-overlay__close {
  position: absolute;
  top: 32px;
  right: 32px;
}

.file-overlay__meta {
  color: white;
  margin-top: 16px;
}
</style>
