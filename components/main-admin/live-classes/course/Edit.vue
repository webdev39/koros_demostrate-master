<template>
  <div class="admin-section create-page">
    <h1 class="title">Edit Class</h1>
    <creation-form
      btnLabel="Update"
      @submitForm="edit"
    />
  </div>
</template>

<script>
import { store } from '../../../../store';
import { mapActions } from 'vuex';
import CreationForm from './CreationForm';

export default {
  components: {
    CreationForm
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store.dispatch('classes/fetchLiveClassCourse', 
      { courseId: routeTo.params.courseId }).then(() => {
      next()
    })
  },
  methods: {
    ...mapActions('classes', ['editLiveClassCourse']),
    edit(data) {
      this.editLiveClassCourse({
        courseId: this.$route.params.courseId,
        data
      });
    }
  }
}
</script>