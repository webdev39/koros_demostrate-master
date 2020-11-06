<template>
  <div>
    <header class="mobile-header">
      <h1 class="mobile-title">Reset Password</h1>
      <div class="button-right">
        <div
          role="button"
          class="menu-button"
          @click="switchComponent({
              page: 'profile',
              component: 'ProfileView'
            })"
        >
          <svg
            width="14px"
            height="15px"
          >
            <use href="#close-icon"></use>
          </svg>
        </div>
      </div>
    </header>
    <div class="mobile-body">
      <ul class="profile-info">
        <li class="info-item">
          <div class="item-title">Current Password</div>
          <div class="mobile-input">
            <input
              type="password"
              autocomplete="off"
              autocapitalize="off"
              name="old_password"
              v-model="currentPassword"
            />
          </div>
        </li>
        <li class="info-item">
          <div class="item-title">New Password</div>
          <div class="mobile-input">
            <input
              type="password"
              autocomplete="off"
              autocapitalize="off"
              name="new_password"
              v-model="newPassword"
            />
          </div>
        </li>
        <li class="info-item">
          <div class="item-title">Confirm Password</div>
          <div class="mobile-input">
            <input
              type="password"
              autocomplete="off"
              autocapitalize="off"
              name="confirm_password"
              v-model="confirmPassword"
            />
          </div>
        </li>
      </ul>
      <button
        class="btn btn-primary"
        @click="reset"
        :disabled="status.loading"
      >
        <span v-if="status.loading"><i class="fa fa-spinner fa-pulse"></i></span>
        Reset</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
import { removeValidationsMessages } from '../../../helpers';

export default {
  data() {
    return {
      currentPassword: null,
      newPassword: null,
      confirmPassword: null
    };
  },
  computed: {
    ...mapState('account', {
      status: state => state.status
    }),
    ...mapGetters({
      isUser: 'account/isUser'
    })
  },
  methods: {
    ...mapActions('account', [
      'updateProfile',
      'changePassword'
    ]),
    ...mapMutations('ui', [
      'switchComponent'
    ]),
    async reset() {
      const {
        currentPassword, newPassword, confirmPassword
      } = this;
      removeValidationsMessages()
      if (currentPassword !== '' || newPassword !== '' || confirmPassword !== '') {
        await this.changePassword({currentPassword, newPassword, confirmPassword})
        .then(() => {
          this.currentPassword = null,
          this.newPassword = null,
          this.confirmPassword = null 
        })
        .catch(() => {
          console.log('err');
        });
      }
      this.$router.push({name: this.isUser ? 'userProfile' : 'instructorProfile'});
    }
  }
}
</script>