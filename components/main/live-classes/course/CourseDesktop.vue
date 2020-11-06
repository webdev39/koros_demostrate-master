<template>
  <div class="content-desktop live-classes-section">
    <h1 class="section-title">
      Live Classes / {{ liveClassCourse.title }}
    </h1>

    <div class="content-wrapper">
      <div class="live-class">

        <div class="class-nav">
          <div class="weeks" v-dragscroll.x="true">
            <div
              class="week"
              :class="{ current: weekNumber === n }" 
              v-for="n of liveClassCourse.weeks"
              :key="n"
              @click="setWeek(n)"
            >
              Week {{ n }}
            </div>
          </div>
          <button
            class="btn btn-red"
            v-if="!isUser"
            @click="$router.push({ 
              name: 'createLiveClass',
              params: {
                courseId: $route.params.courseId
              }
            })"
          >+ Add</button>
        </div>

        <div class="week-classes">
          <live-class-summary-desktop
            v-for="video in weekVideos"
            :key="video.id"
            :video="video"
            :instructor="liveClassCourse.instructor"
            :coursePrivate="liveClassCourse.protected"
          />
        </div>

        <div class="related-video-section">
          <header>
            <h2 class="section-subtitle">Related Recorded Classes</h2>
            <router-link class="more-link" to="/">
              See all
            </router-link>
          </header>
          <div
            class="related-classes"
            v-dragscroll.x="true"
          >
            <recorded-class-summary v-for="n of 5" :key="n"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
import LiveClassSummaryDesktop from './LiveClassSummaryDesktop';
import RecordedClassSummary from './RecordedClassSummary';

export default {
  components: {
    LiveClassSummaryDesktop,
    RecordedClassSummary
  },
  computed: {
    ...mapState('classes', {
      liveClassCourse: state => state.liveClassCourse,
      weekNumber: state => state.weekNumber
    }),
    ...mapGetters({
      'isUser': 'account/isUser',
      'weekVideos': 'classes/weekVideos'
    })
  },
  methods: {
    ...mapMutations('classes', ['setWeek'])
  }
}
</script>