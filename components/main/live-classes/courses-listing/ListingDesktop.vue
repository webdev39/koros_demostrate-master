<template>
  <div class="content-desktop sidebar-filter">
    <header class="admin-header">
      <h1
        :class="{ 
          'section-title': !isAdmin,
          'admin-section-title': isAdmin
          }">
        Live Classes
      </h1>
      <button
        class="btn btn-red"
        @click="$router.push({ name: 'createLiveClassCourse' })">
        + Add
      </button>
    </header>

    <div class="content-wrapper">
      <div class="user-sidebar" v-if="!isAdmin">
        <div class="sidebar-section">
          <h3 class="sidebar-title">Instructor</h3>
          <div
            class="checkbox-group"
            v-for="i in instructors"
            :key="i.id"
          >
            <input
              type="checkbox"
              :id="`instructor${i.id}`"
              :value="i"
              @change="filterByInstructor(i)"
            >
            <label :for="`instructor${i.id}`">
              {{ i.first_name }} {{ i.last_name }}
            </label>
          </div>
        </div>
        <div class="sidebar-section">
          <h3 class="sidebar-title">Type of Class</h3>
          <div
            class="checkbox-group"
            v-for="c in classTypes"
            :key="c.id"
          >
            <input
              type="checkbox"
              :id="`class-type${c.id}`"
              :value="c"
              @change="filterByClassType(c)"
            >
            <label :for="`class-type${c.id}`">
              {{ c.name }}
            </label>
          </div>
        </div>
        <div class="sidebar-section">
          <h3 class="sidebar-title">Difficulty Level</h3>
          <div
            class="checkbox-group"
            v-for="d in difficultyLevels"
            :key="d.id"
            :value="d"
            @change="filterByDiffLevel(d)"
          >
            <input
              type="checkbox"
              :id="`diff-level${d.id}`"
            >
            <label :for="`diff-level${d.id}`">
              {{ d.name }}
            </label>
          </div>
        </div>
      </div>

      <div class="live-classes">
        <course-summary
          v-for="liveClassCourse in liveClassCourses"
          :liveClassCourse="liveClassCourse"
          :key="liveClassCourse.id"
        />
      </div>

    </div>

    <div class="pagination" v-if="pagesTotal > 1">
      <span>Page</span>
      <span
        class="prev"
        :class="{ disabled: pageNumber - 1 < 1 }"
        @click="showPrevPage"
      >&lt;</span>
      <span
        @click="openPage(num)"
        v-for="num of pagesTotal"
        :key="num"
        class="page"
        :class="{ current: num === pageNumber }">
        {{ num }}
      </span>
      <span
        class="next"
        :class="{ disabled: pageNumber + 1 > pagesTotal }"
        @click="showNextPage"
      >&gt;
      </span>
    </div>

  </div>
</template>

<script>
import moment from 'moment';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
import CourseSummary from './CourseSummary';

export default {
  components: {
    CourseSummary
  },
  computed: {
    ...mapState('account', { 
      instructors: state => state.dictionary.result.instructors,
      classTypes: state => state.dictionary.result.class_types,
      difficultyLevels: state => state.dictionary.result.difficulty_levels
    }),
    ...mapState('classes', {
      liveClassCourses: state => state.liveClassCourses,
      liveClassCoursesTotal: state => state.liveClassCoursesTotal,
      instructor: state => state.instructor,
      pageNumber: state => state.pageNumber
    }),
    ...mapGetters({
      isAdmin: 'account/isAdmin'
    }),
    // nextLiveClassStr(liveClass) {
    //   return `${moment(liveClass.next_live.start_datetime).format('YYYY/MM/DD')} - ${moment(liveClass.next_live.end_datetime).format('YYYY/MM/DD')}`
    // },
    pagesTotal() {
      return Math.ceil(this.liveClassCoursesTotal / 20);
    }
  },
  methods: {
    ...mapMutations('classes', [
      'checkInstructor',
      'checkClassType',
      'checkDiffLevel',
      'setPageNumber'
    ]),
    ...mapActions('classes', [
      'findLiveClassCourses'
    ]),
    filterByInstructor(e) {
      this.checkInstructor(e.id); 
      this.findLiveClassCourses();
    },
    filterByClassType(e) {
      this.checkClassType(e.id);
      this.findLiveClassCourses();
    },
    filterByDiffLevel(e) {
      this.checkDiffLevel(e.id);
      this.findLiveClassCourses();
    },
    openPage(number) {
      this.setPageNumber(number);
      this.findLiveClassCourses();
    },
    showPrevPage() {
      if (this.pageNumber - 1 < 1) {
        return
      } else {
        this.setPageNumber(this.pageNumber - 1);
        this.findLiveClassCourses();
      }
    },
    showNextPage() {
      if (this.pageNumber + 1 > this.pagesTotal) {
        return
      } else {
        this.setPageNumber(this.pageNumber + 1);
        this.findLiveClassCourses();
      }
    }
  }
}
</script>
