
interface PaginationOptions {
    page: number,
    limit: number
}
interface PaginationResult {
    currentPage: number;
    limit: number;
    skip: number;
    countPages: number;
    totalDocuments: number;
}

export default (totalDocuments: number, options: PaginationOptions) :PaginationResult => {
    const { page, limit } = options;
    const countPages = Math.ceil(totalDocuments / limit);
    const skip = (page - 1) * limit;

    return {
        currentPage: page,
        limit,
        skip,
        countPages,
        totalDocuments,
    };
}