<template>
  <div class="forgot-password">
    <div class="koros__title">
      <img class="login__img" src="/img/login_logo.svg" />
    </div>
    <div class="forgot-password__form">
      <div class="title">
        Restore password
      </div>
      <div class="form">
        <div class="form-group email">
          <input
            type="text"
            placeholder="Email"
            class="form-input"
            v-model="email"
            name="email"
            autocomplete="off"
            autocapitalize="off"
          />
        </div>
      </div>
      <button
        @click="sendEmail"
        class="submit"
        :disabled="status.loading"
      >
        <span v-if="status.loading"
        ><i class="fa fa-spinner fa-pulse"></i
        ></span>
        Send email
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      email: ''
    };
  },
  created() {
    document.querySelector('.back').className =
      document.querySelector('.back').className + ' show';
  },
  computed: {
    ...mapState({
      status: (state) => state.account.status
    })
  },
  methods: {
    ...mapActions('account', ['forgotPassword']),
    ...mapActions('animation', ['play']),
    sendEmail(e) {
      let className = 'submit';
      let clickClassName = 'clicked';
      this.play({ className, clickClassName });

      const email = this.email;
      this.forgotPassword({ email });
    }
  }
};
</script>
