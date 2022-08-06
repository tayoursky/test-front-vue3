<script setup>
import UserList from "/src/components/UserList.vue";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useUsersStore } from "/src/stores/users.js";
import { usePageLoader } from "/src/use/pageLoader.js";

const usersStore = useUsersStore();
const { users, error, loading, total } = storeToRefs(usersStore);

const addPageFn = async (currentParams) => {
  await usersStore.addPage(currentParams);
};
const fetchItemsFn = async (currentParams) => {
  await usersStore.fetchUsers(currentParams);
};

onMounted(async () => {
  try {
    await fetchItems();
  } catch (error) {
    console.log(error);
  }
});
const { addPage, fetchItems, showAddPage, moreItemCount } = usePageLoader(
  addPageFn,
  fetchItemsFn,
  total
);
</script>

<template>
  <main>
    <div class="wrapper">
      <div v-if="loading">Loading...</div>
      <user-list v-else :items="users" />
      <button v-if="showAddPage" @click="addPage">
        Добавить ещё {{ moreItemCount }}
      </button>
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
