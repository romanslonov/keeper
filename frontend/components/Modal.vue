<template>
  <div v-if="open" class="modal-mask">
    <div class="modal">
      <header class="modal__header">
        <h3 class="modal__title">
          {{ title }}
        </h3>
        <button @click="close">
          close
        </button>
      </header>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    title: {
      type: String,
      default: 'Modal title'
    },
    open: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    open () {
      this[this.open ? 'onOpen' : 'onClose']()
    }
  },
  methods: {
    onOpen () {
      this.$emit('open')
    },
    onClose () {
      this.$emit('close')
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style>
.modal-mask {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .5);
    z-index: 20;
}
.modal {
    flex-grow: 1;
    background-color: #fff;
    margin: 0 auto;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    max-width: 544px;
}
.modal__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.modal__title {
    margin: 0;
}
</style>
