<template>
  <div class="row justify-content-center">
    <div class="col-6">
      <Post v-for="post in posts" :key="post.id" :post="post" />
    </div>
    <div class="col-3">
    </div>
  </div>
</template>

<script>
import { postsService } from '../services/PostsService'
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { sponsorService } from '../services/SponsorService'
export default {
  setup() {
    const state = reactive({
      user: computed(() => AppState.user)
    })
    onMounted(async() => {
      try {
        await postsService.getPosts()
        await sponsorService.getSponsors()
      } catch (error) {

      }
    })
    return {
      state,
      posts: computed(() => AppState.posts),
      sponsor: computed(() => AppState.sponsor)
    }
  }
}
</script>

<style>

</style>
