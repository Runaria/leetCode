/*
    https://leetcode.com/problems/valid-parentheses/


    Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

    The brackets must close in the correct order, "()" and "()[]{}" are all valid but "(]" and "([)]" are not.

 */



var PAIRS = {
    "(":")",
    "[":"]",
    "{":"}"
};
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    var waiting = [], w,
        i=0, len = s.length,
        currentletter, closeLetter;
    while(i < len){
        currentletter = s[i];
        closeLetter = PAIRS[currentletter];
        if(closeLetter){
            // new open
            w = waiting.push(closeLetter) - 1;
        }else{
            // close this pair
            if(currentletter === waiting[w]){
                w--;
                waiting.length -= 1;
            }else{
                // crossing parentheses
                return false;
            }
        }
        i++;
    }
    return waiting.length === 0;
};