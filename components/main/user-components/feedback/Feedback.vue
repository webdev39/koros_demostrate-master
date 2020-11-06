<template>
  <div :class="{ 'content-desktop': !isMobile }">
    <header class="mobile-header" v-if="isMobile">
      <div class="button-right">
        <div
          role="button"
          class="menu-button"
          @click=""
        >
          <svg
            width="16px"
            height="16px"
          >
            <use href="#close-icon"></use>
          </svg>
        </div>
      </div>
    </header>
    <h1 class="section-title" v-if="!isMobile">Feedback</h1>
    <div class="feedback-content">
      <div class="jumbotron">
        Congratulations on finishing 
        Posture: Samba Class!
      </div>
      <div class="user">
        <base-avatar
          :width="!isMobile ? '103px' : '93px'"
          :height="!isMobile ? '103px' : '93px'"
        />
        <div class="user__data">
          <div class="user__name">
            Bertha Dawson
          </div>
          <div class="membership">Member since Mar 2019</div>
        </div>
      </div>
      <div class="rating">
        <h5>How would you rate this class</h5>
        <div class="stars">
          <span
            class="star-icon"
            :class="{ full: n <= fullStars }"
            v-for="n of 5"
            :key="n"
            @click="setRating(n)"
            @mouseover="">
            <svg
              :width="!isMobile ? '35px' : '25px'"
              :height="!isMobile ? '35px' : '25px'">
              <use href="#star-icon"></use>
            </svg>
          </span>
        </div>
      </div>
      <div class="comment">
        <textarea />
      </div>
      <button class="btn btn-primary">Done</button>
    </div>
  </div>
</template>

<script>
import MobileWidthMixin from '../../../../mixins/MobileWidthMixin';

  export default {
    mixins: [MobileWidthMixin],
    data() {
      return {
        fullStars: 0,
        showStar: false
      }
    },
    methods: {
      setRating(n) {
        n === 1 && this.fullStars === 1 ? this.fullStars = 0 : this.fullStars = n;
      }
    }
  }
</script>