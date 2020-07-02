<template>
  <v-card class="mx-auto" max-width="256" min-width="212" height="268" outlined>
    <v-img :src="user.avatar" height="150"></v-img>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1"
          >{{ user.first_name }} {{ user.last_name }}</v-list-item-title
        >
        <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions>
      <v-btn small outlined @click="delUser(user.id)">Delete</v-btn>
      <v-btn small outlined color="purple" @click.stop="editDialog = true"
        >Edit</v-btn
      >
      <v-btn small outlined color="blue">Show</v-btn>
    </v-card-actions>
    <user-dialog
      :visible="editDialog"
      @close="editDialog = false"
      :user="user"
      :retain-focus="false"
      persistent
    />
  </v-card>
</template>

<script>
import UserDialog from "../UserDialog/UserDialog";
import { mapActions } from "vuex";

export default {
  name: "UserCard",

  props: {
    user: Object,
  },

  components: {
    UserDialog,
  },

  data: () => ({
    editDialog: false,
  }),

  methods: {
    ...mapActions("users", ["deleteUser", "saveUser"]),
    save(userId) {
      let userName = this.name;
      let userJob = this.job;
      this.saveUser({ userId, userName, userJob });
      this.$refs.form.reset();
      this.dialog = false;
    },
    delUser(userId) {
      this.deleteUser(userId);
    },
  },
};
</script>
