// https://leetcode.com/problems/two-sum/

/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]} two integers in an array, ie: [index1, index2]
 */
var twoSum = function(numbers, target){
	var hash = {},
		x = -1, nX, y,
		max = numbers.length;
	while(++x < max){
		nX = numbers[x];
		y = hash[target-nX];
		if(y!==undefined){
			return [y+1, x+1]
		}else{
			hash[nX] = x;
		}
	}
}
