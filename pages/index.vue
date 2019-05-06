<template>
  <main
    class="container main-site"
    style="margin-top: 40px; margin-bottom: 50px;"
    :class="readMode"
  >
    <blog-bio />
    <section id="articles">
      <article
        v-for="post in posts"
        :key="post.id"
        class="media"
        style="margin-top: 30px"
      >
        <div class="media-content">
          <blog-post-content :post="post" :is-summary="true" />
          <button
            class="button is-large is-info is-outlined"
            @click="choosePost(post)"
          >
            Continuar Lendo
          </button>
        </div>
      </article>
    </section>
  </main>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import BlogBio from '~/components/molecules/BlogBio'
import BlogPostContent from '~/components/molecules/BlogPostContent'

export default {
  components: {
    BlogBio,
    BlogPostContent
  },
  computed: {
    ...mapState(['readMode'])
  },
  async asyncData({ app, error }) {
    const document = await app.$prismic.api.query(
      app.$prismic.predicates.at('document.type', 'blog-')
    )
    return {
      posts: document.results.map(result => {
        return {
          meta: {
            id: result.id,
            uid: result.uid,
            lang: result.lang,
            publicationDate: app.$prismic.asDate(result.first_publication_date),
            tags: result.tags
          },
          image: {
            url: result.data.post_image.url,
            alt: result.data.post_image.alt
          },
          title: app.$prismic.asText(result.data.post_title),
          content: app.$prismic.asText(result.data.post_content)
        }
      })
    }
  },

  methods: {
    ...mapMutations(['selectPost']),
    choosePost(post) {
      this.selectPost(post)
      this.$router.push(`/post/${post.meta.uid}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.night {
  .title,
  strong,
  .content {
    color: white;
    h1 {
      color: white;
    }
  }
}
</style>
