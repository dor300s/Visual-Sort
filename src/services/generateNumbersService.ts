export const generateNumbers = (size: number): number[] => [...Array(size)].map(() => Math.floor(Math.random() * 500));