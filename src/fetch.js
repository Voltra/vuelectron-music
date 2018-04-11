import fetchPonyfill from "fetch-ponyfill"

const polyfill = function(){
	if(!global.fetch){
		const {fetch, Request, Response, Headers} = fetchPonyfill();
		global.fetch = fetch;
	}
}

export {polyfill}