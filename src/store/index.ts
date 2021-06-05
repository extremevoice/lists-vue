import Vue from 'vue';
import Vuex from 'vuex';

import listsModule from './modules/lists.module';
import selectModule from './modules/select.module';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        lists: listsModule,
        select: selectModule,
    },
});
