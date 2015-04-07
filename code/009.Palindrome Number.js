// https://leetcode.com/problems/palindrome-number/


/**
 * @param {number} x
 * @return {number}
 */
var isPalindrome = function(x) {
	// if(x<0){return false}
	// if(x<10){return true}
    // var n = 0,
	// 	nx = x;
	// while(nx){
	// 	n = n*10 + nx%10;
	// 	nx = Math.floor(nx/10);
	// }
	// return x===n;

	if(x<0 || (x && x%10===0)){return false}
	if(x<10){return true}
	var n = 0, y;
	while (n<x){
		y = x%10;
		n = n*10 + y;
		if(n === x){break}
		x = (x-y)/10;
	}
	return x === n
};