<template>
  <section class="blog-post">
    <img :src="image.url" :alt="image.alt" />
    <h1 class="title">{{ title }}</h1>
    <p class="paragraph">{{ content }}</p>
  </section>
</template>

<script>
export default {
  async asyncData({ app, error }) {
    const document = await app.$prismic.api.getSingle('blog-')
    // eslint-disable-next-line no-console
    console.log({ document })
    const title = app.$prismic.asText(document.data.post_title)
    const content = app.$prismic.asText(document.data.post_content)
    const image = {
      url: document.data.post_image.url,
      alt: document.data.post_image.alt
    }

    return {
      title,
      content,
      image
    }
  }
}
</script>

<style scoped>
.blog-post {
  margin: 25px 0;
  padding: 0 100px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.title {
  margin: 50px 0;
}
p {
  color: #000;
  margin: 25px 0;
  max-width: 450px;
  line-height: 1.44;
}
</style>
