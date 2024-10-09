import { SORT_ORDER } from '../constants/index.js';
export const parseSortParams = (query) => {
  const { sortBy = 'name', sortOrder = 'asc' } = query;

  if (!SORT_ORDER.includes(sortOrder)) {
    throw new Error(`Invalid sort order: ${sortOrder}`);
  }

  return {
    sortBy,
    sortOrder,
  };
};
