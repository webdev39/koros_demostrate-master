<template>
  <div class="admin-section create-page">
    <h1 class="title">Create Class</h1>
    <creation-form
      @submitForm="create"
    />
  </div>
</template>

<script>
import { store } from '../../../../store';
import { mapState, mapActions } from 'vuex';
import CreationForm from './CreationForm';

  export default {
    components: {
      CreationForm
    },
    beforeRouteEnter(routeTo, routeFrom, next) {
      if (store.state.classes.liveClassCourse) {
        next()
      } else {
        store.dispatch('classes/fetchLiveClassCourse', 
          { courseId: routeTo.params.courseId }).then(() => {
          next()
        })
      }
    },
    created() {
      this.$store.commit('classes/setEmptyLiveClass');
    },
    computed: {
      ...mapState('classes', {
        liveClassCourse: state => state.liveClassCourse
      }),
    },
    methods: {
      ...mapActions('classes', ['createLiveClass']),
      create({ courseId, data }) {
        this.createLiveClass({ courseId, data });
      }
    }
  }
</script>