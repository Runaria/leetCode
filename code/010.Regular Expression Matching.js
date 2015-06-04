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
                    start: 0,
                    multi: false
                }) - 1;
        }
    }
    this.patterns = out;
}
compare = function(a, b) {
    return a && b && (a === "." || a === b);
}
Machine.prototype.test = function(s) {
    var flag = false,
        list = this.patterns,
        idx = 0,
        len = list.length,
        pattern,
        max = s ? s.length : 0,
        // current letter index
        current = 0,
        // back trace pattern
        backablePatterns = [],
        backable = -1,
        val, start;
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
            // if this pattern matched some word, it can be back trace
            if (start > current) {
                backable = backablePatterns.push(idx) - 1;
            };
            pattern.start = current; // save first matched letter index
            pattern.end = start;
            current = start; // set current letter index for next loop
            flag = true; // multi mode always return true because it can match 0 letter;
        } else {
            // single mode

            // reach end and cannot back trace
            if (backable < 0 && current === max) {
                return false
            }
            flag = compare(val, s[current]);
            if (flag) {
                current++;
            } else {
                // find previous backable pattern
                while (backable >= 0) {
                    // get previous backable pattern's index
                    idx = backablePatterns[backable];
                    pattern = list[idx];
                    if (pattern.start < pattern.end) {
                        // back trace
                        current = --pattern.end;
                        flag = true;
                        if(pattern.start === pattern.end){
                            // remove pattern
                            backablePatterns.length = backable;
                            backable--;
                        }
                        // match again
                        break;
                    }
                }
            }
            // while(start >= backable){
            //     flag = compare(val, s[start]);
            //     if(flag){
            //         break;
            //     } else {
            //         // back trace
            //         start--;
            //     }
            // }
            // if(flag){
            //     backable = current = start + 1;    // set current letter index for next loop
            // }
        }
        // check match
        if (!flag) {
            break;
        }
        idx++;
    }

    return flag && current === max;
}
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
    if(s || p){
        return (new Machine(p)).test(s);
    }else{
        return s === p
    }
};