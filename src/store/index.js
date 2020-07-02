import Vue from "vue";
import Vuex from "vuex";
import users from "./users";

Vue.use(Vuex);

//причина такої структури - плани створення ще 1+ модуля store
export default new Vuex.Store({
  modules: {
    users,
  },
});
