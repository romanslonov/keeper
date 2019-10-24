<template>
  <label class="textbox">
    <span class="textbox__label">{{ label }}</span>
    <input
      type="email"
      :placeholder="placeholder"
      :required="required"
      :class="classes"
      class="textbox__input"
    >
  </label>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: null
    },
    size: {
      type: String,
      default: '3'
    }
  },
  computed: {
    classes () {
      return [
        `textbox--size-${this.size}`
      ]
    }
  }
}
</script>

<style>
  .textbox {
    display: block;
  }

  .textbox__input {
    font-size: inherit;
    font-family: inherit;
    border: 2px solid var(--border-color);
    border-radius: 3px;
    width: 100%;
    outline: none;
  }

  .textbox__input:hover {}

  .textbox__input:focus {
    border-color: var(--primary);
  }

  .textbox__label {
    display: inline-block;
    margin-bottom: 8px;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 13px;
  }

  /*Size*/
  .textbox--size-3 {
    height: 40px;
    padding: 0 12px;
  }
  .textbox--size-4 {
    height: 48px;
    padding: 0 16px;
  }
</style>
