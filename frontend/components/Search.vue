<template>
  <div class="search">
    <v-textbox v-model="query" placeholder="Search..." />
  </div>
</template>

<script>
import VTextbox from '~/components/Textbox'
export default {
  components: { VTextbox },
  data () {
    return {
      query: ''
    }
  }
}
</script>

<style>
.search {
  width: 50%;
}
</style>
