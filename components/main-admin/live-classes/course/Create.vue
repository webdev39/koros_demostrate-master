<template>
  <div class="admin-section create-page">
    <h1 class="title">Create Class</h1>
    <creation-form
      @submitForm="create"
    />
  </div>
</template>

<script>
import CreationForm from './CreationForm';
import { mapActions } from 'vuex'; 

export default {
  components: {
    CreationForm
  },
  created() {
    this.$store.commit('classes/setEmptyLiveClassCourse');
  },
  methods: {
    ...mapActions('classes', ['createLiveClassCourse']),
    create(data) {
      this.createLiveClassCourse(data);
    }
  }
}
</script>