/*
    https://leetcode.com/problems/remove-element/

    Given an array and a value, remove all instances of that value in place and return the new length.

    The order of elements can be changed. It doesn't matter what you leave beyond the new length.
*/

/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    var len = nums.length,
        saved = 0,
        idx = 0,
        _isNaN = isNaN(val),
        value;
    while (idx<len) {
        value = nums[idx];
        if (_isNaN ? !isNaN(value) : value !== val) {
            nums[saved] = value;
            saved++;
        }
        idx++;
    }
    return saved;
};