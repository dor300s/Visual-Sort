import { timeout } from "./timeoutService";


export const quickSort = async (arr: number[], start: number, end: number, cb: Function, idxCb: Function, time: number, stopCb: Function) => {

    let running = true;
    stopCb((prev: boolean) => {
        running = prev;
        return prev;
    })
    if (!running) return;

    // await timeout(time);

    const len = end - start;
    if (len < 1) return;

    const pv = arr[end];
    let pvIdx = start;

    for (let i = start; i < end; i++) {
        if (arr[i] < pv) {
            [arr[i], arr[pvIdx]] = [arr[pvIdx], arr[i]];
            pvIdx++;
        }
        cb([...arr]);
        const indexArray = [...Array(Math.abs(i - pvIdx))].map((num, idx) => pvIdx + idx)
        idxCb(indexArray);
        await timeout(time);

        stopCb((prev: boolean) => {
            running = prev;
            return prev;
        })
        if (!running) return;

    }

    [arr[end], arr[pvIdx]] = [arr[pvIdx], arr[end]];

    cb([...arr]);

    Promise.all([
        quickSort(arr, start, pvIdx - 1, cb, idxCb, time, stopCb),
        quickSort(arr, pvIdx + 1, end, cb, idxCb, time, stopCb)
    ])
}




// export const quickSort = (arr: number[]): number[] => {
//     if (arr.length < 2) return arr;
//     const pv = arr.splice(0, 1)[0];
//     const lowers: number[] = [];
//     const highers: number[] = [];
//     arr.forEach((num: number) => num < pv ? lowers.push(num) : highers.push(num));
//     return [...quickSort(lowers), pv, ...quickSort(highers)];
// }

