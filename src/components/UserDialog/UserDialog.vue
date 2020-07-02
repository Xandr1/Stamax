<template>
  <v-dialog v-model="dialog" max-width="512">
    <v-card>
      <ValidationObserver v-slot="{ invalid }">
        <v-form ref="form" @submit.prevent="formSubmit">
          <v-card-title>
            <span class="headline">User Profile</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="12">
                  <ValidationProvider
                    name="Name"
                    rules="min:3|max:30|alpha"
                    v-slot="{ errors }"
                  >
                    <v-text-field v-model="name" label="Name"></v-text-field>
                    <span id="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="12">
                  <ValidationProvider
                    name="Job"
                    rules="min:2"
                    v-slot="{ errors }"
                  >
                    <v-text-field v-model="job" label="Job"></v-text-field>
                    <span id="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="12">
                  <ValidationProvider
                    name="Password"
                    rules="required|min:8|max:20|password:@Confirm Password"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      v-model="userPass"
                      label="Password (from 8 to 30 characters)"
                      type="password"
                    ></v-text-field>
                    <span id="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="12">
                  <ValidationProvider
                    name="Confirm Password"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      v-model="userPassConfirm"
                      label="Confirm Password"
                      type="password"
                    ></v-text-field>
                    <span id="error">{{ errors[0] }}</span>
                  </ValidationProvider>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close()">Close</v-btn>
            <v-btn
              v-if="user"
              color="blue darken-1"
              :disabled="invalid"
              text
              type="submit"
              @click="save(user.id)"
              >Save</v-btn
            >
            <v-btn
              v-else
              color="blue darken-1"
              :disabled="invalid"
              text
              type="submit"
              @click="add()"
              >Add</v-btn
            >
          </v-card-actions>
        </v-form>
      </ValidationObserver>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
import { extend } from "vee-validate";
import * as rules from "vee-validate/dist/rules";

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

extend("password", {
  params: ["target"],
  validate(value, { target }) {
    return value === target;
  },
  message: "Password confirmation does not match",
});

export default {
  name: "UserDialog",

  props: {
    user: Object,
    visible: Boolean,
  },

  data: () => ({
    name: null,
    job: null,
    userPass: null,
    userPassConfirm: null,
  }),

  computed: {
    dialog: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      },
    },
  },

  methods: {
    ...mapActions("users", ["saveUser", "addUser"]),
    close() {
      this.$refs.form.reset();
      this.dialog = false;
    },
    save(userId) {
      let userName = this.name;
      let userJob = this.job;
      this.saveUser({ userId, userName, userJob });
      this.$refs.form.reset();
      this.dialog = false;
    },
    add() {
      let userName = this.name;
      let userJob = this.job;
      this.addUser({ userName, userJob });
      this.$refs.form.reset();
      this.dialog = false;
    },
    formSubmit() {
      this.$refs.form.reset();
      this.dialog = false;
    },
  },
};
</script>
