<template>
  <div class="card">
    <div class="float-right py-1 mb-2">
      <i v-if="state.account.id === post.creatorId" @click="deletePost" class="fas fa-trash-alt text-danger float-right"></i>
    </div>
    <img :src="post.imgUrl" class="img-fluid rounded">
    <div>
      <p>
        {{ post.body }}
      </p>
    </div>
    <router-link :to="{name:'ProfilePage',params:{id: post.creatorId}}">
      <div @click="setProfile(post.creatorId)">
        <img :src="post.profilePic" class="img-fluid rounded-circle sm-img">
      </div>
    </router-link>
    <div class="float-right">
      <i class="far fa-star" @click="likePost"></i>{{ post.likes.length }}
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { postsService } from '../services/PostsService'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { profileService } from '../services/ProfileService'
export default {
  name: 'Post',
  props: {
    post: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      activeProfile: computed(() => AppState.activeProfile)
    })
    return {
      state,
      async deletePost() {
        await postsService.deletePost(props.post.id)
      },
      async setProfile(id) {
        try {
          await profileService.getProfile(id)
        } catch (error) {
        }
      },
      async likePost() {
        await postsService.likePost(props.post.id)
      }
    }
  }
}
</script>

<style scoped>
.sm-img{
  height: 2em;
  width: 2em;
}

</style>
