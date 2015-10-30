/*
    https://leetcode.com/problems/generate-parentheses/

        Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

        For example, given n = 3, a solution set is:

        "((()))", "(()())", "(())()", "()(())", "()()()"

 */


/**
 * @param {number} n
 * @return {string[]}
 */

// from leetcode
var generateParenthesis = function(n) {
    var out = [];
    _generator(out, "", n, n);
    return out;
},
_generator = function(out, str, left, right){
    if(left){
        _generator(out, str+"(", left-1, right)
    }
    if(right > left){
        _generator(out, str+")", left, right-1)
    }
    if(!left && !right){
        out.push(str);
    }
}