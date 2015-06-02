/*
    https://leetcode.com/problems/regular-expression-matching/

    Implement regular expression matching with support for '.' and '*'.

        '.' Matches any single character.
        '*' Matches zero or more of the preceding element.

        The matching should cover the entire input string (not partial).

        The function prototype should be:
        bool isMatch(const char *s, const char *p)

        Some examples:
        isMatch("aa","a") → false
        isMatch("aa","aa") → true
        isMatch("aaa","aa") → false
        isMatch("aa", "a*") → true
        isMatch("aa", ".*") → true
        isMatch("ab", ".*") → true
        isMatch("aab", "c*a*b") → true

 */



/*
    version 1
    failed:
        can not match ["ab",".*.."]
        this version cannot back trace more than 1 times;
 */
var Machine = function(p) {
    var out = [],
        i = -1,
        j = 0,
        pl = p.length,
        pattern;
    while (++i < pl) {
        pattern = p[i];
        switch (pattern) {
            case "*":
                out[j].multi = true;
                break;
            default:
                j = out.push({
                    value: pattern,
                    multi: false
                }) - 1;
        }
    }
    this.patterns = out;
}
compare = function(a, b){
    return a==="." || a===b;
}
Machine.prototype.test = function(s) {
    var flag = false,
        list = this.patterns,
        idx = 0,
        len = list.length,
        pattern,
        max = s && s.length,
        current = 0,
        backable = 0,
        val, start;
    if (max) {
        while (idx < len) {
            pattern = list[idx];
            val = pattern.value;
            if (pattern.multi) {
                // multi mode
                start = current;
                while (start < max) {
                    flag = compare(val, s[start]);
                    if (flag) {
                        // matched
                        start++;
                    } else {
                        // not match
                        break;
                    }
                }
                //backable = current;
                current = start;    // set current letter index for next loop
                flag = true;    // multi mode always return true because it can match 0 letter;
            } else {
                // single mode
                start = current;
                // reach end and cannot back trace
                if(start === backable && current === max){
                    return false
                }
                while(start >= backable){
                    flag = compare(val, s[start]);
                    if(flag){
                        break;
                    } else {
                        // back trace
                        start--;
                    }
                }
                if(flag){
                    backable = current = start + 1;    // set current letter index for next loop
                }
            }
            // check match
            if (!flag) {
                break;
            }
            idx++;
        }
    }
    return flag && current === max;
}
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
    return (new Machine(p)).test(s);
};