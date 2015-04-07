// https://leetcode.com/problems/longest-palindromic-substring/


/**
 * @param {string} s
 * @returns {string}
 */
var longestPalindrome = function(s) {
	var str = "#" + s.split("").join("#") + "#",
		max = 1, id=0,
		left, right,
		i = 1, end = str.length - 1;
	while(i + max < end && i - max >= 0){
		left = i-max;
		right = i+max;
		if(str.slice(left, i) === str.slice(i+1, right+1).split("").reverse().join("")){
			while(left>0 && right < end && str[--left] === str[++right]){
				id = i;
				max++;
			}
		}
		i++;
	}
	return end === 2 ? s : str.slice(id-max, id+1+max).split("#").join("");
};