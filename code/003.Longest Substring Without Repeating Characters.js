// https://leetcode.com/problems/longest-substring-without-repeating-characters/


/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    var max = 0,
    	len = s.length, start = 0,
    	i = 0, hash = {}, letter;
    while(i < len){
    	letter = s[i];
    	if(hash[letter] >= start){
    		max = Math.max(max, i-start);
    		// back to last letter
    		start = hash[letter]+1;
    	}
		hash[letter] = i;
		i++;
    }
    return Math.max(max, i-start);
};