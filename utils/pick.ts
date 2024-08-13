export const pick = <T extends Object, K extends keyof T>(object: T, keys: K[]): Partial<T> => {
    return keys.reduce((obj, key) => {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            obj[key] = object[key];
        }
        return obj;
    }, {} as Partial<T>);
};
