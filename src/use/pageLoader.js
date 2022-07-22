// import { ref, reactive } from "vue";
// import { useRoute, useRouter } from "vue-router";
// import { cleanQueryParams, filterQueryParams } from "src/utils/Helper/cleaner";
// import { useRoute } from "vue-router/dist/vue-router";

export function usePageLoader() {
  // const defaultParams = {
  //   page: 1,
  //   per_page: 2,
  // };
  // const route = useRoute();

  // const queryParams = Object.assign(route.query, defaultParams);

  return {
    // currentParams,
  };
}

// export function usePageLoader({
//   loadItems,
//   afterLoadItems,
//   items,
//   totalItems,
//   defaultParams = {},
// }) {
//   console.log("START USE_PAGE_LOADER");
//   const route = useRoute();
//   const router = useRouter();
//
//   defaultParams = {
//     page: 1,
//     perPage: 12,
//     ...defaultParams,
//   };
//
//   const routeQueryParams = filterQueryParams(
//     route.query,
//     Object.keys(defaultParams)
//   );
//   let currentParams = reactive({ ...defaultParams, ...routeQueryParams });
//
//   const moreItemCount = ref(null);
//
//   const showPaginationSpinner = ref(false);
//   const showPaginationButton = ref(false);
//
//   const showItems = ref(false);
//   const showInnerLoader = ref(false);
//
//   const initPaginationButton = () => {
//     const remain = Math.max(
//       totalItems.value - currentParams.perPage * currentParams.page,
//       0
//     );
//     moreItemCount.value =
//       remain > currentParams.perPage ? currentParams.perPage : remain;
//     showPaginationButton.value = moreItemCount.value > 0;
//   };
//
//   const fetchQuery = async (params) => {
//     try {
//       console.log("fetchQuery START");
//       let query = Object.assign({}, route.query);
//
//       for (const param in params) {
//         delete query[param];
//       }
//
//       query = cleanQueryParams(Object.assign(params, query), defaultParams);
//       console.log("fetchQuery FINISH");
//
//       console.log("loadItems START");
//
//       await loadItems({
//         resourceName: route.meta.resourceName,
//         slug: route.params.slug,
//         query,
//       });
//       console.log("loadItems FINISH");
//
//       return query;
//     } catch (error) {
//       throw new Error(error);
//     }
//   };
//
//   const resetPage = (params) => {
//     return { page: 1, ...params };
//   };
//
//   const pushQuery = async (query, hash) => {
//     await router.push({ query, hash });
//   };
//
//   /**
//    * @param params - @example { page: 1, sort: 'price' }
//    * @param policy - 'replace' | 'append'
//    * @param hash - '#hashname'
//    * @returns {Promise<void>}
//    */
//   const load = async ({ params, policy, hash = "" }) => {
//     try {
//       console.log("LOAD START");
//       const query = await fetchQuery(params);
//
//       for (const param in params) {
//         currentParams[param] = params[param];
//       }
//
//       if (policy === "replace") {
//         items.value = [];
//       }
//       console.log("LOAD FINISH");
//
//       await pushQuery(query, hash);
//     } catch (error) {
//       throw new Error(error);
//     } finally {
//       console.log("LOAD finally START");
//       afterLoadItems();
//       initPaginationButton();
//       showItems.value = true;
//       console.log("LOAD finally FINISH");
//     }
//   };
//
//   const addPage = async (page) => {
//     const params = { page };
//     showPaginationSpinner.value = true;
//
//     await load({ params, policy: "append" }).finally(() => {
//       showPaginationSpinner.value = false;
//     });
//   };
//
//   const changePage = async (page) => {
//     const params = { page };
//     showInnerLoader.value = true;
//
//     await load({ params, policy: "replace", hash: "#top" }).finally(() => {
//       showInnerLoader.value = false;
//     });
//   };
//
//   const setParamsAndResetPage = async (params) => {
//     showInnerLoader.value = true;
//     params = resetPage(params);
//
//     await load({ params, policy: "replace" }).finally(() => {
//       showInnerLoader.value = false;
//     });
//   };
//
//   afterLoadItems();
//
//   if (items.value.length === 0) {
//     console.log("items === 0 LOAD START");
//     // const params = { page: 1 }
//     load({ params: route.query, policy: "replace" });
//   }
//
//   if (items.value.length > 0) {
//     showItems.value = true;
//     initPaginationButton();
//   }
//
//   return {
//     addPage,
//     changePage,
//     setParamsAndResetPage,
//
//     moreItemCount,
//
//     showItems,
//     showPaginationSpinner,
//     showPaginationButton,
//     showInnerLoader,
//     currentParams,
//     defaultParams,
//   };
// }
