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
const { addPage, fetchItems, showAddPage, moreItemCount, currentParams } =
  usePageLoader(addPageFn, fetchItemsFn, total);

const onPaginationHandler = async (page) => {
  currentParams.page = page;
  await fetchItems(currentParams);
};
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
      <vue-awesome-paginate
        :total-items="total"
        :items-per-page="currentParams.per_page"
        :current-page="currentParams.page"
        :on-click="onPaginationHandler"
      />
    </div>
  </main>
</template>

<style>
.pagination-container {
  display: flex;
  column-gap: 10px;
  margin-top: 20px;
}
.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}
.paginate-buttons:hover {
  background-color: #d8d8d8;
}
.active-page {
  background-color: #3498db;
  border: 1px solid #3498db;
  color: white;
}
.active-page:hover {
  background-color: #2988c8;
}
</style>
