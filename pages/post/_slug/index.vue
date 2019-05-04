<template>
  <main
    class="container main-site"
    style="margin-top: 40px; margin-bottom: 40px;"
  >
    <div class="hero">
      <div class="hero-body">
        <h1 class="title">{{ post.title }}</h1>
        <figure class="image is-2by1">
          <img :src="post.image.url" :alt="post.image.alt" />
        </figure>
        <small>{{ post.meta.publicationDate }} -</small>
        <small>5 min de leitura</small>
      </div>
    </div>
    <div class="content">
      <div v-html="post.content"></div>
    </div>
  </main>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState({
      post: 'selectedPost'
    })
  },
  destroyed() {
    this.selectPost({})
  },
  methods: {
    ...mapMutations(['selectPost'])
  }
}
</script>

<style scoped>
.main-site {
  max-width: 700px;
  margin: 0 auto;
}
</style>
