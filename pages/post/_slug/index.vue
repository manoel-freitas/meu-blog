<template>
  <main
    class="container main-site"
    style="margin-top: 40px; margin-bottom: 40px;"
  >
    <blog-post-content :post="post" />
  </main>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import BlogPostContent from '~/components/molecules/BlogPostContent'
export default {
  components: {
    BlogPostContent
  },
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
