<template>
  <div>
    <nav><logo></logo></nav>
    <main>
      <h1 class="text-center" v-show="!this.isEnd">
        Quelles Tapas mangeriez-vous ?
      </h1>

      <!-- <tapatin v-on:myEvent="showbutton()" :key="componentKey"></tapatin> -->
      <swiper v-on:myEvent="showbutton()" :key="componentKey"></swiper>

      <div class="text-center">
        <h3 v-show="this.isEnd" class="text-center mt-10">
          Ne soyez plus débousolé dans les bars à Tapas d'Espagne, emportez la
          <a href="https://tapatotheque.com" target="_blank">Tapatotheque</a>
          avec vous.
        </h3>
        <button
          v-show="this.isEnd"
          class="
            bg-blue-500
            hover:bg-blue-700
            text-white
            font-bold
            py-2
            px-4
            rounded-full
            mb-20
          "
          @click="reunion()"
        >
          Recharger de nouvelles cartes
        </button>
      </div>
    </main>
    <footerr></footerr>
  </div>
</template>

<script>
import Footerr from '@/components/Footer.vue'
// import Tapatin from '@/components/tapatin.vue'

export default {
  components: {
    Footerr,
    // Tapatin,
  },
  data() {
    return {
      componentKey: 0,
      isEnd: false,
    }
  },
  methods: {
    showbutton: function () {
      this.isEnd = true
    },
    scrollToTop: function () {
      window.scrollTo(0, 0)
    },
    reunion: function () {
      this.isEnd = false
      this.componentKey += 1
      this.scrollToTop()
    },
  },
}
</script>
