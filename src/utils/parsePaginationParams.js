export const parsePaginationParams = (query) => {
  const { page = 1, perPage = 10 } = query;
  return {
    page: Number(page),
    perPage: Number(perPage),
  };
};
