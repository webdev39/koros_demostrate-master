<template>
  <nav class="footer-nav">
    <ul class="footer-menu">
      <li>
        <router-link :to="{ name: 'allClasses' }" class="nav__link">
          <div class="nav__icon">
            <svg
              width="20px"
              height="18px"
              class="stroke-color"
            >
              <use href="#classes-icon"></use>
            </svg>
          </div>
          <span>Classes</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'tips' }" class="nav__link">
          <div class="nav__icon">
            <svg
              width="21px"
              height="20px"
            >
              <use href="#tips-icon"></use>
            </svg>
          </div>
          <span>Tips</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'liveClassCourses' }" class="nav__link"
        :class="{ live: currentLiveInCourses }">
          <div class="nav__icon">
            <svg
              width="25px"
              height="20px"
            >
              <use href="#live-icon"></use>
            </svg>
          </div>
          <span>Live</span>
        </router-link>
      </li>
      <li>
        <router-link to="/" class="nav__link">
          <div class="nav__icon">
            <svg
              width="18px"
              height="21px"
            >
              <use href="#ring-icon"></use>
            </svg>
          </div>
          <span>Notifications</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      currentLiveInCourses: state => state.classes.currentLiveInCourses
    })
  }
}
</script>
