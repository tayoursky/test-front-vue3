<script setup>
import UserList from "/src/components/UserList.vue";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useUsersStore } from "/src/stores/users.js";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const defaultParams = {
  page: 1,
  per_page: 2,
};

const usersStore = useUsersStore();
const { users, error, loading } = storeToRefs(usersStore);
const currentParams = Object.assign(defaultParams, route.query);

onMounted(async () => {
  await usersStore.fetchUsers(currentParams);
});
// const getUsers = async (queryParams) => {
//   loading.value = true;
//   await axios
//     .get("https://reqres.in/api/users", {
//       params: { ...queryParams },
//     })
//     .then((response) => {
//       if (items.value.length > 0) {
//         // items.value = items.value.concat(response.data.data);
//         items.value = Object.assign(
//           items.value,
//           items.value.concat(response.data.data)
//         );
//       } else {
//         items.value = response.data.data;
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//     })
//     .finally(() => (loading.value = false));
// };

const addPage = async () => {
  await usersStore.addPage(currentParams);
  await router.push({ query: currentParams });
};
</script>

<template>
  <main>
    <div class="wrapper">
      <div v-if="loading">Loading...</div>
      <user-list v-else :items="users" />
      <button @click="addPage">Добавить ещё</button>
    </div>
    <p v-if="error">{{ error.message }}</p>
    <div>
      <!--      <VueAwesomePaginate-->
      <!--        :total-items="12"-->
      <!--        :items-per-page="2"-->
      <!--        :max-pages-shown="2"-->
      <!--        :current-page="queryParams.page"-->
      <!--        :on-click="addPage"-->
      <!--      />-->
    </div>
  </main>
</template>
