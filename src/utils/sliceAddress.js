export const sliceDetailAddress = (str) => {
    const idx = str.split(" ", 3).join(' ').length;
    return str.slice(0, idx)
}

export const sliceAddress = str => str.split(" ", 1).join('');

export const sliceTownName = (str) => str.split(" ", 3)[2].slice(0, -1)