import { defineStore } from "pinia";
import { api } from "/src/utils/api.js";

export const useUsersStore = defineStore({
  id: "users",
  state: () => ({
    users: [],
    error: null,
    total: 0,
    loading: false,
  }),
  getters: {
    getUsers: (state) => state.users,
  },
  actions: {
    async fetchUsers(currentParams, params) {
      this.users = [];
      this.loading = true;
      try {
        await api
          .get("users", {
            params: { ...currentParams, ...params },
          })
          .then((response) => {
            this.users = response.data.data;
            this.total = response.data.total;
          })
          .then(() => {
            currentParams = Object.assign(currentParams, params);
          });
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async addPage(currentParams) {
      const page = Number(currentParams.page) + 1;

      await api
        .get("users", {
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
