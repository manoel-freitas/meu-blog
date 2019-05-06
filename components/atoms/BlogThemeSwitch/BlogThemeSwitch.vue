<template>
  <div class="switch__container">
    <input
      id="theme-toggle"
      v-model="nightMode"
      type="checkbox"
      @change="$emit('nightMode', nightMode)"
    />
    <label for="theme-toggle">
      <span></span>
    </label>
  </div>
</template>

<script>
import { getData, setData } from 'nuxt-storage/local-storage'

export default {
  data: function() {
    return {
      nightMode: getData('nightMode') || false
    }
  },
  watch: {
    nightMode: function() {
      setData('nightMode', JSON.stringify(this.nightMode))
    }
  }
}
</script>

<style scoped lang="scss">
$toggle-size: 32px;
$switch-font-size: 32px;
$switch-w: 65px;
$switch-h: 40px;
$switch-handle-scale: 0.65;
$switch-off-handle-x: 0px;
$switch-on-handle-x: 3px;
$switch-off-handle-y: -3px;
$switch-on-handle-y: -3px;
$switch-transition-duration: 0.2s;
#theme-toggle {
  display: none;

  & + label {
    font-size: $toggle-size;
    display: flex;
    height: $switch-h;
    width: $switch-w;
    border-radius: 1rem;
    background-size: auto 8em;
    background-position: bottom;
    background-image: linear-gradient(
      180deg,
      #021037 0%,
      #20206a 19%,
      #4184b1 66%,
      #62e7f7 100%
    );
    transition: $switch-transition-duration;
    border: 0.125em solid hsl(207, 30%, 95%);
    overflow: hidden;

    span {
      background: #fffad8;
      border-radius: 50%;
      height: $switch-h;
      width: $switch-w;
      transform: translateX($switch-off-handle-x) scale($switch-handle-scale);
      transform: translateY($switch-off-handle-y) scale($switch-handle-scale);
      transition: $switch-transition-duration;
      cursor: pointer;
      box-shadow: 0 0 0.25em 0.0625em #fbee8d, 0 0 2em 0 #ffeb3b,
        inset -0.25em -0.25em 0 0 #fbee8e,
        inset -0.3125em -0.3125em 0 0.625em #fff5b2;
      // margin-top: $switch-off-handle-x;
    }
  }

  &:checked {
    font-size: $switch-font-size;

    & + label {
      background-position: top;
      border-color: hsl(207, 30%, 50%);

      span {
        background: transparent;
        transform: translateX($switch-on-handle-x) scale($switch-handle-scale);
        transform: translateY($switch-on-handle-y) scale($switch-handle-scale);
        box-shadow: inset -0.1875em -0.1875em 0 0 #fbe7ef,
          inset -0.5625em -0.5625em 0 0 #fffff7;
      }
    }
  }
}
</style>
