<template>
  <div class="content" :class="readMode">
    <h1>{{ actualPost.title }}</h1>

    <figure class="image is-2by1">
      <img :src="actualPost.image.url" :alt="actualPost.image.alt" />
    </figure>
    <strong>
      <small>{{ actualPost.publishedDate }} -</small>
      <small>{{ actualPost.timeToRead }} min de leitura</small>
    </strong>
    <br />
    <p class="content" v-html="actualPost.text"></p>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import truncate from 'lodash/truncate'
import timeToRead from '~/helpers/TimeToRead'
import { mapState } from 'vuex'
export default {
  props: {
    post: {
      type: Object,
      default: () => {}
    },
    isSummary: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState(['readMode']),
    actualPost() {
      return {
        publishedDate: dayjs(this.post.meta.publicationDate).format(
          'DD/MM/YYYY'
        ),
        image: this.post.image,
        text: this.isSummary
          ? truncate(this.post.content, {
              length: 200,
              omission: ' [...]'
            })
          : this.post.content,
        timeToRead: timeToRead(this.post.content),
        title: this.post.title
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.night.content {
  h1 {
    color: white;
  }
}
</style>
