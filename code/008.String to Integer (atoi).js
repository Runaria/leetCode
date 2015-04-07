// https://leetcode.com/problems/string-to-integer-atoi/


/**
 * @param {string} str
 * @return {number}
 */
var atoi = (function() {
	var _reg = /^\s*([+-]?)(\d+(?:\.\d+)?)/,
		Edge_INT = [-2147483648, 2147483647];
	return function(str){
		var out, arr, isNegative;
		try{
			if(str){
				arr = str.match(_reg);
				if(arr.length===3){
					isNegative = arr[1] === "-";
					out = Number(arr[2]);
					if(isNaN(out)){
						return 0;
					}
					out = (isNegative ? -1 : 1) * out;
					if(isNegative && out < Edge_INT[0]){
						return Edge_INT[0]
					}
					if(out > Edge_INT[1]){
						return Edge_INT[1]
					}
					return out;
				}
			}
		}catch(e){}
		return 0;
	}
})();