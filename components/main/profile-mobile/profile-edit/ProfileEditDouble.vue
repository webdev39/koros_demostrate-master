<template>
  <div :class="{'instructor-profile': isInstructor}">
    <header class="mobile-header">
      <div class="button-left">
        <div
          role="button"
          class="menu-button"
          @click="switchToProfile"
        >
          <svg
            width="16px"
            height="16px"
          >
            <use href="#arrow-left-icon"></use>
          </svg>
        </div>
      </div>
    </header>
    <div class="mobile-body">
      <div class="half-profile">
        <div class="instructor-main">
          <base-avatar
            width="102px"
            height="102px"
            :haveUpload="true"
            :url="photo"
            ref="avatar"
          />
        </div>
        <div class="account__info">
          <ul class="profile-info edit">
            <li class="info-item">
              <div class="item-title">First name</div>
              <div class="mobile-input">
                <input
                  type="text"
                  autocomplete="off"
                  autocapitalize="off"
                  v-model="firstName"
                  v-inputfilter="'name'"
                  name="first_name"
                />
              </div>
            </li>
            <li class="info-item">
              <div class="item-title">Last name</div>
              <div class="mobile-input">
                <input
                  type="text"
                  autocomplete="off"
                  autocapitalize="off"
                  v-model="lastName"
                  v-inputfilter="'name'"
                  name="last_name"
                />
              </div>
            </li>
            <li class="info-item">
              <div class="item-title">State</div>
              <div class="mobile-input">
                <base-dict-select :options="states" v-model="state" />
              </div>
            </li>
            <li class="info-item">
              <div class="item-title">City</div>
              <div class="mobile-input">
                <base-dict-select :options="filteredCities" v-model="city" />
              </div>
            </li>
            <li class="info-item">
              <div class="item-title">Birthday</div>
              <div class="mobile-input">
                <input
                  type="text"
                  readonly
                  autocomplete="off"
                  autocapitalize="off"
                  ref="birthday"
                  :value="birthday"
                  name="dob"
                />
              </div>
            </li>
            <li class="info-item">
              <div class="item-title">Gender</div>
              <div class="mobile-input">
                <base-dict-select :options="genders" v-model="gender" />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="half-profile">
        <div class="instructor-main">
          <base-avatar
            width="102px"
            height="102px"
            :haveUpload="true"
            :url="photoSub"
            ref="avatarSub"
          />
        </div>
        <div class="account__info">
          <ul class="profile-info edit">
            <li class="info-item">
              <div class="item-title">First name</div>
              <div class="mobile-input">
                <input
                  type="text"
                  autocomplete="off"
                  autocapitalize="off"
                  v-model="firstNameSub"
                  v-inputfilter="'name'"
                  name="first_name"
                />
              </div>
            </li>
            <li class="info-item">
              <div class="item-title">Last name</div>
              <div class="mobile-input">
                <input
                  type="text"
                  autocomplete="off"
                  autocapitalize="off"
                  v-model="lastNameSub"
                  v-inputfilter="'name'"
                  name="last_name"
                />
              </div>
            </li>
            <li class="info-item">
              <div class="item-title">State</div>
              <div class="mobile-input">
                <base-dict-select :options="states" v-model="stateSub" />
              </div>
            </li>
            <li class="info-item">
              <div class="item-title">City</div>
              <div class="mobile-input">
                <base-dict-select :options="filteredCitiesSub" v-model="citySub" />
              </div>
            </li>
            <li class="info-item">
              <div class="item-title">Birthday</div>
              <div class="mobile-input">
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
            </li>
            <li class="info-item">
              <div class="item-title">Gender</div>
              <div class="mobile-input">
                <base-dict-select :options="genders" v-model="genderSub" />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="account__info">
        <ul class="profile-info edit">
          <li class="info-item">
            <div class="item-title">Email</div>
            <div class="mobile-input">
              <input
                type="text"
                autocomplete="off"
                autocapitalize="off"
                v-model="email"
                name="email"
                disabled
              />
            </div>
          </li>
          <li class="info-item textarea">
            <div class="item-title">Bio</div>
            <div class="mobile-input">
              <textarea
                autocomplete="off"
                autocapitalize="off"
                v-model="bio"
                name="bio"
              />
            </div>
          </li>
        </ul>
      </div>

      <button
        class="btn btn-primary"
        :disabled="status.loading"
        @click="update"
      >
        <span v-if="status.loading"><i class="fa fa-spinner fa-pulse"></i></span>
      Save</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import moment from 'moment';
import datepicker from 'js-datepicker';
import ProfileSingleEditMixin from '../../../../mixins/ProfileSingleEditMixin';

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
    }
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
    ...mapGetters({
      isInstructor: 'account/isInstructor'
    }),
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
    ...mapMutations('ui', ['switchComponent']),
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
          photo: this.$refs.avatar.photo,
          firstNameSub,
          lastNameSub,
          birthdaySub: birthdaySub ? moment(birthdaySub).format('YYYY-MM-DD') : null,
          genderSub: genderSub ? genderSub.id : null,
          locationSub: citySub ? citySub.id : null,
          photoSub: this.$refs.avatarSub ? this.$refs.avatarSub.photo : null, 
          bio
      }).catch(() => {
          console.log('err');
      });
    },
    switchToProfile() {
      if (this.isInstructor) {
        this.$router.push({ name: 'instructorProfile' });
      } else {
        this.switchComponent({
          page: 'profile',
          component: 'ProfileView'
        });
      }
    }
  }
}
</script>