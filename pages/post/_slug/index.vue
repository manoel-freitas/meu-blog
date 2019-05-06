<template>
  <main
    class="container main-site"
    style="margin-top: 40px; margin-bottom: 40px;"
  >
    <blog-post-content :post="post" />
    <AddThis public-id="ra-5cd0a0fad4f9110a" />

    <div class="comments">
      <vue-disqus
        shortname="devcelestino"
        identifier="slug_post_page"
        :url="$route.query.page"
      ></vue-disqus>
    </div>
  </main>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import BlogPostContent from '~/components/molecules/BlogPostContent'
import AddThis from 'vue-simple-addthis-share'
export default {
  components: {
    BlogPostContent,
    AddThis
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
