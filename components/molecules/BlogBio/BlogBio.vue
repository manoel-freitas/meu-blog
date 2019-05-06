<template>
  <section id="my-info">
    <article class="media">
      <div class="media-left">
        <figure class="image is-64x64">
          <img class="is-rounded" src="~/assets/eu.png" />
        </figure>
      </div>
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
  </section>
</template>

<script>
export default {}
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
