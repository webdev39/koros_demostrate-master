<template>
  <div class="profile-mobile">
    <component :is="currentComponent" />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import ProfileView from './profile-view/ProfileView';
import ProfileEditSingle from './profile-edit/ProfileEditSingle';
import ResetPassword from './ResetPassword';
import Invite from './Invite';

export default {
  components: {
    ProfileView,
    ProfileEditSingle,
    ResetPassword,
    Invite
  },
  computed: {
    ...mapState('ui', {
      currentComponent: state => state.mobileRouting.profile,
    }),
  }
}
</script>