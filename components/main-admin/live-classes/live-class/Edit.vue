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
      store.dispatch('classes/fetchLiveClass', {
          courseId: routeTo.params.courseId,
          liveClassId: routeTo.params.liveClassId
        }).then(() => {
        next()
      })
    },
    methods: {
      ...mapActions('classes', ['editLiveClass']),
      edit({ courseId, data }) {
        this.editLiveClass({
          courseId,
          data,
          liveClassId: this.$route.params.liveClassId
        });
      }
    }
  }
</script>