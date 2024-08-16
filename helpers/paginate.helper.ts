import { Model } from "mongoose"

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

export default async (totalDocuments: number, options: PaginationOptions) :Promise<PaginationResult> => {
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