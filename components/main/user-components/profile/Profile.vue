<template>
  <div class="page-middle">
    <profile-desktop v-if="!isMobile" />
    <profile-mobile v-if="isMobile" />
  </div>
</template>

<script>
import ProfileDesktop from './profile-desktop/ProfileDesktop';
import ProfileMobile from '../../profile-mobile/ProfileMobile';
import MobileWidthMixin from '../../../../mixins/MobileWidthMixin';

export default {
  components: {
    ProfileDesktop,
    ProfileMobile
  },
  mixins: [MobileWidthMixin]
};
</script>