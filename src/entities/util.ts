export function moveInArray<T> (array: Array<T>, from: number, to: number): void {
    const element = array.splice(from, 1)[0]
    array.splice(to, 0, element)
}