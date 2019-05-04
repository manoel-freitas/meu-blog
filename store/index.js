export const state = () => ({
  selectedPost: {}
})

export const mutations = {
  selectPost(state, post) {
    state.selectedPost = post
  }
}
