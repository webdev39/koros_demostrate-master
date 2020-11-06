<template>
  <div>
    <header class="mobile-header">
      <div class="button-left">
        <div
          role="button"
          class="menu-button"
          @click="toggleMobileMenu"
        >
          <img
            src="/img/icons/hamburger.svg"
            alt=""
          >
        </div>
      </div>
      <div class="button-right">
        <div
          role="button"
          class="menu-button"
          @click="switchComponent({
            page: 'profile',
            component: 'ProfileEdit'
          })"
        >
          <svg
            width="20px"
            height="20px"
          >
            <use href="#edit-icon"></use>
          </svg>
        </div>
      </div>
    </header>
    <div class="mobile-body">
      <div class="user">
        <div class="avatar-wrapper">
          <base-avatar width="102px" height="102px" :url="photo" />
        </div>
        <div class="user__data">
          <div class="user__name">
            {{ fullName }}
          </div>
          <div class="city">{{ city }}</div>
        </div>
      </div>
      <div class="account__info">
        <h3 class="account-title">Proficiency Level</h3>
        <div class="proficiency">
          <input
            id="beginner"
            type="radio"
            value="Beginner"
            v-model="profLevel"
          />
          <label for="beginner">Beginner</label>
          <input
            id="intermediate"
            type="radio"
            value="Intermediate"
            v-model="profLevel"
          />
          <label for="intermediate">Intermediate</label>
          <input
            id="advanced"
            type="radio"
            value="Advanced"
            v-model="profLevel"
          />
          <label for="advanced">Advanced</label>
        </div>
      </div>
      <ul class="profile-info view">
        <li class="info-item">
          <div class="item-title">Birthday</div>
          <div class="item-data">{{ birthday }}</div>
        </li>
        <li class="info-item">
          <div class="item-title">Gender</div>
          <div class="item-data">{{ gender }}</div>
        </li>
        <li class="info-item">
          <div class="item-title">Reset Password</div>
          <div
            class="item-data arrow"
            role="button"
            @click="switchComponent({
              page: 'profile',
              component: 'ResetPassword'
            })"
          >
            <svg width="9px" height="14px">
              <use href="#arrow-right-icon"></use>
            </svg>
          </div>
        </li>
        <li class="info-item">
          <a href="/" @click.prevent="handleLogout">Log Out</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
export default {
  data() {
    return {
      profLevel: 'Advanced'
    };
  },
  computed: {
    ...mapState('account', {
      user: (state) => state.user,
      photo: (state) => state.user.photo
    }),
    ...mapGetters({
      fullName: 'account/fullName',
      gender: 'account/gender',
      city: 'account/city',
      birthday: 'account/birthday'
    })
  },
  methods: {
    ...mapActions('account', ['logout']),
    ...mapMutations('ui', [
      'toggleMobileMenu',
      'switchComponent'
    ]),
    handleLogout() {
      this.logout();
      this.$router.push({ name: 'login' });
    }
  }
};
</script>
