/*
    https://leetcode.com/problems/search-in-rotated-sorted-array/

    Suppose a sorted array is rotated at some pivot unknown to you beforehand.

    (i.e., 0 1 2 4 5 6 7 might become 4 5 6 7 0 1 2).

    You are given a target value to search. If found in the array return its index, otherwise return -1.

    You may assume no duplicate exists in the array.
*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// version 1: 136ms
var search = function(nums, target) {
    var i = 0,
        len = nums.length;
    while (i<len) {
        if (nums[i] === target) {
            return i
        }
        i++;
    }
    return -1
};
var search = function(nums, target) {
    var len = nums.length,
        lp = 0,
        left,
        rp = len - 1,
        mp, mid,
        right,
        diff;
    if (len < 2) {
        return len && nums[0] === target ? 0 : -1
    }
    while (rp > lp) {
        left = nums[lp];
        if (target === left) {
            return lp
        }
        right = nums[rp]
        if (target === right) {
            return rp
        }
        diff = left - right;
        if (diff === 0) {
            lp++;
            rp--;
        } else {
            mp = Math.floor((lp+rp)/2);
            mid = nums[mp];
            if (target === mid) {
                return mp;
            }
            if ( diff > 0) {
                // array is at ascending order
                if (target > left) {
                    lp++;
                    rp = mp-1;
                } else {
                    lp = mp+1;
                    rp--;
                }
            } else {
                // diff < 0
                // array is at descending order
                if (target > right) {
                    lp = mp+1;
                    rp--;
                } else {
                    lp++;
                    rp = mp-1;
                }
            }
        }
    }
    return -1;
};

/*
test(search, [
    [[[1,2,3,4,5,6], 4], 3]
])
 */