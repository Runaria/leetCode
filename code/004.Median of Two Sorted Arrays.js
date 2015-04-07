// https://leetcode.com/problems/median-of-two-sorted-arrays/


/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number}
 */
var findMedianSortedArrays = function(A, B) {
    var arr = A.concat(B).sort(function(a,b){return a-b}),
        mid_i = arr.length/2;
    if(mid_i%1){	// odd
    	return arr[Math.floor(mid_i)]
    }else{			// even
        return (arr[mid_i-1] + arr[mid_i])/2
    }
};