<template>
  <div class="mobile-body">
    <div class="user">
      <div class="avatar-wrapper">
        <base-avatar width="102px" height="102px" :url="photo" />
      </div>
      <div class="user__data">
        <div class="user__name">
          {{ fullName }}
        </div>
        <div class="city">{{ location }}</div>
      </div>
    </div>
    <!-- <div class="account__info">
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
    </div> -->
    <ul class="profile-info view">
      <li class="info-item">
        <div class="item-title">Birthday</div>
        <div class="item-data">{{ birthday }}</div>
      </li>
      <li class="info-item">
        <div class="item-title">Gender</div>
        <div class="item-data">{{ gender }}</div>
      </li>
      <li class="info-item" v-if="isInstructor">
        <div class="item-title">Bio</div>
        <div class="item-data">{{ bio }}</div>
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
        <div
          class="item-title link"
          role="button"
          @click.prevent="handleLogout"
        >Log Out</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
export default {
  // data() {
  //   return {
  //     profLevel: 'Advanced'
  //   };
  // },
  props: {
    isInstructor: {
      type: Boolean
    },
    photo: {
      type: String
    },
    fullName: {
      type: String
    },
    location: {
      type: String
    },
    birthday: {
      type: String
    },
    gender: {
      type: String
    },
    bio: {
      type: String
    }
  },
  methods: {
    ...mapMutations('ui', [
      'switchComponent'
    ]),
    ...mapActions('account', ['logout']),
    handleLogout() {
      this.logout();
      this.$router.push({ name: 'login' });
    }
  }
};
</script>
