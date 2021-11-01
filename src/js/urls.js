const assets = uri => `/assets${uri}`;
const js = uri => assets(`/js${uri}`);
const json = uri => assets(`/json${uri}`);

export {assets, js, json}