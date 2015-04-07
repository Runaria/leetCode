// https://leetcode.com/problems/zigzag-conversion/


/**
 * @param {string} s
 * @param {number} nRows
 * @returns {string}
 */
var convert = function(s, nRows) {
	var str = s.split(""),
		max = str.length,
		out = [];
	if(max <= nRows){ return s}
	var i = 0,
		row = 0,
		dir = 1;
	while(i < max){
		if(out[row]){
			out[row] += str[i]
		}else{
			out[row] = str[i]
		}
		row += dir;
		if(row===0 || row===nRows-1){
			dir = -1*dir;
		}
		i++;
	}
	return out.join("");
};
