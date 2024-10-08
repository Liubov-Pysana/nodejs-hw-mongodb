export const parseSortParams = (query) => {
  const { sortBy = 'name', sortOrder = 'asc' } = query;
  return {
    sortBy,
    sortOrder,
  };
};
