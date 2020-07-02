import axios from "axios";

const state = () => ({
  currentUsers: [],
  totalPages: null,
});

const mutations = {
  SET_USERS(state, users) {
    state.currentUsers = users;
  },
  SET_USER(state, user) {
    state.currentUsers = [user];
  },
  UPD_USER(state, { userId, response }) {
    for (let i = 0; i < state.currentUsers.length; i++) {
      if (state.currentUsers[i].id === userId)
        state.currentUsers[i].first_name = response.data.name;
    }
  },
  DELETE_USER(state, userId) {
    state.currentUsers = state.currentUsers.filter(function (
      value,
      index,
      arr
    ) {
      return arr[index].id !== userId;
    });
  },
  ADD_USER(state, newUser) {
    state.currentUsers.unshift({
      id: newUser.data.id,
      first_name: newUser.data.name,
    });
  },
  SET_PAGES(state, pages) {
    state.totalPages = pages;
  },
};

const actions = {
  getUserlist(context, page) {
    axios
      .get("https://reqres.in/api/users?page=" + page)
      .then((response) => {
        context.commit("SET_USERS", response.data.data);
        context.commit("SET_PAGES", response.data.total_pages);
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      });
  },
  getSingleUser(context, id) {
    axios
      .get("https://reqres.in/api/users/" + id)
      .then((response) => {
        context.commit("SET_USER", response.data.data);
        context.commit("SET_PAGES", null);
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      });
  },
  deleteUser(context, userId) {
    axios.delete("https://reqres.in/api/users/users/" + userId).then(
      (response) => {
        console.log(response);
        context.commit("DELETE_USER", userId);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  saveUser(context, { userId, userName, userJob }) {
    axios
      .put("https://reqres.in/api/users/" + userId, {
        name: userName,
        job: userJob,
      })
      .then(
        (response) => {
          console.log(response);
          context.commit("UPD_USER", { userId, response });
        },
        (error) => {
          console.log(error);
        }
      );
  },
  addUser(context, { userName, userJob }) {
    axios
      .post("https://reqres.in/api/users/", {
        name: userName,
        job: userJob,
      })
      .then(
        (response) => {
          console.log(response);
          context.commit("ADD_USER", response);
        },
        (error) => {
          console.log(error);
        }
      );
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
