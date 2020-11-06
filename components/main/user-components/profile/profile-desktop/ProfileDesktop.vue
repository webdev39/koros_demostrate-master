<template>
  <div class="content-desktop">
    <h1 class="section-title">Member settings</h1>

    <div class="content-wrapper">
      <div class="user-sidebar">
        <ul class="sidebar-nav">
          <li
            v-for="(tab, i) in sideBarTabs"
            :key="tab.title"
          >
            <div
              :class="['tab-item', { current: currentTab === i }]"
              @click="currentTab = i"
            >
              <div class="nav-icon">
                <svg
                  :width="tab.width"
                  :height="tab.height"
                  :class="{ 'stroke-color' : tab.stroke }"
                >
                  <use :href="`#${tab.iconId}`"></use>
                </svg>
              </div>
              <span>{{ tab.title }}</span>
            </div>
          </li>
        </ul>
      </div>
      <component :is="sideBarTabs[currentTab].component" />
    </div>
  </div>
</template>

<script>
import AccountInfo from './AccountInfo';

export default {
  data() {
    return {
      sideBarTabs: [
        {
          component: AccountInfo,
          title: 'Account information',
          iconId: 'user-icon',
          width: '22px',
          height: '20px',
          stroke: false 
        },
        {
          path: '/membership',
          title: 'Membership plan',
          iconId: 'user-icon',
          width: '22px',
          height: '20px',
          stroke: false
        },
        {
          path: '/payment',
          title: 'Payment method',
          iconId: 'user-icon',
          width: '22px',
          height: '20px',
          stroke: false
        }
      ],
      currentTab: 0,
    };
  },
  components: {
    AccountInfo
  }
};
</script>