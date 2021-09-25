<template>
  <div id="swiper">
    <div v-show="!this.isSummary" class="grid grid-cols-1 mx-auto">
      <img
        id="backgroundimage"
        src="~/assets/img/table.png"
        border="0"
        class="justify-center place-items-center col-auto"
        alt="TapasTinder Table"
      />

      <div
        class="
          cardcontrol
          flex
          justify-center
          place-items-center
          pt-2
          col-auto
          pl-2
        "
        style="margin-top: -710px"
      >
        <button class="btntortilla pr-4">
          <arrow-left></arrow-left>
        </button>
        <div class="animated fadeInRightBig cardcounter" v-if="cardcount > 0">
          il vous reste
          <transition name="slide-fade" mode="out-in"
            ><span class="cardcount" :key="cardcount">{{
              cardcount
            }}</span></transition
          >
          tapas à trier
        </div>
        <button class="btntortilla pl-3 animated slideInRight">
          <arrow-right></arrow-right>
        </button>
      </div>
      <div v-show="isLoading" class="mx-auto">
        <img src="~assets/img/rings.svg" width="150" alt="" />
      </div>
      <inter
        v-for="(card, index) in cards.data"
        v-on:swipe="onSwipe"
        class="mx-auto"
        style="margin-top: -350px"
        ><card
          :current="index === cards.index"
          :nom_es="card.nom_es"
          :picture="card.picture"
          :approved="card.approved"
          class=""
        >
        </card
      ></inter>
    </div>
    <div
      v-show="isSummary"
      class="
        flex
        mx-auto
        bg-gray-500 bg-blend-soft-light
        p-2
        m-4
        rounded-xl
        border-4 border-black
      "
      id="tapasummary"
    >
      <div class="animated slideInUp bg-gray-300 px-4">
        <h2 class="text-red-500 stroke-current text-2xl">
          Dommage, Vous allez rater...
        </h2>

        <ul class="list-unstyled">
          <li class="mt-4" v-for="(choice, index) in cardsChoice" :key="choice">
            <span v-if="choice == false">
              <div>
                <figure>
                  <img
                    :src="cards.data[index].picture"
                    class="
                      rounded-md
                      border-gray-50 border-2
                      img-thumbnail img-fluid
                    "
                    width="130"
                    height="130"
                  />
                </figure>
                <div>
                  <span class="tapaname">{{ cards.data[index].nom_es }}</span>
                  <p class="description">{{ cards.data[index].description }}</p>
                </div>
              </div>
            </span>
          </li>
        </ul>
      </div>

      <div class="animated slideInUp px-4">
        <h2 class="text-2xl">Vous avez choisi de manger</h2>

        <ul class="list-unstyled">
          <li class="mt-4" v-for="(choice, index) in cardsChoice" :key="choice">
            <span v-if="choice == true">
              <div class="media">
                <figure class="pull-left">
                  <img
                    :src="cards.data[index].picture"
                    class="rounded-md border-gray-50 border-2"
                    width="130"
                    height="130"
                  />
                </figure>
                <div class="media-body">
                  <span class="tapaname">{{ cards.data[index].nom_es }} </span>
                  <p class="description">{{ cards.data[index].description }}</p>
                </div>
              </div>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import card from './card.vue'
import Inter from './Inter.vue'

export default {
  name: 'App',
  components: {
    card,
    Inter,
  },
  data: function () {
    return {
      isLoading: true, // Toggles the loading overlay
      isSummary: false,
      cards: {
        data: null, // Array for card data
        index: 0, // Current index in the cards.data array
        max: 10, // Max cards to show in each stack
      },
      isVisible: true,
      index: 0,
      config: {},
      cardsChoice: [],
      cardcount: 0,
      // componentKey: 0,
    }
  },
  mounted() {
    this.getTapas()
  },
  methods: {
    getSummary() {
      this.isSummary = true
    },
    async getTapas() {
      this.isSummary = false
      let faqUrl = this.$config.baseAPI
      this.isLoading = true
      this.cardsChoice = []
      this.cardcount = 0

      await this.$axios
        .$get(faqUrl)
        .then((response) => {
          console.log(response)
          this.cards.data = response
        })
        .catch((error) => {
          this.errored = true
        })
        .finally(() => {
          this.isLoading = false
          this.cardcount = this.cards.data.length
        })
    },
    onSwipe(direction) {
      //accepted
      if (direction === 'swipe-right') {
        this.cardsChoice[this.cards.index] = true
        this.cards.data[this.cards.index].approved = true
      } else {
        this.cardsChoice[this.cards.index] = false
        this.cards.data[this.cards.index].approved = false
      }
      console.log(this.cardsChoice)

      console.log(this.cards.index)
      this.cardcount--
      this.cards.index++
      if (this.cards.index >= 5) {
        console.log('paf')
        this.getSummary()
        this.$emit('myEvent')
      }
      setTimeout(() => {
        // this.cards.data.pop()
      }, 300)
    },
  },
}
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.2s ease;
}
.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.tapacount {
  font-size: 24px;
}

.cardcount {
  border-radius: 8px;
  background-color: darkslategray;
  font-size: 15px;
  padding: 6px;
}

.cardcounter {
  width: 154px;
  /* margin: 0 auto;
  margin-top: 28px; */
}

.tapaname {
  font-size: 18px;
  letter-spacing: 0.3rem;
}

.description {
  color: black;
  background-color: #fff;
  padding: 6px;
  min-height: 30px;
  letter-spacing: 1px;
}

/* #tapasummary {
  margin-top: 10px;
  display: block;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
} */

/* CONSTANTS */
/* COLOURS */
/* EXTENDS */
/*.card > .image,
.card > .stars > .star-active,
.card > .stars > .star-inactive {
  background: center center no-repeat transparent;
  background-size: contain;
}*/

/*.card-container {
  margin: 140px auto 0 auto;
  width: 390px;
  height: 410px;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}*/

/* LOADING */
/* .loading > .loading-icon,
.loading > .loading-icon:before,
.loading > .loading-icon:after {
  width: 300px;
  height: 300px;
  margin: 0 auto;
  border-radius: 50%;
  border: 4px solid #ffffff;
} */

.loading {
  margin: 0 auto;
  z-index: 10;
  position: fixed;
  width: 100%;
  height: 100%;
  margin-top: -230px;
  z-index: 22;
}

/* .loading > .loading-icon {
  width: 128px;
  height: 128px;
}

.loading > .loading-icon:before,
.loading > .loading-icon:after {
  content: '';
  display: block;
}

.loading > .loading-icon:before {
  z-index: 0;
  -webkit-animation: 1s pulse infinite linear;
  animation: 1s pulse infinite linear;
} */

/* @-webkit-keyframes pulse {
  0% {
    opacity: 0;
    -webkit-transform: scale(0.8);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    -webkit-transform: scale(1.5);
  }
} */
/* @keyframes pulse {
  0% {
    opacity: 0;
    -webkit-transform: scale(0.8);
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    -webkit-transform: scale(1.5);
    transform: scale(1.5);
  }
} */
/* CARD */
.card {
  /* pointer-events: none;*/
  z-index: -1;
  opacity: 0;
  left: 5px;
  top: 0;
  /* margin-top: 120px;*/
  position: absolute;
  /* padding: 15px 15px 30px 15px;*/
  /*width: 410px;
  height: 410px;*/
  /* border-radius: 8px; */
  /* -webkit-transform: translateY(30px) scale(0.94);
  transform: translateY(30px) scale(0.94);
  -webkit-transform-origin: 50%, 100%;
  transform-origin: 50%, 100%;
  will-change: transform, opacity; */
}

#backgroundimage {
  margin: 0 auto;
  height: 410px;
  /* margin: 49px -60px 0 -52px;*/
  /* min-height: 100%;*/
  width: 318px;
  /* padding: 0;*/
  position: relative;
  /* top: 0; */
  /*width: 320px;*/
  z-index: -2;
}

/*
	Cascade the cards by translation and scale based on
	their nth-child index
*/
.card:nth-child(1) {
  opacity: 1;
  z-index: 5;
}

.card:nth-child(2) {
  opacity: 1;
  z-index: 4;
  /* -webkit-transform: translateY(10px) scale(0.98);
  transform: translateY(10px) scale(0.98); */
}

.card:nth-child(3) {
  opacity: 1;
  z-index: 3;
  /* -webkit-transform: translateY(20px) scale(0.96);
  transform: translateY(20px) scale(0.96); */
}

.card:nth-child(4) {
  opacity: 1;
  z-index: 2;
  /* -webkit-transform: translateY(20px) scale(0.96);
  transform: translateY(20px) scale(0.96); */
}

.card:nth-child(5) {
  opacity: 1;
  z-index: 1;
  /* -webkit-transform: translateY(20px) scale(0.96);
  transform: translateY(20px) scale(0.96); */
}

.card.current {
  pointer-events: auto;
  /*  -webkit-transform: translateY(20px) scale(0.96);
  transform: translateY(20px) scale(0.96);*/
}

.card.animated {
  /*  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);*/
}

.card > .image {
  /* margin: 0 auto 15px;*/
  width: 350px;
  height: 350px;
  margin-left: -175px;
}

/*.card > .image > .image-icon {
  position: relative;
  left: 50%;
  top: 50%;
  width: 200px;
  height: 200px;
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  background: center center no-repeat transparent;
  background-size: contain;
}*/

.card > .image > .image-icon.approve {
  background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/617753/icon-approve.svg');
}

.card > .image > .image-icon.reject {
  background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/617753/icon-reject.svg');
}

.card > .name {
  margin: 0 auto 18px 0;
  /*display: block;*/
  font-size: 24px;
  line-height: 24px;
  text-align: center;
  text-transform: capitalize;
}

.card > .stars {
  margin: 0 auto 0 auto;
  width: 216px;
}

.card > .stars:after {
  content: '';
  display: table;
  clear: both;
}

.card > .stars > .star-active,
.card > .stars > .star-inactive {
  float: left;
  margin-right: 24px;
  width: 24px;
  height: 24px;
}

.card > .stars > .star-active:last-child,
.card > .stars > .star-inactive:last-child {
  margin-right: 0;
}

.card > .stars > .star-active {
  background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/617753/star-active.svg');
}

.card > .stars > .star-inactive {
  background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/617753/star-inactive.svg');
}
.media {
  margin-bottom: 14px;
}
</style>
