<template>
  <main
    class="container main-site"
    style="margin-top: 40px; margin-bottom: 40px;"
  >
    <div class="hero">
      <div class="hero-body" :class="readMode">
        <h1 class="title" :class="readMode">{{ post.title }}</h1>
        <figure class="image is-2by1">
          <img :src="post.image.url" :alt="post.image.alt" />
        </figure>
        <small>{{ post.meta.publicationDate }} -</small>
        <small>5 min de leitura</small>
      </div>
    </div>
    <div class="content" :class="readMode">
      <div v-html="post.content"></div>
    </div>
  </main>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState({
      post: 'selectedPost',
      readMode: 'readMode'
    })
  },
  async fetch({ app, route, store }) {
    if (store.selectedPost) {
      return
    }
    const document = await app.$prismic.api.getByUID('blog-', route.params.slug)
    store.commit('selectPost', {
      meta: {
        uid: document.uid,
        lang: document.lang,
        publicationDate: app.$prismic.asDate(document.first_publication_date),
        tags: document.tags
      },
      image: {
        url: document.data.post_image.url,
        alt: document.data.post_image.alt
      },
      title: app.$prismic.asText(document.data.post_title),
      content: app.$prismic.asHtml(document.data.post_content)
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
