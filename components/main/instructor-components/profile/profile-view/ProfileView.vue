<template>
  <div class="instructor-profile">
    <profile-view-desktop v-if="!isMobile" />
    <profile-mobile v-if="isMobile" />
  </div>
</template>

<script>
import ProfileViewDesktop from './ProfileViewDesktop';
import ProfileMobile from '../../../profile-mobile/ProfileMobile';

export default {
  components: {
    ProfileViewDesktop,
    ProfileMobile
  },
  data() {
    return {
      isMobile: false
    };
  },
  mounted() {
    this.onResize();
    window.addEventListener('resize', this.onResize, {
      passive: true
    });
  },
  beforeDestroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize, {
        passive: true
      });
    }
  },
  methods: {
    onResize() {
      this.isMobile = window.innerWidth < 768;
    }
  }
};
</script>