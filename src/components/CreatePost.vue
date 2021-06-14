<template>
  <div class="row justify-content-center">
    <div class="col-6 my-3">
      <form @submit.prevent="createPost" class="p-1 bg-light">
        <input type="text" v-model="state.newPost.imgUrl" placeholder="img url..." class="form-control my-1" required>
        <div class="input-group">
          <input v-model="state.newPost.body" class="form-control" aria-label="textarea" placeholder="what's on your mind?" required>
        </div>
        <button class="btn btn-primary m-1">
          Post
          <i class="fab fa-telegram-plane"></i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { postsService } from '../services/PostsService'
import Notification from '../utils/Notification'
export default {
  name: 'CreatePost',
  setup() {
    const state = reactive({
      newPost: {}
    })
    return {
      state,
      async createPost() {
        try {
          await postsService.createPost(state.newPost)
        } catch (error) {
          Notification.toast(error, 'error')
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
