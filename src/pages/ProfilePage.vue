<template>
  <div class="ProfilePage container-fluid">
    <div class="Profile row justify-content-center p-3">
      <div class="col-8">
        <img :src="activeProfile.picture" class="img-fluid rounded-circle">
      </div>
      <h4>{{ activeProfile.name }}</h4>
    </div>
    <Thread />
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
      async next() {
        try {
          await postsService.getPosts()
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
