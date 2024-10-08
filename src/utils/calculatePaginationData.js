export const calculatePaginationData = ({ totalItems, page, perPage }) => {
  const totalPages = Math.ceil(totalItems / perPage);
  return {
    totalItems,
    totalPages,
    page,
    perPage,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
  };
};
