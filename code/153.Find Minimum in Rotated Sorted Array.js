/*
    https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/

        Suppose a sorted array is rotated at some pivot unknown to you beforehand.

        (i.e., 0 1 2 4 5 6 7 might become 4 5 6 7 0 1 2).

        Find the minimum element.

        You may assume no duplicate exists in the array.

        Subscribe to see which companies asked this question
*/

/**
 * 176 ms
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
    var len = nums && nums.length;
    if (!len) {
        return;
    }
    var isSmaller = nums[1] < nums[0];
    if (len < 3) {
        return isSmaller ? nums[1] : nums[0];
    }
    var idx = 1,
        crt = nums[idx],
        item;
    while (++idx < len) {
        item = nums[idx];
        if (item < crt !== isSmaller) {
            return isSmaller ? crt : item;
        }
        crt = item;
    }
    return isSmaller ? item : nums[0];
};

/**
 * 152ms
 * support desc and asc（no duplicates)
 * @param  {[type]} nums [description]
 * @return {[type]}      [description]
 */
var findMin = function(nums) {
    var i = 0, j = nums.length - 1;
    if (j < 2) {
        return nums[1] < nums[0] ? nums[1] : nums[0];
    }
    var desc = nums[0] < nums[j];
    var m, min, crt;
    if (desc) {
        // desc
        min = nums[i];
        while (j-i>1) {
            m = Math.floor((i+j)/2);
            crt = nums[m];
            if (crt > min) {
                j = m;
            } else {
                i = m;
                min = crt;
            }
        }
    } else {
        // asc
        min = nums[j];
        while (j-i>1) {
            m = Math.floor((i+j)/2);
            crt = nums[m];
            if (crt > min) {
                i = m;
            } else {
                j = m;
                min = crt;
            }
        }
    }
    return min;
}