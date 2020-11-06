<template>
  <div class="instructor-profile">
    <profile-edit-desktop v-if="!isMobile" />
    <profile-edit-single
      v-if="isMobile && isSingleInstructor"
    />
    <profile-edit-double
      v-if="isMobile && !isSingleInstructor"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ProfileEditDesktop from './ProfileEditDesktop';
import ProfileEditSingle from '../../../profile-mobile/profile-edit/ProfileEditSingle';
import ProfileEditDouble from '../../../profile-mobile/profile-edit/ProfileEditDouble';
import MobileWidthMixin from '../../../../../mixins/MobileWidthMixin'

export default {
  components: {
    ProfileEditDesktop,
    ProfileEditSingle,
    ProfileEditDouble
  },
  mixins: [MobileWidthMixin],
  computed: {
    ...mapGetters({
      isSingleInstructor: 'account/isSingleInstructor',
    }),
  }
};
</script>