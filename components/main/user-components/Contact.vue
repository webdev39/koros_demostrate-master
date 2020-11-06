<template>
  <div class="contact">
    <header class="mobile-header" v-if="isMobile">
      <h1 class="mobile-title">Contact Us</h1>
      <div class="button-left">
        <div
          role="button"
          class="menu-button"
          @click="$router.push({ name: 'userProfile' })"
        >
          <svg
            width="14px"
            height="15px"
          >
            <use href="#close-icon"></use>
          </svg>
        </div>
      </div>
    </header>
    <div
      :class="{
        'mobile-body': isMobile,
        'contact-desktop': !isMobile
      }">
      <h1 class="section-title" v-if="!isMobile">Contact Us</h1>
      <div class="contact-form">
        <input
          type="text"
          placeholder="First name"
          v-model="firstName"
          v-inputfilter="'name'"
          name="first_name"
          @keyup.enter="handleSubmit"
          autocomplete="off"
          autocapitalize="off"
        />
        <input
          type="text"
          placeholder="Last name"
          v-model="lastName"
          name="last_name"
          v-inputfilter="'name'"
          @keyup.enter="handleSubmit"
          autocomplete="off"
          autocapitalize="off"
        />
        <input
          type="text"
          placeholder="Email address"
          v-model="email"
          name="email"
          @keyup.enter="handleSubmit"
          autocomplete="off"
          autocapitalize="off"
        />
        <input
          type="text"
          placeholder="Subject"
          v-model="subject"
          name="subject"
          @keyup.enter="handleSubmit"
          autocomplete="off"
          autocapitalize="off"
        />
        <textarea
          placeholder="Message"
          v-model="message"
          name="message"
          autocomplete="off"
          autocapitalize="off"
          @keyup.enter="handleSubmit"
          />
      </div>
      <button
        class="btn btn-primary"
        @click="handleSubmit"
      >Submit</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import MobileWidthMixin from '../../../mixins/MobileWidthMixin';

export default {
  data() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      subject: null,
      message: null
    }
  },
  mixins: [MobileWidthMixin],
  methods: {
    ...mapMutations('ui', ['switchComponent']),
    handleSubmit() {
      const { firstName, lastName, email, subject, message } = this;
    }
  }
}
</script>