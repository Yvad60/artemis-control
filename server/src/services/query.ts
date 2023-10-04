const DEFAULT_PAGE_LIMIT = 0;
const DEFAULT_PAGE_NUMBER = 1;

export const getPagination = (query: { page: string | undefined; limit: string | undefined }) => {
  const limit = query.limit ? Math.abs(Number(query.limit)) : DEFAULT_PAGE_LIMIT;
  const page = query.page ? Math.abs(Number(query.page)) : DEFAULT_PAGE_NUMBER;
  const skip = (page - 1) * limit;

  return { skip, limit };
};
