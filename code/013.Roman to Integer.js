// https://leetcode.com/problems/roman-to-integer/


/**
 * @param {string} str [1, 3999]
 * @returns {number}
 */
var romanToInt = (function() {
	var ROMAN_VAL = {
		M: 1000,
		D: 500,
		C: 100,
		L: 50,
		X: 10,
		V: 5,
		I: 1
	};
    return function(str){
    	var sum = 0,
    		len = str.length,
    		c = 0, val, nextVal = 0;
    	while(c < len){
    		val = nextVal || (ROMAN_VAL[str[c]] || 0);
    		nextVal = ROMAN_VAL[str[c+1]]||0;
    		sum += (val < nextVal ? -1 : 1) * val;
    		c++;
    	}
    	return sum;
    }
})();