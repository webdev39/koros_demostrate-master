<template>
  <div class="class-summary">
    <div
      class="class-thumbnail"
      :style="{ backgroundImage: 'url(' + liveClass.image + ')' }"
    >

      <div class="player-icon">
        <img src="/img/icons/play_button.svg" >
      </div>

      <div
        class="status live"
        v-if="isUpcoming"
      >
        LIVE
      </div>

      <div
        class="status soon"
        v-if="isUpcoming"
      >
        Starts in 3 Days
      </div>

      <base-bookmark-icon
        v-if="!isUpcoming"
        :isBookmarked="false"
      />

      <div
        class="category"
        v-if="!isUpcoming"
      >
        posture
      </div>

      <div class="class-info">
        <div class="class-name">8-Week Posture</div>
        <div class="class-level">Level: <span>Advanced</span></div>
      </div>

      <div class="class-duration">
        25 min
      </div>

    </div>

    <!-- <div class="liveclass-instructor">
      <base-avatar
        v-if="!liveClass.instructor.subprofile"
        :url="liveClass.instructor.photo"
      />
      <base-double-avatar
        v-else
        :photo="liveClass.instructor.photo"
        :photoSub="liveClass.instructor.subprofile.photo"
      />
    </div> -->
  </div>
</template>

<script>
  export default {
    props: {
      liveClass: {
        type: Object
      },
      isUpcoming: {
        type: Boolean,
        default: true
      }
    },
  }
</script>