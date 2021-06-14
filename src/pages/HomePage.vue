<template>
  <div class="home container-fluid">
    <div class="row justify-content-center">
      <div class="col-4 my-3">
        <form @submit.prevent="search(state.query)" class="form-control">
          <input v-model="state.query" type="text">
          <button class="btn btn-primary">
            <i class="fas fa-search"></i>
          </button>
        </form>
      </div>
    </div>
    <Sponsor v-for="sponsor in state.sponsor" :key="sponsor.id" :sponsor="sponsor" />
    <CreatePost />
    <div class="row justify-content-center">
      <div class="col-2">
        <button class="btn-btn-primary my-2" v-if="state.newer" @click="next(state.newer)">
          Next Page
        </button>
        <button class="btn btn-primary my-2" v-if="state.older" @click="next(state.older)">
          Previous Page
        </button>
      </div>
    </div>
    <Thread />
  </div>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { sponsorService } from '../services/SponsorService'
import { postsService } from '../services/PostsService'
import { profileService } from '../services/ProfileService'

export default {
  name: 'Home',
  setup() {
    const state = reactive({
      sponsor: computed(() => AppState.sponsor),
      query: '',
      older: computed(() => AppState.older),
      newer: computed(() => AppState.newer)
    })
    onMounted(async() => {
      try {
        await sponsorService.getSponsors
      } catch (error) {
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
      async search(query) {
        try {
          await postsService.searchPost(query)
          await profileService.searchProfile(query)
        } catch (error) {
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
