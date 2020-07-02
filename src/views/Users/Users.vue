<template src="./Users.html" />

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import UserCard from "../../components/UserCard/UserCard.vue";
import UserDialog from "../../components/UserDialog/UserDialog.vue";

export default {
  name: "Users",

  data: () => ({
    page: 1,
    createDialog: false,
  }),

  components: {
    UserCard,
    UserDialog,
  },

  mounted() {
    this.getUserlist(1);
  },

  watch: {
    page() {
      this.getUserlist(this.page);
    },
    "$route.path": function userId() {
      let id = +this.$route.params.id;
      if (id) {
        this.getSingleUser(id);
      } else {
        this.getUserlist(1);
      }
    },
  },

  computed: {
    ...mapState("users", ["currentUsers", "totalPages"]),
  },

  methods: {
    ...mapMutations({ setSnackbar: "snackbar/setSnackbar" }),
    ...mapActions("users", ["getUserlist", "getSingleUser"]),
  },
};
</script>

<style scoped>
.col-sm-4 {
  margin: 12px 0;
}
</style>
