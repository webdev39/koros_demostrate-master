<template>
  <div class="instructor-rating">
    <base-avatar
      v-if="!instructor.subprofile"
      :url="instructor.photo"
    />
    <base-double-avatar
      v-else
      :photo="instructor.photo"
      :photoSub="instructor.subprofile.photo"
    />
    <div class="rating-info">
      <div class="user-name">
        {{ classInstructorName(instructor) }}
      </div>
      <!-- <div class="class-progress" v-if="currentWeek">
        Currently on <span>Week {{ currentWeek }}</span>
      </div> -->
      <div class="rating" v-if="past && reviews && showRating">
        <span
          class="star"
          v-for="n of starsCount().fullStars"
        >
          <i
            class="fas fa-star"
            aria-hidden="true"
          >
          </i>
        </span>
        <span
          class="star"
          v-for="n of starsCount().halfStars"
        >
          <i
            class="fas fa-star-half-alt"
            aria-hidden="true"
          >
          </i>
        </span>
        <span
          class="star"
          v-for="n of starsCount().emptyStars">
          <i
            class="far fa-star"
            aria-hidden="true"
          >
          </i>
        </span>
        <span class="reviews">{{ reviews.rating }} ({{ reviews.count }} Reviews)</span>
      </div>
      <div class="class-progress" v-else-if="showRating">
        No rating
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
  export default {
    props: {
      reviews: {
        type: Object
      },
      currentWeek: {
        type: Number,
        default: null
      },
      current: {
        type: Boolean,
        default: false
      },
      past: {
        type: Boolean,
        default: false
      },
      instructor: {
        type: Object, default: () => { return {}; }
      },
      showRating: {
        type: Boolean,
        default: true
      },
    },
    computed: {
      ...mapGetters({
        classInstructorName: 'classes/classInstructorName'
      }),
    },
    methods: {
      starsCount() {
        const fullStars = Math.floor(this.reviews.rating);
        const halfStars = this.reviews.rating - Math.floor(this.reviews.rating) > 0.5 ? 1 : 0
        const emptyStars = 5 - Math.floor(this.reviews.rating)
        return { fullStars, halfStars, emptyStars }
      }
    }
  }
</script>