<template>
  <button @click="handleClick" :class="classes" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: 'Button',
    props: {
      appearance: {
        type: String,
        default: 'default'
      },
      size: {
        type: String,
        default: '3'
      },
      disabled: Boolean,
      fullwidth: Boolean,
    },
    computed: {
      classes() {
        return [
          'button',
          this.appearance,
          `size-${this.size}`,
          { 'is-disabled': this.disabled },
          { 'is-fullwidth': this.fullwidth },
        ]
      },
    },
    methods: {
      handleClick(e) {
        this.$emit('click', e);
      }
    },
  }
</script>

<style>
  .button {
    display: inline-block;
    font-size: 16px;
    font-family: inherit;
    cursor: pointer;
    border: none;
    background-color: transparent;
    border-radius: 3px;
    transition: background-color 100ms ease-in-out;
  }

  .button.primary {
    background-color: var(--primary);
    color: white;
  }

  .button.primary:hover {
    background-color: darkblue;
  }

  .button.size-3 {
    height: 32px;
  }

  .button.size-4 {
    height: 40px;
  }

  .button.is-disabled {
    cursor: not-allowed;
    color: #445c7f;
    background-color: #e8ebf3;
  }

  .button.is-fullwidth {
    width: 100%;
  }
</style>
