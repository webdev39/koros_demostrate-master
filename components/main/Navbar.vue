<template>
  <div class="navbar">
    <div class="navbar__left">
      <router-link :to="{ name: isAdmin ? 'classes' : 'allClasses' }">
        <img src="/img/icons/logo.svg" class="navbar__logo" />
      </router-link>
      <ul class="nav__menu" v-if="roleId !== 1">
        <li>
          <router-link :to="{ name: 'allClasses' }" class="nav__link">Classes</router-link></li>
        <li><router-link :to="{ name: 'tips' }" class="nav__link">Tips</router-link></li>
        <li><router-link :to="{ name: 'liveClassCourses' }" class="nav__link">Live</router-link></li>
        <li><a href="#" class="nav__link">Saved</a></li>
      </ul>
    </div>
    <div class="navbar__right">
      <div class="search__container" v-if="!isAdmin">
        <img
          src="/img/icons/search-pink.svg"
          class="search__button"
          @click="showSearch = !showSearch"
          role="button"
        />
        <div class="navbar__search">
          <div class="search__input__group full-screen">
            <img src="/img/icons/search.svg" />
            <input type="text" class="search__input" placeholder="Search" />
          </div>
          <transition name="quick-fade">
            <div class="select__container" v-show="showSearch">
              <div class="search__input__group">
                <img src="/img/icons/search.svg" />
                <input type="text" class="search__input" placeholder="Search" />
              </div>
            </div>
          </transition>
        </div>
      </div>
      <img src="/img/icons/ring.svg" class="navbar__ring" />
      <div class="navbar__wrap">
        <base-avatar :url="photo" />
      </div>
      <div @click="openMenu" class="navbar__profile">
        <div class="user__name">{{ fullName }}</div>
        <i class="arrow down"></i>
        <ul class="dropdown-menu" v-show="showMenu" :class="{ open: showMenu }">
          <li class="item">
            <router-link :to="{ name: profileLink }" class="item__link">
              Profile
            </router-link>
          </li>
          <li class="item" v-if="isUser">
            <router-link :to="{ name: 'contact' }" class="item__link">
              Help
            </router-link>
          </li>
          <li @click.prevent="handleLogout" class="item">
            <a href="#" class="item__link">
              Sign Out
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      showMenu: false,
      showSearch: false
    };
  },
  computed: {
    ...mapState({
      photo: (state) => state.account.user.photo,
      roleId: (state) => state.account.user.role_id
    }),
    ...mapGetters({
      fullName: 'account/fullName',
      isUser: 'account/isUser',
      isAdmin: 'account/isAdmin'
    }),
    profileLink() {
      switch(this.roleId) {
        case 1:
          return 'profile';
        case 2:
          return 'userProfile';
        case 3:
          return 'instructorProfile';
        default:
          return 'userProfile';
      }
    }
  },
  created() {
    let curObj = this;
    document.querySelector('body').onclick = function(e) {
      if (e.target.closest('.navbar__profile') === null) {
        curObj.showMenu = false;
      }
    };
  },
  methods: {
    ...mapActions('account', ['logout']),
    openMenu() {
      this.showMenu = !this.showMenu;
    },
    handleLogout() {
      this.$router.push({ name: 'login' });
      this.logout();
    }
  }
};
</script>
