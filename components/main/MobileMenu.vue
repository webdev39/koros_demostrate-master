<template>
  <transition name="slide" mode="out-in">
    <div
      class="mobile__menu"
      v-if="show"
    >
      <div class="back-button" role="button" @click="close">
        <i class="fa fa-arrow-left"></i>
      </div>
      <div class="user">
        <base-avatar
          width="86px"
          height="86px"
          :url="user.photo"
        />
        <div class="user__data">
          <div class="user__name">
            {{ fullName }}
          </div>
          <div class="membership">Member since Mar 2019</div>
        </div>
      </div>
      <nav class="mobile__nav">
        <ul>
          <li>
            <router-link
              :to="{ name: isUser ? 'userProfile' : 'instructorProfile'}"
              class="nav__link"
            >
              <div class="nav__icon">
                <svg
                  width="18px"
                  height="20px"
                >
                  <use href="#user-icon"></use>
                </svg>
              </div>
              <span>Profile</span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/"
              class="nav__link"
            >
              <div class="nav__icon">
                <i class="fas fa-bookmark"></i>
              </div>
              <span>Bookmarks</span>
            </router-link>
          </li>
          <li>
            <a
              href="#"
              class="nav__link" @click.prevent="goTo('Invite')">
              <div class="nav__icon">
                <svg
                  width="21px"
                  height="21px"
                >
                  <use href="#user-plus-icon"></use>
                </svg>
              </div>
              <span>Invite a Friend</span>
            </a>
          </li>
          <li>
            <router-link :to="{ name: 'contact' }"
              class="nav__link">
              <div class="nav__icon">
                <i class="fa fa-question-circle"></i>
              </div>
              <span>Get help</span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/"
              class="nav__link"
            >
              <div class="nav__icon">
                <svg
                  width="22px"
                  height="20px"
                  class="stroke-color"
                >
                  <use href="#percent-icon"></use>
                </svg>
              </div>
              <span>Promo Code</span>
            </router-link>
          </li>
          <!-- <li class="notification__item">
            <router-link
              to="/"
              class="nav__link"
            >
              <div class="nav__icon">
                <svg
                  width="22px"
                  height="20px"
                >
                  <use href="#ring-icon"></use>
                </svg>
              </div>
              <span>Notifications</span>
            </router-link>
            <div class="notifications__toggle">
              <input type="checkbox">
            </div>
          </li> -->
        </ul>
      </nav>
      <hr />
      <ul class="side__nav">
        <li>
          <router-link :to="{ name: 'privacyPolicy' }">Privacy Policy</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'termsOfUse' }">Terms of Use</router-link>
        </li>
        <li>
          <a
            href="/"
            @click.prevent="handleLogout"
          >Log Out</a>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  props: {
    show: {
      type: Boolean
    }
  },
  computed: {
    ...mapState('ui',
      { showMobileMenu: state => state.showMobileMenu }),
      ...mapState('account',
      { user: state => state.user }),
    ...mapGetters({
      fullName: 'account/fullName',
      isUser: 'account/isUser'
    })
  },
  watch: {
    $route() {
      this.showMobileMenu && this.$emit('close');
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    ...mapActions('account', ['logout']),
    ...mapMutations('ui', ['switchComponent']),
    handleLogout() {
      this.logout();
      this.$router.push({ name: 'login' });
    },
    goTo(component) {
      this.switchComponent({
        page: 'profile',
        component
      });
      this.close();
    }
  }
};
</script>
