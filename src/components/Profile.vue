<template>
  <div class="Profile row justify-content-center p-3">
    <div class="col-8">
      <img :src="profile.picture" class="img-fluid rounded-circle">
    </div>
    <h4>{{ profile.name }}</h4>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { computed, onMounted } from '@vue/runtime-core'
export default {
  name: 'Profile',
  props: {
    profile: { type: Object, required: true }
  },
  setup() {
    onMounted(() => {
    })
    return {
      activeProfile: computed(() => AppState.activeProfile)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
