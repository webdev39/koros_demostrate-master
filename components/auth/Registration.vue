<template>
  <div class="registration">
    <div class="koros__title">
      <img
        class="koros__img"
        src="/img/login_logo.svg"
      >
    </div>
    <div class="registration__form">
      <div class="title">
        Sign up
      </div>
      <input
        type="text"
        placeholder="First name"
        class="form-input"
        v-model="first_name"
        v-inputfilter="'name'"
        name="first_name"
        @keyup.enter="handleSubmit"
        autocomplete="off"
        autocapitalize="off"
      />
      <input
        type="text"
        placeholder="Last name"
        class="form-input"
        v-model="last_name"
        name="last_name"
        v-inputfilter="'name'"
        @keyup.enter="handleSubmit"
        autocomplete="off"
        autocapitalize="off"
      />
      <input
        type="text"
        placeholder="Email address"
        class="form-input email"
        v-model="email"
        name="email"
        @keyup.enter="handleSubmit"
        autocomplete="off"
        autocapitalize="off"
      />
      <input
        type="password"
        placeholder="Password"
        class="form-input password"
        @keyup.enter="handleSubmit"
        v-model="password"
        name="password"
        autocomplete="off"
        autocapitalize="off"
      />
      <button
        @click="handleSubmit"
        class="submit"
        :disabled="status.registering"
      >
        <span v-if="status.registering"><i class="fa fa-spinner fa-pulse"></i></span>
        Join Koros
      </button>
      <div class="divider">
        <hr>
        <span>OR</span>
      </div>
      <div class="social-signin">
        <button class="apple">
          <span><i class="fab fa-apple"></i></span>
          Sign in with Apple
        </button>
        <button class="google">
          <span><i class="fab fa-google-plus-g"></i></span>
          Sign in with Google
        </button>
      </div>
      <div class="terms">By continuing, you accept our <router-link :to="{ name: 'termsOfUse' }">Terms of Service</router-link> and <router-link :to="{ name: 'privacyPolicy' }"> Policy</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      first_name: null,
      last_name: null,
      email: null,
      password: null,
      device_os: "web"
    };
  },
  computed: {
    ...mapState("account", {
      status: state => state.status
    })
  },
  methods: {
    ...mapActions("account", ["register"]),
    handleSubmit(e) {
      const { first_name, last_name, email, password, device_os } = this;
      this.register({
        first_name,
        last_name,
        email,
        password,
        device_os
      });
    }
  }
};
</script>
