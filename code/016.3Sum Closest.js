// https://leetcode.com/problems/3sum-closest/

/**
 * @param {number[]} num
 * @param {number} target
 * @returns {number}
 */
var threeSumClosest = function(num, target) {
    var len = num && num.length,
        sum, min = Infinity, out, gap,
        x, y, z;
    num.sort(function(a,b){return a-b});
    if(len > 2){
        if(num[0] === num[len-1]){
            return num[0]*3;
        }
        for(x = 0; x < len - 2; x++){
            y = x+1;
            z = len-1;
            while(z>y){
                if(z<len-1 && num[z] === num[z+1]){
                    z--;
                }else if(y>x+1 && num[y] === num[y-1]){
                    y++;
                }else{
                    sum = num[x] + num[y] + num[z];
                    if(sum > target){
                        gap = sum-target;
                        z--;
                    }else if(sum < target){
                        gap = target - sum;
                        y++;
                    }else{
                        return sum;
                    }
                    if(gap < min){
                        out = sum;
                        min = gap;
                    }
                }
            }
        }
    }
    return out;
};