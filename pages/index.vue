<template>
  <main
    class="container main-site"
    style="margin-top: 40px; margin-bottom: 40px;"
  >
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Dev Celestino</h1>
          <article class="media">
            <figure class="media-left">
              <p class="image is-96x96">
                <img
                  class="is-rounded"
                  src="https://pt.gravatar.com/userimage/114364901/5ea51dd87aa6c100bec2b126515430d4.png"
                />
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>
                    Blog pessoal do
                    <a href="https://twitter.com/manoel_jfneto" class="is-link"
                      >Manoel Freitas</a
                    >
                  </strong>
                  <br />
                  <small>@manoel_jfneto</small>
                  <br />
                  <small>Minhas experiências pessoais podem te ajudar</small>
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
    <section id="articles" style="padding-left: 16px; padding-right: 16px">
      <article
        v-for="post in posts"
        :key="post.id"
        class="media"
        style="margin-top: 30px"
      >
        <div class="media-content">
          <div class="content">
            <h1 class="has-text-centered">{{ post.title }}</h1>
            <figure class="image is-2by1">
              <img :src="post.image.url" :alt="post.image.alt" />
            </figure>
            <small>{{ post.meta.publicationDate }} -</small>
            <small>5 min de leitura</small>
            <br />
            <p>{{ post.summary }}</p>
            <button
              class="button is-large is-info is-outlined"
              @click="choosePost(post)"
            >
              Continuar Lendo
            </button>
          </div>
        </div>
      </article>
    </section>
  </main>
</template>

<script>
import truncate from 'lodash/truncate'
import { mapMutations } from 'vuex'
export default {
  async asyncData({ app, error }) {
    const document = await app.$prismic.api.query(
      app.$prismic.predicates.at('document.type', 'blog-')
    )
    return {
      posts: document.results.map(result => {
        return {
          meta: {
            id: result.id,
            lang: result.lang,
            publicationDate: app.$prismic.asDate(result.first_publication_date),
            slug: result.slugs[0],
            tags: result.tags
          },
          image: {
            url: result.data.post_image.url,
            alt: result.data.post_image.alt
          },
          title: app.$prismic.asText(result.data.post_title),
          summary: truncate(app.$prismic.asText(result.data.post_content), {
            length: 200,
            omission: ' [...]'
          }),
          content: app.$prismic.asHtml(result.data.post_content)
        }
      })
    }
  },
  methods: {
    ...mapMutations(['selectPost']),
    choosePost(post) {
      this.selectPost(post)
      this.$router.push(`/post/${post.meta.slug}`)
    }
  }
}
</script>

<style scoped>
.main-site {
  max-width: 700px;
  margin: 0 auto;
}
</style>
