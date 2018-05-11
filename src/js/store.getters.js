const Getters = [
    "COLUMNS",
    "MUSIC",
    "SASS",
    "COLORS_STORAGE",
    "CURRENT_MUSIC"
].map(getter => ({
    [getter]: getter
})).reduce((acc, elem)=>({...acc, ...elem}), {});

export {Getters}