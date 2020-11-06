<template>
  <div
    class="class-action"
    :class="{ 'not-saved': !isBookmarked }"
    :style="iconStyle"
    @click="$emit('addToBookmarks', $event)"
  >
    <span>
      <i class="fas fa-bookmark"></i>
    </span>
  </div>
</template>

<script>
  export default {
    props: {
      isBookmarked: {
        type: Boolean
      },
      big: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        bigIconStyles: {
          width: '39px',
          height: '39px',
          borderRadius: '4px',
          fontSize: '16px'
        },
        smallIconStyles: {
          width: '27px',
          height: '27px',
          borderRadius: '3px',
          fontSize: '11px'
        }
      }
    },
    computed: {
      iconStyle() {
        return this.big
          ? this.bigIconStyles
          : this.smallIconStyles
      }
    }
  }
</script>