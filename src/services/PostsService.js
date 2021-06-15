import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import { api } from './AxiosService'

class PostsService {
  async getPosts() {
    const res = await api.get('https://bcw-sandbox.herokuapp.com/api/posts')
    AppState.posts = res.data.posts
    AppState.older = res.data.older
    AppState.newer = res.data.newer
    logger.log(res.data)
  }

  async next(url) {
    const res = await api.get(url)
    AppState.posts = res.data.posts
    AppState.older = res.data.older
    AppState.newer = res.data.newer
  }

  async getProfilePosts(id) {
    const res = await api.get(`api/profiles/${id}/posts`)
    AppState.posts = res.data.posts
    AppState.older = res.data.older
    AppState.newer = res.data.newer
  }

  async createPost(newPost) {
    const res = await api.post('api/posts', newPost)
    logger.log('new post', res.data)
    this.getPosts()
  }

  async deletePost(id) {
    await api.delete('api/posts/' + id)
    this.getPosts()
  }

  async likePost(id) {
    await api.post(`api/posts/${id}/like`)
    this.getPosts()
  }

  async searchPost(query) {
    const res = await api.get(`api/posts?query=${query}`)
    AppState.postSearch = res.data.posts
  }
}

export const postsService = new PostsService()
