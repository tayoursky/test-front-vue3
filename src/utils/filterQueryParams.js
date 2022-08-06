export const filterQueryParams = (queryParams, paramsToExclude = []) => {
  const filteredParams = Object.assign(
    {},
    ...paramsToExclude.map((key) => {
      const value = queryParams[key];
      return {
        [key]: isNaN(Number(value)) ? value : Number(value),
      };
    })
  );

  for (const key in filteredParams) {
    if (typeof filteredParams[key] === "undefined") {
      delete filteredParams[key];
    }
  }

  return filteredParams;
};

export const cleanQuery = (currentParams, defaultParams) => {
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
