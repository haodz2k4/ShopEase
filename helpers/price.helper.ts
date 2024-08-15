//input: minPrice, maxPrice 
//output: objectPrice
export const rangePrice = (minPrice: number, maxPrice: number) : any => {
    return {$gte: minPrice, $lte: maxPrice}
}