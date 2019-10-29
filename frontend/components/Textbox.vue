<template>
  <label class="textbox">
    <span class="textbox__label">{{ label }}</span>
    <input
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :class="classes"
      class="textbox__input"
      @input="handleInput"
      @change="handleChange"
      @blur="handleBlur"
      @focus="handleFocus"
    >
  </label>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text'
    },
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
  },
  methods: {
    handleBlur (event) {
      this.$emit('blur', event)
    },
    handleFocus (event) {
      this.$emit('focus', event)
    },
    handleInput (event) {
      this.$emit('input', event.target.value)
    },
    handleChange (event) {
      this.$emit('change', event.target.value)
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
    border: 1px solid var(--border-color);
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
