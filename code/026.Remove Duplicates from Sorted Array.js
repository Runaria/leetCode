/*
    https://leetcode.com/problems/remove-duplicates-from-sorted-array/

    Given a sorted array, remove the duplicates in place such that each element appear only once and return the new length.

    Do not allocate extra space for another array, you must do this in place with constant memory.

    For example,
    Given input array nums = [1,1,2],

    Your function should return length = 2, with the first two elements of nums being 1 and 2 respectively. It doesn't matter what you leave beyond the new length. 
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
// version 1: 188 ms
var removeDuplicates = function(nums) {
    var idx = 0,
        val,
        len = nums.length,
        i = 0;
    while (i<len) {
        if (val !== nums[i]){
            val = nums[i];
            nums[idx] = val;
            idx++;
        }
        i++;
    }
    //nums.length = idx;    // no need, the test system will do it
    return idx;
};

// version 2: 192ms
removeDuplicates = function(nums) {
    var idx = 1,
        len = nums.length,
        i = 1;
    if(len === i){ return len}
    while (i<len) {
        if (nums[i-1] !== nums[i]){
            nums[idx] = nums[i];
            idx++;
        }
        i++;
    }
    //nums.length = idx;
    return idx;
};