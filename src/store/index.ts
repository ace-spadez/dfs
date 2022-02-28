import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';

import { mainModule } from './main';
import { State } from './state';
import { adminModule } from './admin';
import {registerModule} from './register';
import { homeModule } from './home';
import { contestModule } from './contest';
import {quadrantModule} from './quadrant';
import {quadContestModule} from './quadcontest'
Vue.use(Vuex);

const storeOptions: StoreOptions<State> = {
  modules: {
    main: mainModule,
    admin: adminModule,
    register: registerModule,
    home: homeModule,
    contest : contestModule,
    quadrant:quadrantModule,
    quadContest: quadContestModule
  },
};

export const store = new Vuex.Store<State>(storeOptions);

export default store;
