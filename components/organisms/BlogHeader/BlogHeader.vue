<template>
  <section class="container" :class="readMode">
    <div class="columns">
      <div class="column">
        <h1 class="title">
          <nuxt-link to="/" exact>Dev Celestino</nuxt-link>
        </h1>
      </div>
      <div class="column">
        <theme-switch @nightMode="$emit('night-mode', $event)" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import ThemeSwitch from '~/components/atoms/BlogThemeSwitch'
export default {
  components: {
    ThemeSwitch
  },
  computed: {
    ...mapState(['readMode'])
  }
}
</script>

<style lang="scss" scoped>
.night {
  .title {
    a {
      color: white;
    }
  }
}
.day {
  .title {
    a {
      color: #363636;
    }
  }
}
</style>
