<template>
  <div class="row sticky-top p-0">
    <div class="col-12 p-0">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <img
          class="p-1 m-1"
          src="https://cdn.pixabay.com/photo/2016/03/31/19/14/check-box-1294836_960_720.png"
          width="40"
          alt
        />
        <router-link class="navbar-brand" :to="{ name: 'boards' }">Kanban Kabana</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item" :class="{ active: $route.name == 'home' }">
              <router-link :to="{ name: 'home' }" class="nav-link">Home</router-link>
            </li>
            <li
              class="nav-item"
              v-if="$auth.isAuthenticated"
              :class="{ active: $route.name == 'boards' }"
            >
              <router-link class="nav-link" :to="{ name: 'boards' }">My-Dashboard</router-link>
            </li>
          </ul>
          <span class="navbar-text">
            <button class="btn btn-success" @click="login" v-if="!$auth.isAuthenticated">Login</button>
            <button class="btn btn-danger" @click="logout" v-else>logout</button>
          </span>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import axios from "axios";

let _api = axios.create({
  baseURL: "https://localhost:3000",
  withCredentials: true
});
export default {
  name: "Navbar",
  methods: {
    async login() {
      await this.$auth.loginWithPopup();
      this.$store.dispatch("setBearer", this.$auth.bearer);
      this.$store.dispatch("getProfile");
      console.log("this.$auth.user: ");
      console.log(this.$auth.user);
    },
    async logout() {
      await this.$auth.logout({ returnTo: window.location.origin });
    }
  }
};
</script>

<style></style>
