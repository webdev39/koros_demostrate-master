<template>
  <div :class="{ 
    'admin-section': isAdmin,
    'page-middle': !isAdmin
  }">
    <course-desktop v-if="!isMobile" />
    <course-mobile v-if="isMobile && !isAdmin" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { store } from '../../../../store';
import CourseDesktop from './CourseDesktop';
import CourseMobile from './CourseMobile';
import MobileWidthMixin from '../../../../mixins/MobileWidthMixin';

export default {
  beforeRouteEnter(routeTo, routeFrom, next) {
    store.commit('ui/startRouteLoading');
    store.dispatch('classes/fetchLiveClassCourse', 
    { courseId: routeTo.params.courseId })
      .then(() => next())
      .catch(() => next(false))
      .finally(() => {
        store.commit('ui/endRouteLoading');
      })
  },
  components: {
    CourseDesktop,
    CourseMobile
  },
  mixins: [MobileWidthMixin],
  computed: {
    ...mapGetters({
      isUser: 'account/isUser',
      isAdmin: 'account/isAdmin'
    })
  }
};
</script>