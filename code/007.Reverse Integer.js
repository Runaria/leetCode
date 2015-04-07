// https://leetcode.com/problemset/algorithms/


/**
 * @param {number} x
 * @returns {number}
 */
var reverse = function(x) {
    var flag = x<0 ? -1 : 1,
        nums = (flag*x + "").split("").reverse().join(""),
    	n = flag * parseInt(nums,10);
    return n < -2147483648 || n > 2147483648 ? 0 : n;
};