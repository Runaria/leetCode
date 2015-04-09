// https://leetcode.com/problems/letter-combinations-of-a-phone-number/

/**
 * @param {string} digits
 * @returns {string[]}
 */
var letterCombinations = (function() {
    var LETTER = [
        [" "],              // 0
        null,               // 1
        ["a","b","c"],      // 2
        ["d","e","f"],      // 3
        ["g","h","i"],      // 4
        ["j","k","l"],      // 5
        ["m","n","o"],      // 6
        ["p","q","r","s"],  // 7
        ["t","u","v"],      // 8
        ["w","x","y","z"]   // 9
    ],
    getLetter = function(preStr, idx, max, nums, out){
        var lts = LETTER[nums[idx]],
            isEnd = idx === max,
            x = 0,
            len;
        if(lts){
            len = lts.length;
            while(x<len){
                if(isEnd){
                    out.push(preStr+lts[x]);
                }else{
                    getLetter(preStr+lts[x], idx+1, max, nums, out);
                }
                x++;
            }
        }else{
            // next number
            getLetter(preStr, idx+1, max, nums, out)
        }
    }
    return function(digits){
        var nums = digits.split(""),
            end = nums.length,
            out = [];
        if(end === 0){
            return [];
        }
        if(end === 1){
            return LETTER[nums[0]];
        }else{
            getLetter("", 0, end-1, nums, out);
        }
        return out;
    }
})();