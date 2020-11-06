<template>
  <div>
    <header class="mobile-header">
      <h1 class="mobile-title">Upcoming Classes</h1>
      <div class="button-left">
        <div
          role="button"
          class="menu-button"
          @click="$router.push({ name: 'liveClassCourses' })"
        >
          <svg
            width="16px"
            height="16px"
          >
            <use href="#arrow-left-icon"></use>
          </svg>
        </div>
      </div>
    </header>
    <div class="mobile-body">
      <div class="weeks">
        <carousel :paginationEnabled="false" :perPage="4" :scrollPerPage="true">
          <slide
            v-for="n of liveClassCourse.weeks"
            :key="n"
          >
            <div
              class="week"
              :class="{ current: weekNumber === n }"
              @click="setWeek(n)"
            >Week {{ n }}
            </div>
          </slide>
        </carousel>
      </div>

      <div class="mobile-week-classes">
        <live-class-summary-mobile 
          v-for="video in weekVideos"
          :key="video.id"
          :video="video"
          :instructor="liveClassCourse.instructor"
          :coursePrivate="liveClassCourse.protected"
          @addToBookmarks="addToBookmarks" 
        />
      </div>

      <div class="related-video-section">
        <header>
          <h2 class="section-subtitle">Related Recorded Classes</h2>
          <router-link class="more-link" to="/">
            See all
            <i class="fa fa-angle-right" aria-hidden="true"></i>
          </router-link>
        </header>
        <div class="related-classes">
          <carousel
            :paginationEnabled="false"
            :perPageCustom="[[600, 3]]">
            <slide v-for="n of 5" :key="n">
              <div class="recorded-slide">
                <recorded-class-summary />
              </div>
            </slide>
          </carousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
import { Carousel, Slide } from 'vue-carousel';
import LiveClassSummaryMobile from './LiveClassSummaryMobile';
import RecordedClassSummary from './RecordedClassSummary';

export default {
  components: {
    Carousel,
    Slide,
    LiveClassSummaryMobile,
    RecordedClassSummary
  },
  computed: {
    ...mapState('classes', {
      liveClassCourse: state => state.liveClassCourse,
      weekNumber: state => state.weekNumber
    }),
    ...mapGetters({
      'weekVideos': 'classes/weekVideos'
    })
  },
  methods: {
    ...mapActions('classes', ['fetchliveClassCourse']),
    ...mapMutations('classes', ['setWeek']),
    addToBookmarks(e) {
      console.log(e);
    }
  }
}
</script>