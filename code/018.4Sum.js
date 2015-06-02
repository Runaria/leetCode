/*
*   https://leetcode.com/problems/4sum/
*
*   Given an array S of n integers, are there elements a, b, c, and d in S such that a + b + c + d = target? Find all unique quadruplets in the array which gives the sum of target.
*
*   Note:
*
*       Elements in a quadruplet (a,b,c,d) must be in non-descending order. (ie, a ≤ b ≤ c ≤ d)
*       The solution set must not contain duplicate quadruplets.
*
*       For example, given array S = {1 0 -1 0 -2 2}, and target = 0.
*
*       A solution set is:
*       (-1,  0, 0, 1)
*       (-2, -1, 1, 2)
*       (-2,  0, 0, 2)
*
*/


/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
    if(!nums || nums.length < 4){
        return [];
    }
    nums.sort(function(a, b){
        return a-b;
    });
    var out = [],
        map = {},
        current, left, right, extra,
        needed, sum, arr, _id,
        n1, n2, n3, n4;
    extra = nums.length;
    while(--extra >= 0){
        current = 0;
        n4 = nums[extra];
        while(current < extra - 2){
            n1 = nums[current];
            left = current + 1;
            right = extra - 1;
            needed = target - n1 - n4;
            while(left < right){
                n2 = nums[left];
                n3 = nums[right];
                if(right < extra - 1 && n3 === nums[right+1]){
                    right--;
                }else if(left > current+1 && n2 === nums[left-1]){
                    left++;
                }else{
                    sum = n2 + n3;
                    if(sum > needed){
                        right--;
                    }else if(sum < needed){
                        left++;
                    }else{
                        arr = [n1, n2, n3, n4];
                        _id = arr.join(",");
                        if(!map[_id]){
                            out.push(arr);
                            map[_id] = 1;
                        }
                        right--;
                        left++;
                    }
                }
            }
            current++;
        }
    }
    return out;
}