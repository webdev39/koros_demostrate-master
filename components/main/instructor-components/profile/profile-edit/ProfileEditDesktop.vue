<template>
  <div
    :class="['instructor-profile-edit', {
      single: isSingleInstructor,
      double: !isSingleInstructor
    }]">
    <h1 class="section-title">Member settings</h1>
    <div :class="['block-edit', {
      single: isSingleInstructor,
      double: !isSingleInstructor
    }]">

      <!-- Single profile -->
      <div class="single-instructor" v-if="isSingleInstructor">
        <div class="instructor-main">
          <base-avatar width="103px" height="103px"   :haveUpload="true" :url="photo" ref="avatar" />
        </div>
        <h2 class="form-title">Basic Information</h2>
        <div class="profile-form">
          <div class="input-group">
            <label>First name</label>
            <input
              type="text"
              autocomplete="off"
              autocapitalize="off"
              v-model="firstName"
              v-inputfilter="'name'"
              name="first_name"
            />
          </div>

          <div class="input-group">
            <label>Last name</label
            ><input
              type="text"
              autocomplete="off"
              autocapitalize="off"
              v-model="lastName"
              v-inputfilter="'name'"
              name="last_name"
            />
          </div>

          <div class="input-group">
            <label>Email address</label
            ><input
              type="text"
              autocomplete="off"
              autocapitalize="off"
              v-model="email"
              disabled
            />
          </div>

          <div class="input-group">
            <label>Birthday</label>
            <input
              type="text"
              autocomplete="off"
              autocapitalize="off"
              ref="birthday"
              :value="birthday"
              name="birthday"
            />
          </div>

          <div class="inline-select">
            <label>Gender</label>
            <base-dict-select :options="genders" v-model="gender" />
          </div>

          <div class="inline-select">
            <label>State</label>
            <base-dict-select :options="states" v-model="state" />
          </div>

          <div class="inline-select">
            <label>City</label>
            <base-dict-select :options="filteredCities" v-model="city" />
          </div>

          <div class="input-group bio">
            <label>Bio</label>
            <textarea
              autocomplete="off"
              autocapitalize="off"
              v-model="bio"
              name="bio"
            />
          </div>
        </div>
      </div>
      <!-- End of single profile -->

      <!-- Double profile -->
      <div class="double-instructor" v-else>
        <div class="profile-title">
          Edit Profile
        </div>
        <div class="double-profile">
          <div class="half-profile">
            <div class="instructor-main">
              <BaseAvatar
                width="103px"
                height="103px"
                :url="photo"
                :haveUpload="true"
                @uploadPhoto="setPhoto"
                ref="avatar"
              />
            </div>
            <h2 class="form-title">Basic Information</h2>
            <div class="profile-form">
              <div class="input-group">
                <label>First name</label>
                <input
                  type="text"
                  autocomplete="off"
                  autocapitalize="off"
                  v-model="firstName"
                  v-inputfilter="'name'"
                  name="first_name"
                />
              </div>

              <div class="input-group">
                <label>Last name</label
                ><input
                  type="text"
                  autocomplete="off"
                  autocapitalize="off"
                  v-model="lastName"
                  v-inputfilter="'name'"
                  name="last_name"
                />
              </div>

              <div class="input-group">
                <label>Birthday</label>
                <input
                  type="text"
                  autocomplete="off"
                  autocapitalize="off"
                  ref="birthday"
                  :value="birthday"
                  name="dob"
                />
              </div>

              <div class="inline-select">
                <label>Gender</label>
                <base-dict-select :options="genders" v-model="gender" />
              </div>

              <div class="inline-select">
                <label>State</label>
                <base-dict-select :options="states" v-model="state" :tabindex="1" />
              </div>

              <div class="inline-select">
                <label>City</label>
                <base-dict-select
                  :options="filteredCities"
                  v-model="city"
                  :tabindex="0"
                  />
              </div>

            </div>
          </div>

          <div class="half-profile">
            <div class="instructor-main">

              <BaseAvatar
                width="103px"
                height="103px"
                :url="photoSub"
                :haveUpload="true"
                ref="avatarSub"
              />
            </div>
            <h2 class="form-title">Basic Information</h2>
            <div class="profile-form">

              <div class="input-group">
                <label>First name</label>
                <input
                  type="text"
                  autocomplete="off"
                  autocapitalize="off"
                  v-model="firstNameSub"
                  v-inputfilter="'name'"
                />
              </div>

              <div class="input-group">
                <label>Last name</label
                ><input
                  type="text"
                  autocomplete="off"
                  autocapitalize="off"
                  v-model="lastNameSub"
                  v-inputfilter="'name'"
                />
              </div>

              <div class="input-group">
                <label>Birthday</label>
                <input
                  type="text"
                  readonly
                  autocomplete="off"
                  autocapitalize="off"
                  ref="birthdaySub"
                  :value="birthdaySub"
                  name="dob"
                />
              </div>

              <div class="inline-select">
                <label>Gender</label>
                <base-dict-select :options="genders" v-model="genderSub" />
              </div>

              <div class="inline-select">
                <label>State</label>
                <base-dict-select :options="states" v-model="stateSub" :tabindex="3" />
              </div>

              <div class="inline-select">
                <label>City</label>
                <base-dict-select
                  :options="filteredCitiesSub"
                  v-model="citySub"
                  :tabindex="2"
                />
              </div>

            </div>
          </div>
        </div>
        
        <div class="profile-form common">

          <div class="input-group">
            <label>Email</label
            ><input
              type="text"
              autocomplete="off"
              autocapitalize="off"
              v-model="email"
              disabled
            />
          </div>

          <div class="input-group bio">
            <label>Bio</label>
            <textarea
              autocomplete="off"
              autocapitalize="off"
              v-model="bio"
            />
          </div>

        </div>
      </div>

      <!-- End of double profile -->
        <div class="change-password">

          <h2 class="form-title">Change your password</h2>

          <div class="profile-form">

            <div class="input-group">
              <label>Current Password</label>
              <input
                type="password"
                autocomplete="off"
                autocapitalize="off"
                name="current_password"
                v-model="currentPassword"
              />
            </div>

            <div class="input-group">
              <label>New<br> Password</label>
              <input
                type="password"
                autocomplete="off"
                autocapitalize="off"
                name="new_password"
                v-model="newPassword"
              />
            </div>

            <div class="input-group">
              <label>Confirm Password</label>
              <input
                type="password"
                autocomplete="off"
                autocapitalize="off"
                name="confirm_password"
                v-model="confirmPassword"
              />
            </div>

          </div>

        </div>

        <div class="button-group">
          <button
            class="btn btn-primary"
            @click="update"
            :disabled="status.loading"
            >
              <span v-if="status.loading"><i class="fa fa-spinner fa-pulse"></i></span>
              Update
            </button>
          <button
            class="btn btn-secondary"
            @click="$router.push({ name: 'main' })">Cancel</button>
        </div>

    </div>
  </div>
</template>

<script>
import moment from 'moment';
import datepicker from 'js-datepicker';
import ProfileSingleEditMixin from '../../../../../mixins/ProfileSingleEditMixin';

export default {
  mixins: [ProfileSingleEditMixin], 
  data() {
    return {
      pickerSub: null,
      firstNameSub: null,
      lastNameSub: null,
      birthdaySub: null,
      stateSub: null,
      citySub: null,
      photoSub: null,
      genderSub: null
    };
  },
  created() {
    if (!this.isSingleInstructor) {
      this.firstNameSub = this.user.subprofile.first_name
      this.lastNameSub = this.user.subprofile.last_name
      this.birthdaySub = this.user.subprofile.dob ? moment(this.user.subprofile.dob).format('L') : null;
      this.photoSub = this.user.subprofile.photo;
      this.citySub = this.user.subprofile.city ? this.user.subprofile.city : null;
      this.stateSub = this.user.subprofile.city ? this.states.find(state => state.id === this.citySub.state_id) : null;
      this.genderSub = this.user.subprofile.gender ? this.user.subprofile.gender : null;
    }
  },
  mounted() {
    if (!this.isSingleInstructor) {
      this.pickerSub = datepicker(this.$refs.birthdaySub, {
        maxDate: moment().subtract(18, 'years').toDate(),
        startDate: moment().subtract(18, 'years').toDate(),
        formatter: (input, date, instance) => {
          const value = moment(date).format('L')
          input.value = value
          this.birthdaySub = value
        }
      });
    }
  },
  computed: {
    filteredCitiesSub() {
      return this.stateSub ? this.cities.filter(
        city => this.stateSub.id === city.state_id) : this.cities
    }
  },
  watch: {
    stateSub(value) {
      if (this.citySub && this.citySub.state_id !== value.id) {
        this.citySub = null
      }
    }
  },
  methods: {
    setPhoto(e) {
      this.photo = e;
    },
    update() {
      const {
        firstName, lastName, firstNameSub, lastNameSub, birthday, birthdaySub, gender, genderSub, city, citySub, currentPassword, newPassword, confirmPassword, bio
      } = this;
      this.updateProfile({
        firstName,
        lastName,
        birthday: birthday ? moment(birthday).format('YYYY-MM-DD') : null,
        gender: gender ? gender.id : null,
        location: city ? city.id : null,
        photo: this.$refs.avatar ? this.$refs.avatar.photo : null,
        bio,
        firstNameSub,
        lastNameSub,
        birthdaySub: birthdaySub ? moment(birthdaySub).format('YYYY-MM-DD') : null,
        genderSub: genderSub ? genderSub.id : null,
        locationSub: citySub ? citySub.id : null,
        photoSub: this.$refs.avatarSub ? this.$refs.avatarSub.photo : null
      }).then(async () => {
          if (currentPassword || newPassword || confirmPassword) {
            this.clearAlert();
            await this.changePassword({currentPassword, newPassword, confirmPassword}).then(() => {
              this.currentPassword = null,
              this.newPassword = null,
              this.confirmPassword = null 
            });
          }
      }).catch(() => {
          console.log('err');
      });
    }
  }
}
</script>