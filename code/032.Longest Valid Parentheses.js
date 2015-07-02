/*
    https://leetcode.com/problems/longest-valid-parentheses/

    Given a string containing just the characters '(' and ')', find the length of the longest valid (well-formed) parentheses substring.

    For "(()", the longest valid parentheses substring is "()", which has length = 2.

    Another example is ")()())", where the longest valid parentheses substring is "()()", which has length = 4.

*/

/**
 * @param {string} s
 * @return {number}
 */
// version 1: 296ms
var longestValidParentheses = function(s) {
    var idx = 0,
        end,
        begin = 0,
        opener = [],
        opend,
        max = 0;
    if (s) {
        // clear head and tail
        s = s.replace(/^[)]*|[(]*$/g, "");
        end = s.length;
        while (idx < end) {
            if (s.charAt(idx) === "(") {
                opend = opener.push(idx);
            } else {
                if (opend) {
                    opend--;
                    opener.length = opend;
                } else {
                    max = Math.max(max, idx - begin);
                    // begin at next pos
                    begin = idx + 1;
                }
            }
            idx++;
        }
        if (opend) {
            // not closed
            var len;
            while (end) {
                if (opend === 0) {
                    len = opener[0] - begin;
                    end = 0;
                } else {
                    idx = opener[--opend];
                    len = end - idx - 1;
                    end = idx;
                }
                max = len > max ? len : max;
            }
        } else if (begin < end) {
            max = Math.max(max, end - begin);
        }
    }
    return max;
}
// version 2: 272ms
var longestValidParentheses = function(s) {
    var founded = true,
        rpl = /\((-*)\)/g,
        sum = /-+/g,
        max = 0;
    while (founded) {
        founded = false;
        s = s.replace(/\((-*)\)/g, function(found, $1){
            founded = found;
            return "--" + $1;
        })
    }
    var matched = s.match(sum);
    if (matched) {
        var len = matched.length;
        while (--len >= 0) {
            max = Math.max(max, matched[len].length)
        }
    }
    return max;
}
// version 3: 168ms
var longestValidParentheses = function(s) {
    var axis = {},
        opener = [],
        opend = 0,
        closed,
        idx = 0,
        len = s.length,
        count = 0,
        max = 0;
    // scan string
    while (idx < len) {
        if (s[idx] === "(") {
            opend = opener.push(idx);
        } else if (opend){
            opend--;
            // mark this pair on axis
            axis[opener[opend]] = idx;
            // remove one
            opener.length = opend;
        }
        idx++;
    }
    idx = 0;
    // scan axis
    // PS: when idx === len, axis[len] === undefined, so it will run the last compare
    while (idx <= len) {
        // get this pair's end position
        closed = axis[idx];
        // if this pair exist
        if (closed) {
            // add up this pair's length
            count += closed - idx + 1;
            // jump to next word
            idx = closed+1;
        } else {
            // compare max length
            max = count > max ? count : max;
            // reset
            count = 0;
            // jump to next word
            idx++;
        }
    }
    return max;
}
// https://leetcode.com/discuss/37147/my-simple-8ms-c-code
// 172ms
var longestValidParentheses = function(s) {
    var stk = [-1],
        stkLast = 0,
        max = 0,
        len = s.length,
        i = 0,
        t;
    while (i<len) {
        t = stk[stkLast];
        if (t !== -1 && s[t] === "(" && s[i] === ")") {
            stkLast--;
            max = Math.max(max, i - stk[stkLast]);
            stk.length = stkLast + 1;
        } else {
            stkLast = stk.push(i) - 1;
        }
        i++;
    }
    return max;
}
// test speed: https://leetcode.com/discuss/32222/javascript-solution
// 164ms
var longestValidParentheses = function(s) {

    var ts = s.split('');
    var stack = [],
        max = 0;

    ts.forEach(function(t, i) {
        if (t == '(') {
            stack.push(i);
        } else {
            if (stack.length === 0 || ts[stack[stack.length - 1]] == ')') {
                stack.push(i);
            } else {
                stack.pop();
            }
        }
    });

    // add two ends
    stack.push(ts.length);
    stack.splice(0, 0, -1);

    for (var i = 0; i < stack.length - 1; i++) {
        var v = stack[i + 1] - stack[i] - 1;
        max = Math.max(max, v);
    }

    return max;
};
// version 4: from https://leetcode.com/discuss/24045/simple-java-solution
// 164ms
var longestValidParentheses = function(s) {
    var idx = 0,
        len = s.length,
        opend = 0,
        count = [],
        prev,
        max = 0;
    while (idx < len) {
        if (s[idx] === "(") {
            opend++;
        } else {
            if (opend) {
                count[idx] = 2 + (count[idx-1]||0);
                prev = idx - count[idx];
                if (prev >= 0) {
                    count[idx] += (count[prev]||0)
                }
                opend--;
            }
            if (count[idx] > max) {
                max = count[idx]
            }
        }
        idx++;
    }
    return max;
}

/*
test(
    // target function
    longestValidParentheses,
    // cases
    [
        ["(()", 2],
        ["()(()", 2],
        ["((()()(()((()", 4],
        ["(())()(()((", 6],
        ["))))())()()(()", 4]
    ])
*/
