import { getData } from 'nuxt-storage/local-storage'
export const state = () => ({
  selectedPost: undefined,
  readMode: getData('nightMode') || 'day'
})

export const mutations = {
  selectPost(state, post) {
    state.selectedPost = post
  },
  setReadMode(state, readMode) {
    state.readMode = readMode ? 'night' : 'day'
  }
}
