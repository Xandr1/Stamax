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
  },

  computed: {
    ...mapState("users", ["currentUsers", "totalPages"]),
  },

  methods: {
    ...mapMutations({ setSnackbar: "snackbar/setSnackbar" }),
    ...mapActions("users", ["getUserlist"]),
  },
};
</script>

<style scoped>
.col-sm-4 {
  margin: 12px 0;
}
</style>
