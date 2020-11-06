<template>
  <div :class="{ 
    'admin-section': isAdmin,
    'page-middle': !isAdmin
  }">
    <listing-desktop v-if="!isMobile || isAdmin" />
    <component :is="mobileComponent" v-if="isMobile && !isAdmin" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import ListingDesktop from './ListingDesktop';
import ListingMobile from './ListingMobile';
import FilterMobile from './FilterMobile';
import MobileWidthMixin from '../../../../mixins/MobileWidthMixin';
import { store } from '../../../../store/index'

export default {
  beforeRouteEnter(routeTo, routeFrom, next) {
    store.commit('ui/startRouteLoading', null, { root: true });
    store.dispatch('classes/findLiveClassCourses', null, { root: true })
      .then(() => {
        store.commit('ui/endRouteLoading', null, { root: true });
        next()
      })
      .catch(() => {
        store.commit('ui/endRouteLoading', null, { root: true });
      })
  },
  mixins: [MobileWidthMixin],
  components: {
    ListingDesktop,
    ListingMobile,
    FilterMobile
  }, 
  computed: {
    ...mapState('ui', {
      mobileComponent: state => state.mobileRouting.liveClasses,
    }),
    ...mapGetters({
      isUser: 'account/isUser',
      isAdmin: 'account/isAdmin'
    })
  }
};
</script>