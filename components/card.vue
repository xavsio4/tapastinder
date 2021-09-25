<template>
  <div v-if="showing" class="card">
    <div
      class="image"
      v-bind:style="{ backgroundImage: returnImageString }"
    ></div>
    <h1 class="name hidden">{{ nom_es }}</h1>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    current: {
      type: Boolean,
      required: true,
    },
    nom_es: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: false,
    },
    approved: {
      type: Boolean,
    },
  },
  data() {
    return {
      showing: true,
      maxStars: 5,
      animating: true, // Controls CSS class with transition declaration
      threshold: window.innerWidth / 3, // Breakpoint distance to approve/reject a card
      maxRotation: 20, // Max rotation value in degrees
      position: {
        x: 0,
        y: 0,
        rotation: 0,
      },
      icon: {
        opacity: 0,
        type: null,
      },
    }
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
  },
  computed: {
    returnImageString: function () {
      return 'url(' + this.picture + ')'
    },
    returnTransformString: function () {
      if (this.animating === false || this.approved !== null) {
        const x = this.position.x
        const y = this.position.y
        const rotate = this.position.rotation
        return (
          'translate3D(' + x + 'px, ' + y + 'px, 0) rotate(' + rotate + 'deg)'
        )
      } else {
        return null
      }
    },
  }, //computed
}
</script>
<style scoped>
.image {
  clip-path: circle(35% at 50% 50%);
}
</style>
