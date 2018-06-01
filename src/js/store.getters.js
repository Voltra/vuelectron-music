const Getters = [
    "COLUMNS",
    "MUSIC",
    "SASS",
    "COLORS_STORAGE",
    "CURRENT_MUSIC",
    "CURRENT_PLAYLIST",
    "IS_LOADED",
].map(getter => ({
    [getter]: getter
})).reduce((acc, elem)=>({...acc, ...elem}), {});

export {Getters}