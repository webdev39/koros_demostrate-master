import Vue from 'vue';
import Vuex from 'vuex';

import { users } from './users.module';
import { alert } from './alert.module';
import { account } from './account.module';
import { animation } from './animation.module';
import { ui } from './ui.module';
import { classes } from './classes.module';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    users,
    alert,
    account,
    animation,
    ui,
    classes
  }
});
