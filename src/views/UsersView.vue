<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
// import { usePageLoader } from "/src/use/pageLoader.js";
import UserList from "/src/components/UserList.vue";

const items = ref([]);
const loading = ref(false);
const route = useRoute();
const router = useRouter();

const defaultParams = {
  page: 1,
  per_page: 2,
};
const queryParams = Object.assign(defaultParams, route.query);

onMounted(async () => {
  await getUsers(queryParams);
});

const getUsers = async (queryParams) => {
  loading.value = true;
  await axios
    .get("https://reqres.in/api/users", {
      params: { ...queryParams },
    })
    .then((response) => {
      if (items.value.length > 0) {
        // items.value = items.value.concat(response.data.data);
        items.value = Object.assign(
          items.value,
          items.value.concat(response.data.data)
        );
      } else {
        items.value = response.data.data;
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => (loading.value = false));
};

const addPage = async () => {
  const nextPageParams = Object.assign(queryParams, {
    page: queryParams.page + 1,
  });
  await getUsers(nextPageParams);
  await router.push({ query: nextPageParams });
};
</script>

<template>
  <main>
    <div class="wrapper">
      <div v-if="loading">Loading...</div>
      <user-list v-else :items="items" />
      <button @click="addPage">Добавить ещё</button>
    </div>
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
