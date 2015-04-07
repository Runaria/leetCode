// https://leetcode.com/problems/integer-to-roman/


/**
 * @param {number} num [1, 3999]
 * @returns {string}
 */
var intToRoman = (function() {
	var ROMAN_CHAR = [
			"I", // 1
			"V", // 5
			"X", // 10
			"L", // 50
			"C", // 100
			"D", // 500
			"M"  // 1000
		],
		getRights = function(lv){
			var _begin = lv*2;
			return ROMAN_CHAR.slice(_begin, _begin+3);
			// switch(lv){
			// 	case 0:
			// 		return roman.slice(0,3);
			// 		break;
			// 	case 1:
			// 		return roman.slice(2,5);
			// 		break;
			// 	case 2:
			// 		return roman.slice(4,7);
			// 		break;
			// }
		},
		transferNum = function(n, rChars){
			if(n===0){ 					// 0
				return "";
			}else if(n<4){ 				// [1, 2, 3]
				return repeat(rChars[0], n);
			}else if(n===4){ 			// 4
				return rChars[0] + rChars[1];
			}else if(n===5){ 			// 5
				return rChars[1];
			}else if(n===9){ 			// 9
				return rChars[0] + rChars[2];
			}else if(n>5){ 				// [6, 7, 8]
				return rChars[1] + transferNum(n-5, rChars);
			}
		},
		repeat = function(str, nums){
			var nums = parseInt(nums, 10);
			if(str && nums>0){
				return new Array(nums+1).join(str);
			}
			return "";
		};
    return function(num){
    	var ns = (""+num).split("").reverse(),
    		maxR = ns.length,
    		right = 0,
    		out = "";
    	if(ns && maxR){
    		while(right<maxR){
    			out = transferNum(parseInt(ns[right]), getRights(right)) + out;
    			right++;
    		}
    	}
    	return out;
    };
})();