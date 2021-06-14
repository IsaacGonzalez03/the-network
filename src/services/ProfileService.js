import { router } from '../router'

const { AppState } = require('../AppState')
const { api } = require('./AxiosService')

class ProfileService {
  async getProfile(id) {
    const res = await api.get('api/profiles/' + id)
    AppState.activeProfile = res.data
    const res2 = await api.get(`api/profiles/${id}/posts`)
    AppState.posts = res2.data.posts
  }

  async searchProfile(query) {
    const res = await api.get(`api/profiles?query=${query}`)
    AppState.profileSearch = res.data
    router.push({ name: 'About' })
  }
}

export const profileService = new ProfileService()
