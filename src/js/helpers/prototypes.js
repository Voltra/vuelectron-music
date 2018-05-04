export default function install(){
    Array.prototype.sortBy = function(sortFunction){
        if(typeof sortFunction != "function" && typeof sortFunction != "undefined")
            throw new TypeError("'sortFunction' must be a function");

        const copy = [...this];
        copy.sort(sortFunction);
        return copy;
    }

    String.prototype.followsPattern = function(regex){
        if(!(regex instanceof RegExp))
            throw new TypeError("Parameter must be a RegExp");

        return regex.test(this);
    }
}