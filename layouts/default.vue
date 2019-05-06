<template>
  <div :class="readMode" style="height: 100vh;">
    <section class="main-site">
      <blog-header @night-mode="changeReadMode($event)" />
      <nuxt />
    </section>
  </div>
</template>

<script>
import BlogHeader from '~/components/organisms/BlogHeader'
import { mapState, mapMutations } from 'vuex'
export default {
  components: {
    BlogHeader
  },
  data() {
    return {
      preload: true
    }
  },
  computed: {
    ...mapState(['readMode'])
  },

  mounted() {
    this.preload = false
    this.setReadMode(this.preload)
  },
  methods: {
    ...mapMutations(['setReadMode']),
    changeReadMode(nightMode) {
      this.setReadMode(nightMode)
    }
  }
}
</script>

<style lang="scss">
.main-site {
  max-width: 42rem;
  padding: 2.625rem 1.3125rem;
  margin: 0 auto;
}
.night {
  transition: color 0.2s ease-out, background 0.2s ease-out;
  background-color: #363636;
  color: white;
}

.day {
  transition: color 0.2s ease-out, background 0.2s ease-out;
  background-color: white;
  color: #363636;
}
</style>
