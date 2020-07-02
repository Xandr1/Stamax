<template>
  <v-app>
    <v-card class="d-flex flex-row mb-6" height="100%" flat>
      <v-card height="100%" width="256px">
        <v-navigation-drawer permanent>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title">
                Stamax
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list nav dense>
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              :to="item.link"
              link
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-card>
      <router-view></router-view>
    </v-card>
  </v-app>
</template>
<script>
export default {
  name: "App",
  data: () => ({
    items: [
      {
        icon: "mdi-home",
        text: "Home",
        link: "/",
      },
      {
        icon: "mdi-account-multiple",
        text: "Users",
        link: "/users",
      },
    ],
  }),
};
</script>
