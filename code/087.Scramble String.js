/*
    https://leetcode.com/problems/scramble-string/

        Given a string s1, we may represent it as a binary tree by partitioning it to two non-empty substrings recursively.

        Below is one possible representation of s1 = "great":

            great
           /    \
          gr    eat
         / \    /  \
        g   r  e   at
                   / \
                  a   t

        To scramble the string, we may choose any non-leaf node and swap its two children.

        For example, if we choose the node "gr" and swap its two children, it produces a scrambled string "rgeat".

            rgeat
           /    \
          rg    eat
         / \    /  \
        r   g  e   at
                   / \
                  a   t

        We say that "rgeat" is a scrambled string of "great".

        Similarly, if we continue to swap the children of nodes "eat" and "at", it produces a scrambled string "rgtae".

            rgtae
           /    \
          rg    tae
         / \    /  \
        r   g  ta  e
               / \
              t   a

        We say that "rgtae" is a scrambled string of "great".

        Given two strings s1 and s2 of the same length, determine if s2 is a scrambled string of s1.


 */
// version 1: failed
var isScramble = function(s1, s2) {
    return s1.split("").sort().join("") === s2.split("").sort().join("");
};


// version 2: failed
var isScramble = function(s1, s2) {
    function compare(str1, str2) {
        if (str1.length === 1) {
            return str1 === str2;
        }
        return str1.split("").sort().join("") === str2.split("").sort().join("");
    }
    var i = 1,
        end = s1.length - 1;
    if (i >= end) {
        return compare(s1, s2);
    }
    for (; i<=end; i++) {
        if (
            compare(s1.slice(0, i), s2.slice(0, i)) &&
                    compare(s1.slice(i), s2.slice(i))
            ) {
            return true;
        }
    }
    return false;
};


/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var isScramble = function(s1, s2) {
    var len = s1.length;
    switch (len) {
        case 0:
        case 1:
            return s1 === s2;
        case 2:
            return s1 === s2 || s1.split("").reverse().join("") === s2;
        case 3:
            return s1.split("").sort().join("") === s2.split("").sort().join("");
        default:
            break;
    }
    var i = 1,
        left, right;
    // while (i < len) {
    //     left = s1.slice(0,i);
    //     right = s1.slice(i);
    //     if (
    //         ( isScramble(left, s2.slice(0,i)) && isScramble(right, s2.slice(i)) ) ||
    //         ( isScramble(left, s2.slice(-i)) && isScramble(right, s2.slice(0, -i)) )
    //     ) {
    //         return true
    //     }
    //     i++;
    // }
    i = 2;
    left = s1.slice(0, 3);
    while (i < len) {
        left += s1[i];
    }
    return false;
};

// wrong
var isScramble = function(s1, s2) {
    if (!s1 || !s2) {
        return false;
    }
    var len = s1.length;
    if (!len || len !== s2.length) {
        return false;
    }
    if (len === 1){
        return s1 === s2;
    }
    if (len === 2) {
        return s1 === s2 || (s1[0] === s2[1] && s1[1] === s2[0]);
    }
    var i, c1, c2;
    var diff = {};
    var count = 0;
    var skip = 0;
    var v;
    for (i=0; i<len; i++) {
        c1 = s1[i];
        c2 = s2[i];
        if (c1 !== c2) {
            if (typeof diff[c1] === 'undefined') {
                diff[c1] = 1;
                count++;
            } else {
                v = ++diff[c1];
                if (v===0) {
                    count--;
                }
            }
            if (typeof diff[c2] === 'undefined') {
                diff[c2] = -1;
                count++;
            } else {
                v = --diff[c2];
                if (v===0) {
                    count--;
                }
            }
        } else {
            skip++;
        }
        if (i > skip && count === 0) {
            break;
        }
    }
    if (i<len){
        i++;
        if (i >= len) {
            return false;
        }
        return isScramble(s1.slice(0, i), s2.slice(0, i)) &&
                    isScramble(s1.slice(i), s2.slice(i));
    }
    return count === 0;
};


var isScramble = function(s1, s2, len, isReverse) {
    if (!s1 || !s2) {
        return false;
    }
    if (!len) {
        len = s1.length;
    }
    if (s1 === s2) {
        return true;
    }
    if (len === 1){
        return false;
    }
    if (len === 2) {
        return s1[0] === s2[1] && s1[1] === s2[0];
    }
    var diff = {};
    var i;
    var need = 0;
    var same = -1;
    var c1, c2, re, found = -1;
    for (i=0; i<len; i++) {
        c1 = s1[i];
        c2 = s2[i];
        if (c1 !== c2) {
            re = diff[c1]||0;
            diff[c1] = re + 1;
            need = re<0 ? need-1 : need+1;
            re = diff[c2]||0;
            diff[c2] = re - 1;
            need = re>0 ? need-1 : need+1;
        } else if (i === 0) {
            return isScramble(s1.slice(1), s2.slice(1), len-1);
        }
        if (need === 0 && i) {
            found = i+1;
            // 尝试在此分段递归
            if (found < len &&
                isScramble(s1.slice(0, found), s2.slice(0, found).split("").reverse().join(""), found) &&
                ( isScramble(s1.slice(found), s2.slice(found), len-found) ||
                    isScramble(s1.slice(found), s2.slice(found).split("").reverse().join(""), len-found) )
            ) {
                return true;
            }
        }
    }
    // 字符数不一致
    if (need) {
        return false;
    }
    // 没有找到可用分段点
    if (isReverse){
        return false;
    } else {
        // 尝试反向匹配
        return isScramble(s1, s2.split("").reverse().join(""), len, true);
    }
};

// "abb"
// "bab"
// true

// "cbcccccbbabcbac"
// "bbccaccbcbcabcc"
// true

