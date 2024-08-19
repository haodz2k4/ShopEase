
export const rangePrice = (minPrice: number, maxPrice: number) : Record<string, number> => {
    return {$gte: minPrice, $lte: maxPrice}
}