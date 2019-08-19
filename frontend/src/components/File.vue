<template>
    <div class="file" :class="{ 'file--active': active }">
      <div class="file__container">
        <img class="file__img" :src="`${file.url}`" :alt="file.name">
      </div>
      <div class="file__name">{{ file.name }}</div>
      <div class="file__checkbox">
        <input 
            @change="$emit('select', $event, file)"
            type="checkbox" 
            name="item-checkbox"
            :id="file.id" 
        />
      </div>
    </div>
</template>

<script>
export default {
    name: 'File',
    props: {
        file: {
            type: Object,
            default: false,
        },
        active: {
            type: Boolean,
            default: false,
        },
    },
}
</script>

<style>
.file {
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
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

.file--active .file__container  {
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
</style>