/*  034. Search for a Range

    https://leetcode.com/problems/search-for-a-range/

        Given a sorted array of integers, find the starting and ending position of a given target value.

        Your algorithm's runtime complexity must be in the order of O(log n).

        If the target is not found in the array, return [-1, -1].

        For example,
        Given [5, 7, 7, 8, 8, 10] and target value 8,
        return [3, 4].
*/

/**
 * 164ms
 * assume: nums is an asecending Array
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    var start = 0,
        end = nums.length - 1;
    var found, m;
    if (target >= nums[start] && target <= nums[end]) {
        if (start === end) {
            return target === nums[start] ? [0,0] : [-1, -1];
        }
        start = findEdge(nums, target, start, end, true);
        if (start > -1) {
            end = findEdge(nums, target, start, end, false);
            return [
                start,
                end === -1 ? start : end
            ];
        }
    }
    return [-1, -1];
};
function findEdge(nums, target, start, end, mode) {
    var mid, m;
    if (mode) {
        // find left edge
        while (start <= end) {
            m = Math.floor((start+end)/2);
            mid = nums[m];
            if (target < mid) {
                end = m-1;
            } else if (target > mid) {
                start = m+1;
            } else {
                // target === mid
                if (start < end) {
                    end = m;
                } else {
                    return start;
                }
            }
        }
    } else {
        // find right edge
        while (start <= end) {
            m = Math.ceil((start+end)/2);
            mid = nums[m];
            if (target < mid) {
                end = m-1;
            } else if (target > mid) {
                start = m+1;
            } else {
                // target === mid
                if (start < end) {
                    start = m;
                } else {
                    return end;
                }
            }
        }
    }
    return -1;
}
