<template>
  <div class="content-mobile">
    <header class="mobile-header">
      <h1 class="mobile-title">Live Classes</h1>
      <div class="button-left">
        <div
          role="button"
          class="menu-button"
          @click="toggleMobileMenu"
        >
          <img
            src="/img/icons/hamburger.svg"
            alt=""
          >
        </div>
      </div>
      <div class="button-right">
        <div
          role="button"
          class="menu-button"
          @click="switchComponent({
            page: 'liveClasses',
            component: 'FilterMobile'
          })"
        >
          <img src="/img/icons/filter.svg" alt=""> 
        </div>
      </div>
    </header>
    <div class="live-classes">
      <router-link
        :to="{
          name: 'liveClassCourse',
          params: { courseId: liveClassCourse.id }
        }"
        v-for="liveClassCourse in liveClassCourses"
        :key="liveClassCourse.id"
        class="live-class"
      >
        <div class="class-video">
          <div
              class="video-thumbnail"
              :style="{ backgroundImage: `url(${liveClassCourse.image})` }"
            >
            </div>
          <div
            class="status live"
            v-if="liveClassCourse.live"
          >
            LIVE
          </div>
          <div
            v-else-if="isLiveClassCourseFuture(liveClassCourse.start_date)"
            class="status future"
            >
            Starts {{ timeToStart(liveClassCourse.start_date) }}
          </div>
          <base-class-rating 
            :instructor="liveClassCourse.instructor"
            :currentWeek="liveClassCourse.currentWeek"
            :past="isLiveClassPast(liveClassCourse.end_date)"
          />
        </div>
        <div class="class-main">
          <div>
            <h3 class="class-title">
              {{ liveClassCourse.title }}
            </h3>
            <div class="class-info">
              <div class="class-level">
                Level: <span>
                  {{ liveClassCourse.difficulty_level.name }}
                  </span>
              </div>
              <div
                class="class-period" v-if="liveClassCourse.next_live"
              >
                {{ nextLiveClassStr(liveClassCourse) }}
              </div>
            </div>
            <div class="class-description">
              {{ cuttedDescription(liveClassCourse.description) }}
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('classes', {
      liveClassCourses: state => state.liveClassCourses
    }),
    ...mapGetters({
      classInstructorName: 'classes/classInstructorName',
      isLiveClassPast: 'classes/isLiveClassPast',
      isLiveClassCourseFuture: 'classes/isLiveClassCourseFuture',
      nextLiveClassStr: 'classes/nextLiveClassStr',
      timeToStart: 'classes/timeToStart'
    })
  },
  methods: {
    ...mapMutations('ui', [
      'toggleMobileMenu',
      'switchComponent'
    ]),
    ...mapActions('classes', [
      'findLiveClassCourses'
    ]),
    cuttedDescription(description) {
      return description.slice(0, 100);
    }
  }
}
</script>