export const sliceAddress = (str) => {
    const idx = str.split(" ", 3).join(' ').length;
    return str.slice(0, idx)
}