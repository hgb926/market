export const sliceDetailAddress = (str) => {
     console.log(str.split(' ', 3))
    const idx = str.split(" ", 3).join(' ').length;
    return str.slice(0, idx)
}

export const sliceAddress = str => str.split(" ", 1).join('');