<template>
  <button :class="classes" :disabled="disabled" class="button" v-on="$listeners">
    <slot />
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
    icon: Boolean
  },
  computed: {
    classes () {
      return [
        'button',
        `button--size-${this.size}`,
        `button--${this.appearance}`,
        { 'button--disabled': this.disabled },
        { 'button--fullwidth': this.fullwidth },
        { 'button--icon': this.icon }
      ]
    }
  }
}
</script>

<style>
  .button {
    display: inline-block;
    font-size: 16px;
    font-family: inherit;
    font-weight: 600;
    cursor: pointer;
    border: none;
    background-color: transparent;
    border-radius: 3px;
    transition: background-color 100ms ease-in-out;
  }

  .button--primary {
    background-color: var(--primary);
    color: white;
  }

  .button--primary:hover {
    background-color: darkblue;
  }

  .button--subtle {
    color: var(--text-secondary);
    background-color: transparent;
  }

  .button--subtle:hover {
    color: black;
    background-color: var(--gray-200);
  }

  .button--size-1 {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 24px;
    padding: 0;
    width: 24px;
  }

  .button--size-3 {
    height: 40px;
    padding: 0 12px;
  }

  .button--size-4 {
    height: 48px;
    padding: 0 16px;
  }

  .button--icon {
    padding: 0;
  }

  .button--disabled {
    cursor: not-allowed;
    color: #445c7f;
    background-color: #e8ebf3;
  }

  .button--fullwidth {
    width: 100%;
  }
</style>
