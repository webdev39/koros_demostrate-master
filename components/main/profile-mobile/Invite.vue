<template>
  <div class="invite-user">
    <header class="mobile-header">
      <h1 class="mobile-title">Invite a Friend</h1>
      <div class="button-left">
        <div
          role="button"
          class="menu-button"
          @click="switchComponent({
              page: 'profile',
              component: 'ProfileView'
            })"
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
    <div class="mobile-body">
      <div class="intro">
        <img src="/img/inviteFriend_top.png" alt="" />
        Help your friends crush their dancing goals by inviting them to try Skydance.
      </div>
      <div class="button-group">
        <button
          class="btn btn-primary"
          @click="sendEmail"
        >
          Send with email
          <span>
            <svg
              width="8px"
              height="13px"
            >
              <use href="#arrow-right-icon"></use>
            </svg>
          </span>
        </button>
        <button
          class="btn btn-primary"
          @click="share"
        >
          Send with text
          <span>
            <svg
              width="8px"
              height="13px"
            >
              <use href="#arrow-right-icon"></use>
            </svg>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import { removeValidationsMessages } from '../../../helpers';

export default {
  methods: {
    ...mapMutations('ui', ['switchComponent']),
    sendEmail() {
      window.location.href = "mailto:?subject=Invite&body=message";
    },
    share() {
      console.log('here we share link to app');
    }
  }
}
</script>