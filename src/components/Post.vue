<template>
  <div class="row card shadow my-1">
    <div class="col">
      <div title="delete" class="d-flex float-right p-2 m-2">
        <i v-if="state.account.id === post.creatorId" @click="deletePost" class="fas fa-trash-alt text-danger float-right"></i>
      </div>
      <div>
        <img :src="post.imgUrl" class="img-fluid w-100 rounded">
      </div>
      <div class="text-center my-1">
        <p>
          {{ post.body }}
        </p>
      </div>
      <router-link :to="{name:'ProfilePage',params:{id: post.creatorId}}">
        <div class="mx-1">
          <span @click="setProfile(post.creatorId)">
            <img :src="post.creator.picture" class="img-fluid rounded-circle sm-img">
          </span>
          <span class="mx-1">{{ post.creator.name }}</span>
        </div>
      </router-link>
      <div class="">
        <i class="float-right far fa-star mx-2" @click="likePost">{{ post.likes.length }}</i>
      </div>
      <div class="m-1 p-1 text-right">
        {{ new Date(post.createdAt).toLocaleString('en', options) }}
      </div>
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
      },
      options: {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit'
      }
    }
  }
}
</script>

<style scoped>
.sm-img{
  height: 4em;
  width: 4em;
}
.star:hover{
  text-decoration: none;
  color: rgba(187, 135, 135, 0.8);
  background: rgb(145, 92, 182);
  padding: .5rem .5rem;
  border-radius: .5rem,.5rem;
  font-weight: normal;
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;
}
</style>
