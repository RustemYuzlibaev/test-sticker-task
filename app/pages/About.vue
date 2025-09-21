<template>
  <div class="about">
    <Sticker />
    <section v-for="section in 20" class="block">
      {{ `Section ${section}` }}
    </section>
  </div>
</template>

<style lang="scss" scoped>
.about {
  margin: 0 auto;
  text-align: center;
  padding: $basic-spacing;

  .block {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border: 1px solid $white;
    background-color: $card-background-color;
    border-radius: $border-radius;
    margin: $basic-spacing $basic-spacing * 4;
    font-size: $font-size-big;
    height: 250px;
  }
}
</style>
