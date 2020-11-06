<template>
  <router-link
    :to="{
      name: 'liveClass',
      params: { id: liveClass.id }
    }"
    class="live-class"
  >
    <div class="class-video">
      <div
        class="video-thumbnail"
        :style="{ backgroundImage: `url(${liveClass.image})` }"
      >
      </div>
    </div>
    <div class="class-main">
      <div>
        <h3 class="class-title">
          {{ liveClass.title }}
        </h3>
        <div class="class-description">
          {{ liveClass.description }}
        </div>
      </div>
      <div class="user-class">
        <!-- <base-class-rating
          :instructor="liveClass.instructor"
        /> -->
      </div>
    </div>
    <div class="class-side">
      <div
        class="action"
        v-if="isUser"
        :class="{ saved: liveClass.bookmarked }"
        @click.stop.prevent="addToBookmarks({
          id: liveClass.id,
          save: !liveClass.bookmarked
        })"
      >
        <span>
          <i class="fas fa-bookmark"></i>
        </span>
      </div>
      <div class="class-management">
        <div class="management-action">
          <div class="action-icon">
            <i class="fas fa-ban"></i>
          </div>
          <span class="action-name">Deactive</span>
        </div>
        <div class="management-action">
          <div
            class="action-icon"
            @click.stop.prevent="$router.push({
              name: 'editLiveClass',
              params: { id: liveClass.id }
            })"
          >
            <i class="fas fa-edit"></i>
          </div>
          <span class="action-name">Edit</span>
        </div>
        <div class="management-action">
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
      <div class="class-info">
        <div class="class-type">
          Type: {{ liveClass.class_type.name }}
        </div>
        <div class="class-level class-preview">
          Level: <span>{{ liveClass.difficulty_level.name }}</span>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
  export default {
    props: {
      liveClass: {
        type: Object,
        default: {}
      }
    },
    computed: {
      ...mapGetters({
        classInstructorName: 'classes/classInstructorName',
        isLiveClassPast: 'classes/isLiveClassPast',
        isUser: 'account/isUser'
      })
    },
    methods: {
      ...mapActions('classes', [
        'addToBookmarks'
      ]),
    }
  }
</script>