<template>
  <div>
    <navbar />
    <div class="main">
      <mobile-menu
        :show="showMobileMenu"
        @close="toggleMobileMenu"
      />
      <div :class="[
        'content',
        {
          user: !isAdmin
        }]">
        <router-view :key="$route.path" />
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

  export default {
    created() {
      document.querySelector('.app').classList.remove('auth')
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
        isAdmin: 'account/isAdmin'
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
