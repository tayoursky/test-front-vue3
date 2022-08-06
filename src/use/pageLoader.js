import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export function usePageLoader(addPageFn, fetchItemsFn, total) {
  const defaultParams = { page: 1, per_page: 2 };
  const route = useRoute();
  const router = useRouter();
  const showAddPage = ref(false);
  const moreItemCount = ref(null);
  const currentParams = reactive({ ...route.query, ...defaultParams });

  const initButton = () => {
    const remain = Math.max(
      total.value - currentParams.per_page * currentParams.page,
      0
    );
    moreItemCount.value =
      remain > currentParams.per_page ? currentParams.per_page : remain;
    showAddPage.value = moreItemCount.value > 0;
  };

  const cleanQuery = (currentParams, defaultParams) => {
    const currentObj = Object.assign({}, currentParams);
    const defaultObj = Object.assign({}, defaultParams);
    for (const prop in currentObj) {
      const currentParam = Number(currentObj[prop]);
      const defaultParam = Number(defaultObj[prop]);
      if (currentParam === defaultParam) {
        delete currentObj[prop];
      }
    }
    return currentObj;
  };

  const fetchFn = async (fn) => {
    await fn(currentParams);
    initButton();
    const query = cleanQuery(currentParams, defaultParams);
    await router.push({ query });
  };

  const addPage = async () => {
    await fetchFn(addPageFn);
  };

  const fetchItems = async () => {
    await fetchFn(fetchItemsFn);
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
