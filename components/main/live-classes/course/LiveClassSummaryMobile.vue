<template>
  <div
    class="class-view mobile"
    :class="{ 'deactivated': video.deactivated }"
  > 
    <div class="class-rating upper">
      <base-class-rating 
        :reviews="video.reviews"
        :instructor="instructor"
        :isLiveClassCurrent="isLiveClassCurrent(video.start_datetime, video.end_datetime)"
        :isLiveClassPast="isLiveClassPast(video.end_datetime)"
      />
    </div>
    <div class="class-video">
      <div
        class="video-thumbnail"
        :style="{ backgroundImage: `url(${video.image})` }">
        <div class="player-icon">
          <img src="/img/player.png" >
        </div>
      </div>
      <div
        class="class-action"
        v-if="video.status_id === 1"
        @click="openCalendarPopup(video)"
      >
        <span>
          <i class="far fa-calendar-alt"></i>
        </span>
      </div>
      <base-bookmark-icon
        v-else-if="video.status_id === 6"
        :isBookmarked="video.favorite"
        :big="true"
        @addToBookmarks="addToBookmarks({
          type: 'live_class_video',
          id: video.id,
          status: !video.favorite
        })"
      />
      <template
        v-else-if="video.status_id === 2 || video.status_id === 3 || video.status_id === 4"
      >
        <div class="time">
          {{ videoTimeStr(video) }}
        </div>
        <router-link
          :to="{ name: 'liveStreaming',
            params: {
              courseId: $route.params.courseId,
              liveClassId: video.id
            } }"
          class="go-live"
        >
          Go Live
        </router-link>
      </template>
      <div class="private" v-if="coursePrivate">
        Private
      </div>
    </div>
    <div class="class-content">
      <div class="class-header">
        <h3 class="class-title"> 
          {{ video.title }}
        </h3>
        <div class="class-level">
          Level: {{ video.difficulty_level.name }}
        </div>
      </div>
      <div class="class-description">
        {{ video.description | cuttedText(200) }}
      </div>
      <!-- <div class="admin-info" v-if="!isUser">
        <div class="class-level">
          Level: {{ video.difficulty_level.name }}
        </div>
        <div class="views">
          350 Views
        </div>
      </div> -->
      <div class="class-management" v-if="canManage">
        <div class="management-action"
          @click="deactivateLiveClass({
            courseId: $route.params.courseId,
            liveClassId: video.id,
            deactivated: !video.deactivated
          })"
        >
          <div class="action-icon">
            <i class="fas fa-ban"></i>
          </div>
          <span class="action-name">Deactive</span>
        </div>
        <div
          class="management-action"
          :class="{ disabled: !isLiveClassPast(video.end_datetime) }"
          @click="$router.push({
            name: 'editLiveClass',
            params: {
              courseId: $route.params.courseId,
              liveClassId: video.id
            }
          })">
          <div class="action-icon">
            <i class="fas fa-edit"></i>
          </div>
          <span class="action-name edit">Edit</span>
        </div>
        <div
          class="management-action"
          @click="openDeletePopup"
        >
          <div class="action-icon">
            <svg
              width="18px"
              height="17px"
            >
              <use href="#close-icon"></use>
            </svg>
          </div>
          <span class="action-name">Remove</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import moment from 'moment';
import CalendarPopup from './CalendarPopup';
import DeletePopup from '../../../main-admin/live-classes/live-class/DeletePopup';
import cuttedText from '../../../../filters/cuttedText';
  export default {
    props: {
      video: {
        type: Object
      },
      instructor: {
        type: Object
      },
      coursePrivate: {
        type: Boolean,
        default: false
      },
    },
    filters: {
      cuttedText
    },
    computed: {
      ...mapState({
        user: state => state.account.user
      }),
      ...mapGetters({
        isLiveClassPast: 'classes/isLiveClassPast',
        isLiveClassFuture: 'classes/isLiveClassFuture',
        isLiveClassCurrent: 'classes/isLiveClassCurrent',
        isUser: 'account/isUser',
        videoTimeStr: 'classes/videoTimeStr'
      }),
      canManage() {
        return this.isAdmin 
          || this.video.instructor.id === this.user.id
      }
    },
    methods: {
      ...mapActions('classes', [
        'deactivateLiveClass',
        'addToBookmarks'
      ]),
      openDeletePopup() {
        this.$modal.show(DeletePopup, {
          courseId: this.$route.params.courseId,
          liveClassId: this.video.id
        }, 
        {
          width: 350,
          height: 262,
          classes: 'add-user-modal',
          clickToClose: false
        });
      },
      openCalendarPopup(video) {
        this.$modal.show(CalendarPopup, { video }, 
        {
          classes: 'calendar-modal',
          clickToClose: false
        });
      },
      startSoon() {
        return moment() < moment(this.video.start_datetime).add(10, 'minutes');
      }
    }
  }
</script>