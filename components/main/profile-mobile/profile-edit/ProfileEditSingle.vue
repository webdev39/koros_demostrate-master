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
      <div class="user">
        <div class="avatar-wrapper">
          <base-avatar
            width="102px"
            height="102px"
            :haveUpload="true"
            :url="photo"
            ref="avatar"
          />
        </div>
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
          <li class="info-item textarea" v-if="isInstructor">
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
import ProfileSingleEditMixin from '../../../../mixins/ProfileSingleEditMixin';

export default {
  mixins: [ProfileSingleEditMixin],
  computed: {
    ...mapGetters({
      isInstructor: 'account/isInstructor'
    })
  },
  created() {
    console.log('creating mobile edit')
  },
  methods: {
    ...mapMutations('ui', ['switchComponent']),
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