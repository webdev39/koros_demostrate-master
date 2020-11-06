<template>
  <div
    :class="['instructor-profile-view', {
      single: isSingleInstructor,
      double: !isSingleInstructor
    }]">
    <h1 class="section-title">Member settings</h1>
    <profile-view-single
      v-if="isSingleInstructor"
      :photo="user.photo"
      :fullName="fullName"
      :location="location"
      :email="user.email"
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
import { mapState, mapGetters } from 'vuex';
import ProfileViewSingle from './ProfileViewSingle';
import ProfileViewDouble from './ProfileViewDouble';

  export default {
    components: {
      ProfileViewSingle,
      ProfileViewDouble
    },
    computed: {
      ...mapState('account', { user: state => state.user }),
      ...mapGetters({
        isSingleInstructor: 'account/isSingleInstructor',
        location: 'account/location',
        locationSub: 'account/locationSub',
        gender: 'account/gender',
        genderSub: 'account/genderSub',
        birthday: 'account/birthday',
        birthdaySub: 'account/birthdaySub',
        fullName: 'account/fullName',
        fullNameSub: 'account/fullNameSub'
      })
    }
  }
</script>