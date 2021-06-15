<template>
  <div class="ProfilePage container-fluid">
    <div class="Profile row p-3 justify-content-center">
      <div class="col-4 card d-flex">
        <img :src="activeProfile.picture" class="img-fluid rounded-circle m-2">
        <h4 class="text-center m-1">
          {{ activeProfile.name }}
        </h4>
      </div>
      <div class="col-6">
        <img :src="activeProfile.coverImg" class="img-fluid">
      </div>
    </div>
    <Thread />
    <Sponsor v-for="sponsor in state.sponsor" :key="sponsor.id" :sponsor="sponsor" />
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { computed, onMounted } from '@vue/runtime-core'
import { profileService } from '../services/ProfileService'
import { postsService } from '../services/PostsService'
import Notification from '../utils/Notification'
import { AppState } from '../AppState'
import Thread from '../components/Thread.vue'
export default {
  name: 'ProfilePage',
  setup() {
    const route = useRoute()
    const state = reactive({
      sponsor: computed(() => AppState.sponsor),
      older: computed(() => AppState.activeProfile.older),
      newer: computed(() => AppState.activeProfile.newer)
    })
    onMounted(async() => {
      try {
        await profileService.getProfile(route.params.id)
        await postsService.getProfilePosts(route.params.id)
      } catch (error) {
        Notification.toast('Unable to find this User', 'warning', 'center')
      }
    })
    return {
      state,
      async next(url) {
        try {
          await postsService.next(url)
        } catch (error) {
        }
      },
      account: computed(() => AppState.account),
      activeProfile: computed(() => AppState.activeProfile)
    }
  },
  components: { Thread }
}
</script>

<style lang="scss" scoped>

</style>
