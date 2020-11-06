<template>
  <div class="account">
    <div class="account__photo">
      <base-avatar width="103px" height="103px" :haveUpload="true" :url="photo" ref="avatar" />
    </div>
    <div class="account__content">
      <section class="account__info">
        <h2 class="account-title">Basic Information</h2>
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
              readonly
              autocomplete="off"
              autocapitalize="off"
              ref="birthday"
              :value="birthday"
              name="dob"
            />
          </div>

          <div class="select-group">
            <label>Gender</label>
            <base-dict-select :options="genders" v-model="gender" />
          </div>

          <div class="select-group">
            <label>State</label>
            <base-dict-select :options="states" v-model="state" />
          </div>

          <div class="select-group">
            <label>City</label>
            <base-dict-select :options="filteredCities" v-model="city" />
          </div>

        </div>
      </section>

      <section class="account__info">
        <h2 class="account-title">Proficiency Level</h2>
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
      </section>

      <section class="account__info">
        <h2 class="account-title">Change your password</h2>
        <div class="profile-form">
          <div class="input-group full-width">
            <label>Current Password</label>
            <input
              type="password"
              autocomplete="off"
              autocapitalize="off"
              name="old_password"
              v-model="currentPassword"
            />
          </div>
          <div class="input-group">
            <label>New Password</label>
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
      </section>

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
          @click="$router.push('/')"
        >Cancel</button>
      </div>
    </div> 
  </div>
</template>

<script>
import ProfileSingleEditMixin from '../../../../../mixins/ProfileSingleEditMixin';

export default {
  mixins: [ProfileSingleEditMixin],
  data() {
    return {
      profLevel: 'Advanced'
    };
  }
};
</script>
