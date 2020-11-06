<template>
  <div
    class="live-class"
    :class="{ 'deactivated': liveClassCourse.deactivated }"
  >
    <router-link
    :to="{
      name: isAdmin ? 'adminLiveClassCourse' : 'liveClassCourse',
      params: { courseId: liveClassCourse.id }
    }">
      <div class="class-video">
        <div
          class="video-thumbnail"
          :style="{ backgroundImage: `url(${liveClassCourse.image})` }"
        >
          <div class="player-icon">
            <img src="/img/player.png" >
          </div>
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
      </div>
    </router-link>
    <div class="class-main">
      <div>
        <router-link
          :to="{
            name: isAdmin ? 'adminLiveClassCourse' : 'liveClassCourse',
            params: { courseId: liveClassCourse.id }
          }"
        >
          <h3 class="class-title">
            {{ liveClassCourse.title }}
          </h3>
        </router-link>
        <div class="class-description">
          {{ liveClassCourse.description }}
        </div>
      </div> 
      <base-class-rating 
        :instructor="liveClassCourse.instructor"
        :currentWeek="liveClassCourse.currentWeek"
        :past="isLiveClassPast(liveClassCourse.end_date)"
      />
    </div>
    <div class="class-side">
      <div
        class="class-management"
        v-if="canManage(liveClassCourse.instructor.id)"
      >
        <div class="management-action">
          <div class="action-icon"
          @click="deactivateLiveClassCourse({
            courseId: liveClassCourse.id,
            deactivated: !liveClassCourse.deactivated
          })"
          >
            <i class="fas fa-ban"></i>
          </div>
        </div>
        <div class="management-action">
          <div
            class="action-icon"
            @click="$router.push({
              name: 'editLiveClassCourse',
              params: { courseId: liveClassCourse.id }
            })"
          >
            <i class="fas fa-edit"></i>
          </div>
        </div>
        <div class="management-action">
          <div class="action-icon"
            @click="openDeletePopup"
          >
            <svg
              width="18px"
              height="17px"
            >
              <use href="#close-icon"></use>
            </svg>
          </div>
        </div>
      </div>
      <div class="class-period">
        {{ nextLiveClassStr(liveClassCourse) }}
      </div>
      <div class="class-info">
        <div class="class-type">
          Type: {{ liveClassCourse.class_type.name }}
        </div>
        <div
          class="class-level"
          :class="{ 'admin': !isUser }">
          Level: <span>{{ liveClassCourse.difficulty_level.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import DeletePopup from '../../../main-admin/live-classes/live-class/DeletePopup';
  export default {
    // beforeRouteEnter(routeTo, routeFrom, next) {
    //   store.commit('ui/startRouteLoading', null, { root: true });
    //   store.dispatch('classes/secretValidate', {
    //     courseId: routeTo.params.courseId,
    //     secret: null // TO DO: probably here should be the a form to enter secret
    //   })
    //     .then(() => next())
    //     .finally(() => {
    //       store.commit('ui/endRouteLoading', null, { root: true });
    //     })
    // },
    props: {
      liveClassCourse: {
        type: Object,
        default: {}
      }
    },
    computed: {
      ...mapState({
        user: state => state.account.user
      }),
      ...mapGetters({
        classInstructorName: 'classes/classInstructorName',
        isLiveClassCourseFuture: 'classes/isLiveClassCourseFuture',
        isLiveClassPast: 'classes/isLiveClassPast',
        nextLiveClassStr: 'classes/nextLiveClassStr',
        timeToStart: 'classes/timeToStart',
        isUser: 'account/isUser',
        isAdmin: 'account/isAdmin'
      })
    },
    methods: {
      ...mapActions('classes', [
        'addCourseToBookmarks',
        'deactivateLiveClassCourse'
      ]),
      openDeletePopup() {
        this.$modal.show(DeletePopup, {
          courseId: this.liveClassCourse.id
        }, 
        {
          width: 350,
          height: 262,
          classes: 'add-user-modal',
          clickToClose: false
        });
      },
      canManage(instructorId) {
        return this.isAdmin || this.user.id === instructorId;
      }
    }
  }
</script>