
interface IDateResult {
    $gte: Date, $lte: Date
}

export const getTimeOfDay = ():IDateResult => {
    
    const endDate = new Date() //Current time 
    const startDate = new Date(endDate.getTime() - 24 * 60 * 60 * 1000)//24 hourse be fore 
   
    return {$gte: startDate,$lte: endDate}
}

export const getTimeOfWeek = ():IDateResult => {
    const endDate = new Date()
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000)//1 weeks 
    return {$gte: startDate,$lte: endDate}
} 

export const getTimeOfMonth = (): IDateResult => {
    const endDate = new Date(); 
    const startDate = new Date(endDate);
    startDate.setMonth(endDate.getMonth() - 1); // 1 month ago
    return { $gte: startDate, $lte: endDate };
}

export const getTimeOfYear = (): IDateResult => {
    const endDate = new Date(); 
    const startDate = new Date(endDate);
    startDate.setFullYear(endDate.getFullYear() - 1); // 1 year ago
    return { $gte: startDate, $lte: endDate };
}