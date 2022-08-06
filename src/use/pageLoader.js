import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { filterQueryParams, cleanQuery } from "/src/utils/filterQueryParams.js";

export function usePageLoader(
  addPageFn,
  fetchItemsFn,
  total,
  otherDefaultParams = {}
) {
  const defaultParams = Object.assign(
    { page: 1, per_page: 2 },
    otherDefaultParams
  );
  const route = useRoute();
  const router = useRouter();
  const showAddPage = ref(false);
  const moreItemCount = ref(null);

  const routeQueryParams = filterQueryParams(
    route.query,
    Object.keys(defaultParams)
  );
  let currentParams = reactive({ ...defaultParams, ...routeQueryParams });

  const initButton = () => {
    const remain = Math.max(
      total.value - currentParams.per_page * currentParams.page,
      0
    );
    moreItemCount.value =
      remain > currentParams.per_page ? currentParams.per_page : remain;
    showAddPage.value = moreItemCount.value > 0;
  };

  const fetchFn = async (fn, params) => {
    await fn(currentParams, params);
    initButton();
    const query = cleanQuery(currentParams, defaultParams);
    await router.push({ query });
  };

  const addPage = async () => {
    await fetchFn(addPageFn);
  };

  const fetchItems = async (params = {}) => {
    await fetchFn(fetchItemsFn, params);
  };

  return {
    addPage,
    fetchItems,
    showAddPage,
    moreItemCount,
    total,
    currentParams,
  };
}
