<template>
  <BasePopup
    text="Do you want to remove this class?"
  >
    <button class="yes" slot="buttons" @click="accept">Yes</button>
    <button class="cancel" slot="buttons" @click="decline">Cancel</button>
  </BasePopup>
</template>

<script>
import { mapActions } from 'vuex';
  export default {
    props: {
      courseId: {
        type: String, Number
      },
      liveClassId: {
        type: Number
      }
    },
    methods: {
      ...mapActions('classes', [
        'removeLiveClassCourse',
        'removeLiveClass'
      ]),
      accept() {
        if (this.liveClassId) {
          this.removeLiveClass({
            courseId: this.courseId,
            liveClassId: this.liveClassId
          }).then(() => {
            this.$emit('close');
          })
        } else {
          this.removeLiveClassCourse({
            courseId: this.courseId
          }).then(() => {
            this.$emit('close');
          })
        }
        
      },
      decline() {
        this.$emit('close');
      }
    }
  }
</script>