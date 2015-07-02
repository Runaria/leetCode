/*
    https://leetcode.com/problems/next-permutation/

    Implement next permutation, which rearranges numbers into the lexicographically next greater permutation of numbers.

    If such arrangement is not possible, it must rearrange it as the lowest possible order (ie, sorted in ascending order).

    The replacement must be in-place, do not allocate extra memory.

    Here are some examples. Inputs are in the left-hand column and its corresponding outputs are in the right-hand column.
    1,2,3 → 1,3,2
    3,2,1 → 1,2,3
    1,1,5 → 1,5,1
*/

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function(nums) {
    var end = nums.length - 1,
        i = end,
        j = 0,
        a, b,
        chunk = null;
    if (end > 0) {
        while (--i >= 0) {
            if (nums[i] < nums[i+1]) {
                a = nums[i];
                j = end;
                while (j > i) {
                    b = nums[j];
                    if (b > a) {
                        break;
                    }
                    j--;
                }
                // exchange
                nums[i] = b;
                nums[j] = a;
                // split array
                chunk = end>i+1 && nums.splice(i+1, end-i+1);
                break;
            }
        }
        if (chunk !== null) {
            chunk && Array.prototype.push.apply(nums, chunk.reverse())
        } else {
            // orginal nums is in descending order
            nums.reverse();
        }
    }
};