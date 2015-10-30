/*
    https://leetcode.com/problems/trapping-rain-water/

    Trapping Rain Water

    Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it is able to trap after raining.

    For example,
    Given [0,1,0,2,1,0,1,3,2,1,2,1], return 6.
*/


/**
 * @param {number[]} height
 * @return {number}
 */
// passed: 200ms
var trap = function(height, added) {
    var count = {};
    var order = [];
    var len = height.length,
        i, n;
    added = added||0;
    if (len < 3) {
        return added;
    }
    for (i=0; i<len; i++) {
        n = height[i];
        if (n) {
            if (count[n]) {
                count[n][1] = i;
            } else {
                order.push(n);
                count[n] = [i];
            }
        }
    }
    var max, pos, sum, list;
    order = order.sort(function(a,b){
        return b-a;
    });
    var left, right;
    max = order[0];
    pos = count[max];
    left = pos[0];
    if (pos.length === 2) {
        right = pos[1];
    } else if (order[1]) {
        max = order[1];
        pos = count[max];
        right = pos[0];
        if (pos.length === 1) {
            if (left > right) {
                right = left;
                left = pos[0];
            }
        } else {
            if (left > pos[1]){
                right = left;
                left = pos[0];
            } else if (left < pos[0]) {
                right = pos[1];
            } else {
                left = pos[0];
                right = pos[1];
            }
        }
    } else {
        return added||0;
    }
    sum = max*(right-left-1);
    i = left;
    while (++i < right && sum > 0) {
        n = height[i];
        sum = sum - (max < n ? max : n);
    }
    sum = sum > 0 ? sum+added : added;
    list = height.slice(0, left).concat(height.slice(right));
    return list.length > 1 ? trap(list, sum) : sum;
};


var trap = function(height) {

};