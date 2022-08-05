import { defineStore } from "pinia";
import axios from "axios";

export const useUsersStore = defineStore({
  id: "users",
  state: () => ({
    users: [],
    error: null,
    page: 0,
    per_page: 0,
    total: 0,
    loading: false,
  }),
  getters: {
    getUsers: (state) => state.users,
  },
  actions: {
    async fetchUsers(queryParams) {
      this.users = [];
      this.loading = true;
      try {
        await axios
          .get("https://reqres.in/api/users", { params: queryParams })
          .then((response) => {
            this.users = response.data.data;
          });
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async addPage(currentParams) {
      const page = Number(currentParams.page) + 1;

      await axios
        .get("https://reqres.in/api/users", {
          params: { ...currentParams, page },
        })
        .then((response) => {
          this.users.push(...response.data.data);
        })
        .then(() => {
          currentParams = Object.assign(currentParams, { page });
        });
    },
  },
});
