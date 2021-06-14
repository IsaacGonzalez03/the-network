<template>
  <div class="row justify-content-center">
    <div class="col-6 card">
      <div class="sponsor">
        <img :src="sponsor.square" class="sponsor">
      </div>
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
  min-height: 25vh;
  min-width: 25vw;
}
</style>
