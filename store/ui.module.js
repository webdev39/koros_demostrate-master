const state = {
  showMobileMenu: false,
  routeLoading: false,
  loading: false,
  mobileRouting: {
    profile: 'ProfileView',
    liveClasses: 'ListingMobile'
  }
}

const mutations = {
  toggleMobileMenu(state) {
    state.showMobileMenu = !state.showMobileMenu;
  },
  closeMobileMenu(state) {
    state.showMobileMenu = false
  },
  switchComponent(state, { page, component }) {
    state.mobileRouting[page] = component;
  },
  startRouteLoading(state) {
    state.routeLoading = true;
  },
  endRouteLoading(state) {
    state.routeLoading = false;
  },
  startLoading(state) {
    state.loading = true;
  },
  endLoading(state) {
    state.loading = false;
  }
}

export const ui = {
  namespaced: true,
  state,
  mutations
};