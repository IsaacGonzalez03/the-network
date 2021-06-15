<template>
  <div class="row justify-content-center">
    <div class="col-8 card">
      <img :src="sponsor.banner" class="sponsor">
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
  name: 'Sponsor',
  props: {
    sponsor: { type: Object, required: true }
  },
  setup() {
    const state = reactive({
    })
    return { state }
  }
}
</script>

<style lang="scss" scoped>
.sponsor{
  min-height: 5vh;
  min-width: 5vw;
}
</style>
