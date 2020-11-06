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
          @click="switchToEdit"
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
    <profile-view-single
      v-if="!user.subprofile"
      :isInstructor="isInstructor"
      :photo="user.photo"
      :fullName="fullName"
      :location="location"
      :birthday="birthday"
      :gender="gender"
      :bio="user.bio"
    />
    <profile-view-double
      v-else
      :photoInstr1="user.photo"
      :photoInstr2="user.subprofile.photo"
      :fullnameInstr1="fullName"
      :fullnameInstr2="fullNameSub"
      :cityInstr1="location"
      :cityInstr2="locationSub"
      :birthdayInstr1="birthday"
      :birthdayInstr2="birthdaySub"
      :genderInstr1="gender"
      :genderInstr2="genderSub"
      :email="user.email"
      :bio="user.bio"
    />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import ProfileViewSingle from './ProfileViewSingle';
import ProfileViewDouble from './ProfileViewDouble';

export default {
  components: {
    ProfileViewSingle,
    ProfileViewDouble
  },
  computed: {
    ...mapState('account', {
      user: (state) => state.user
    }),
    ...mapGetters({
      isInstructor: 'account/isInstructor',
      isSingleInstructor: 'account/isSingleInstructor',
      fullName: 'account/fullName',
      fullNameSub: 'account/fullNameSub',
      gender: 'account/gender',
      genderSub: 'account/genderSub',
      location: 'account/location',
      locationSub: 'account/locationSub',
      birthday: 'account/birthday',
      birthdaySub: 'account/birthdaySub'
    })
  },
  methods: {
    ...mapMutations('ui', [
      'toggleMobileMenu',
      'switchComponent'
    ]),
    switchToEdit() {
      if (this.isInstructor) {
        this.$router.push({ name: 'instructorProfileEdit' });
      } else {
        this.switchComponent({
          page: 'profile',
          component: 'ProfileEditSingle'
        });
      }
    }
  }
};
</script>