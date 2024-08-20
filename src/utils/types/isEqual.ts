// 比较两个数组
export const isEqual = (a: unknown[], b: unknown[]): boolean => JSON.stringify(a) === JSON.stringify(b)
