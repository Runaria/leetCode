/*  154. Find Minimum in Rotated Sorted Array II

    https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/

        Follow up for "Find Minimum in Rotated Sorted Array":
        What if duplicates are allowed?

        Would this affect the run-time complexity? How and why?

    Suppose a sorted array is rotated at some pivot unknown to you beforehand.

    (i.e., 0 1 2 4 5 6 7 might become 4 5 6 7 0 1 2).

    Find the minimum element.

    The array may contain duplicates.
*/

/**
 * 168ms
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
    var i = 0, j = nums.length - 1;
    if (j < 2) {
        return nums[1] < nums[0] ? nums[1] : nums[0];
    }
    var desc = nums[0] < nums[j];
    var m, min, crt;

    i = 1;
    min = nums[0];
    var left, right;
    while (i <= j) {
        left = nums[i];
        right = nums[j];
        if (min !== left || min !== right) {
            if (left < right) {
                desc = true;
                min = min < left ? min : left;
            } else {
                desc = false;
                min = min < right ? min : right;
            }
            break;
        }
        i++;
        j--;
    }
    if (desc) {
        // desc
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