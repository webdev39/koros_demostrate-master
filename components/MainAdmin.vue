<template>
  <div v-bind:class="{ main__wrap: isAdmin }">
    <navbar />
    <div class="main" v-bind:class="{ main_admin: isAdmin }">
      <sidebar v-if="isAdmin" />
      <mobile-menu
        v-if="!isAdmin"
        :show="showMobileMenu"
        @close="toggleMobileMenu"
      />
      <div :class="[
        'content',
        {
          user: isUser,
          instructor: isInstructor
        }]">
        <router-view :key="$route.path">
        </router-view>
        <mobile-footer v-if="isMobile" />
      </div>
    </div>
    <route-loader v-if="routeLoading" />
  </div>
</template>

<script>
  import {mapActions, mapState, mapMutations, mapGetters} from 'vuex';
  import RouteLoader from './RouteLoader';
  import MobileFooter from './main/MobileFooter';
  import MobileWidthMixin from '../mixins/MobileWidthMixin';
  import {store} from "../store";

  export default {
    created() {
      document.querySelector('.app').classList.remove('auth');
    },
    components: {
      RouteLoader,
      MobileFooter
    },
    computed: {
      ...mapState({
        roleId: (state) => state.account.user.role_id,
        showMobileMenu: (state) => state.ui.showMobileMenu,
        routeLoading: (state) => state.ui.routeLoading
      }),
      ...mapGetters({
        isAdmin: 'account/isAdmin',
        isUser: 'account/isUser',
        isInstructor: 'account/isInstructor'
      })
    },
    mixins: [MobileWidthMixin],
    methods: {
      ...mapMutations('ui', [
        'toggleMobileMenu'
      ])
    }
  };
</script>
