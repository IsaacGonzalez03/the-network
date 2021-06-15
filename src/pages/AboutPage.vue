<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-4 my-3">
        <form @submit.prevent="search(state.query)" class="form-control">
          <input v-model="state.query" placeholder="search..." type="text">
          <button class="btn btn-primary">
            <i class="fas fa-search"></i>
          </button>
        </form>
      </div>
    </div>
    <div class="row justify-content-center">
      <Sponsor v-for="sponsor in state.sponsor" :key="sponsor.id" :sponsor="sponsor" />
      <div class="col-9 m-4">
        <div class="about">
          <div v-if="state.posts.length>0">
            <Post v-for="post in state.posts" :key="post.id" :post="post" />
          </div>
          <div v-else>
            <p>No Post results</p>
          </div>
          <div v-if="state.profiles.length>0">
            <Profile v-for="profile in state.profiles" :key="profile.id" :profile="profile" />
          </div>
          <div v-else>
            <p>No User results</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import Profile from '../components/Profile.vue'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  components: { Profile },
  name: 'AboutPage',
  setup() {
    const state = reactive({
      sponsor: computed(() => AppState.sponsor),
      posts: computed(() => AppState.postSearch),
      profiles: computed(() => AppState.profileSearch)
    })
    return { state }
  }
}
</script>
