<template>
  <div class="row">
    <div class="col-12">
      <div class="row">
        <div class="col-12 p-0">
          <img
            class="p-absolute img-full"
            src="https://images.pexels.com/photos/3810756/pexels-photo-3810756.jpeg?auto=compress&cs=tinysrgb&dpr=1"
            alt
          />
        </div>
      </div>
      <div class="home row">
        <div class="col-12 col-lg-10 m-auto mt-5">
          <div class="shadow welcome-card m-3 mt-70 p-1 b-radius">
            <div class="mt-1">
              <h1 class="text-primary pl-lg-5 p-2">Welcome to Kanban Kabana</h1>
              <hr />
            </div>
            <p class="p-1 m-1">
              If you need to get a team ready for a project you have come to the
              right place. We are all about keeping the endless stream of todos
              in order.
            </p>

            <div class="p-relative d-flex justify-content-center p-3">
              <button
                class="btn btn-primary btn-lg push-down shadow"
                @click="login"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12"></div>
  </div>
</template>

<script>
import axios from "axios";
import Boards from "./Boards.vue";

let _api = axios.create({
  baseURL: "https://localhost:3000",
  withCredentials: true,
});
export default {
  data() {
    return {};
  },
  name: "Navbar",
  methods: {
    async login() {
      await this.$auth.loginWithPopup();
      this.$store.dispatch("setBearer", this.$auth.bearer);
      this.$store.dispatch("getProfile");
    },
    async logout() {
      await this.$auth.logout({ returnTo: window.location.origin });
    },
  },
  components: {
    Boards,
  },
};
</script>

<style>
.action {
  transition: 0.4s;
  cursor: pointer;
}
.b-radius {
  border-radius: 8px;
}
.img-full {
  z-index: -1;
  padding: 0px;
  margin: 0px;
  width: 100%;
  overflow: hidden;
}

.push-up {
  position: absolute;
}
.push-down {
  position: absolute;
  top: 0.75rem;
}
.p-absolute {
  position: absolute;
}
.p-relative {
  position: relative;
}
.welcome-card {
  background-color: rgba(255, 230, 149, 0.835);
}
.mt-70 {
  margin-top: 20vh !important;
}

@keyframes slide-left {
  0% {
    width: 0%;
  }
  100% {
    width: 50%;
  }
}
@keyframes slide-right {
  0% {
    left: 0rem;
    width: 0%;
  }
  100% {
    left: 2rem;
    width: 75%;
  }
}
.slide-left {
  width: 50%;
  top: 1.6rem;
  right: 4.5rem;
  animation-name: slide-left;
  animation-duration: 0.5s;
  animation-iteration-count: 1;
}
.slide-right {
  width: 75%;
  bottom: 0rem;
  left: 2rem;

  animation-name: slide-right;

  animation-duration: 0.5s;
  animation-iteration-count: 1;
}

.plus-btn {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.52);
}
.plus-btn-sm {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.671);
}
</style>
