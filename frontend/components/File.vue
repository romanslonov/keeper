<template>
  <div class="file" :class="{ 'file--active': active }" @click="open">
    <div class="file__container">
      <img
        class="file__img"
        :src="`${file.url}`"
        :alt="file.name"
        @dragstart.prevent
      >
    </div>
    <div class="file__name">
      {{ file.name }}
    </div>
    <div class="file__checkbox">
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
export default {
  name: 'File',
  props: {
    file: {
      type: Object,
      default: () => {}
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    open () {
      this.isOpen = true
    },
    close () {
      this.isOpen = false
    }
  }
}
</script>

<style>
.file {
  display: flex;
  flex-direction: column;
  position: relative;
}

.file:hover > .file__checkbox,
.file--active > .file__checkbox {
  display: block;
}

.file:focus {
  outline: none;
}

.file__container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  border: 3px white solid;
  border-radius: 4px;
}

.file--active .file__container {
  border-color: var(--primary);
}

.file__name {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-top: 12px;
  width: 100%;
  text-align: center;
}

.file__img {
  max-width: 100%;
  height: auto;
  max-height: var(--grid-item-size);
  background-color: #fff;
}

.file__checkbox {
  display: none;
  position: absolute;
  top: 8px;
  left: 8px;
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
