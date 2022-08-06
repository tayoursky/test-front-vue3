<script setup>
import UserList from "/src/components/UserList.vue";
import { onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useUsersStore } from "/src/stores/users.js";
import { usePageLoader } from "/src/use/pageLoader.js";

const usersStore = useUsersStore();
const { users, error, loading, total } = storeToRefs(usersStore);
const perPageOptions = [2, 3, 5];

const addPageFn = async (currentParams) => {
  await usersStore.addPage(currentParams);
};
const fetchItemsFn = async (currentParams, params) => {
  await usersStore.fetchUsers(currentParams, params);
};

const { addPage, fetchItems, showAddPage, moreItemCount, currentParams } =
  usePageLoader(addPageFn, fetchItemsFn, total);

onMounted(async () => {
  try {
    await fetchItems();
  } catch (error) {
    console.log(error);
  }
});

const perPage = ref(currentParams.per_page);

watch(perPage, async () => {
  await fetchItems({ per_page: perPage.value });
});

const onPaginationHandler = async (page) => {
  await fetchItems({ page });
};
</script>

<template>
  <main>
    <div class="wrapper">
      <div v-if="loading">Loading...</div>
      <div v-else>
        <span>Показывать по:</span>
        <select v-model="perPage">
          <option v-for="item in perPageOptions" :key="item" :value="item">
            {{ item }}
          </option>
        </select>

        <user-list :items="users" />
        <button v-if="showAddPage" @click="addPage">
          Добавить ещё {{ moreItemCount }}
        </button>

        <vue-awesome-paginate
          :total-items="total"
          :items-per-page="currentParams.per_page"
          :current-page="currentParams.page"
          :on-click="onPaginationHandler"
        />
      </div>
    </div>
    <p v-if="error">{{ error.message }}</p>
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
