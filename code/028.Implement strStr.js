/*
    https://leetcode.com/problems/implement-strstr/

    Implement strStr()

    Returns the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.

    Update (2014-11-02):
    The signature of the function had been updated to return the index instead of the pointer. If you still see your function signature returns a char * or String, please click the reload button to reset your code definition.
*/


/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
// version 1: 140ms
var strStr = function(haystack, needle) {
    return haystack.indexOf(needle)
};

// version 2: 128ms
var strStr = function(haystack, needle) {
    var i = 0,
        iMax = haystack.length,
        j = 0,
        jMax = needle.length;
    if(jMax === 0){
        return 0
    }
    while (i < iMax) {
        if (haystack[i] === needle[j]){
            j++;
            if (j === jMax) {
                return i + 1 - j;
            }
        } else {
            i = i - j;
            j = 0;
        }
        i++;
    }
    return -1;
};