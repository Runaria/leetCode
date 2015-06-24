/*
    https://leetcode.com/problems/substring-with-concatenation-of-all-words/

     You are given a string, s, and a list of words, words, that are all of the same length. Find all starting indices of substring(s) in s that is a concatenation of each word in words exactly once and without any intervening characters.

    For example, given:
    s: "barfoothefoobarman"
    words: ["foo", "bar"]

    You should return the indices: [0,9].
    (order does not matter).
*/

/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
// 248ms
var findSubstring = function(s, words) {
    var wLen = words.length,
        map = {},
        out = [],
        w = 0,
        word, item,
        sl = words[0].length;
    if (!s) {return []}
    if (wLen === 1) {
        var reg = new RegExp(words[0], "g");
        while ( reg.exec(s) ) {
            out.push(reg.lastIndex - sl);
        }
        return out;
    }
    while (w < wLen) {
        word = words[w];
        item = map[word];
        if (item) {
            item.remain = item.max = item.max+1;
        } else {
            map[word] = {
                max: 1,
                cur: 0,
                remain: 1
            }
        }
        w++;
    }
    var start = 0,
        cur = 0,
        now = 1,
        matched = 0,
        max = s.length - sl*wLen;
    while (start <= max) {
        now = 1;
        matched = 0;
        cur = start;
        while (now <= wLen) {
            word = s.slice(cur, cur+sl);
            item = map[word];
            if (item) {
                if (item.cur !== start) {
                    // reset
                    item.cur = start;
                    item.remain = map[word].max;
                }
                if (item.remain < 1) {
                    // word appeared too many times
                    break;
                } else {
                    matched++;
                    item.remain--;
                }
            } else {
                // word not in words
                break;
            }
            cur += sl;
            now++;
        }
        if (matched === wLen) {
            out.push(start);
        }
        start++;
    }
    return out;
};