/*
    https://leetcode.com/problems/divide-two-integers/

    Divide two integers without using multiplication, division and mod operator.

    If it is overflow, return MAX_INT.
*/

/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var MAX_INT = 2147483647;
var divide = function(dividend, divisor) {
    if (divisor === 0) { return MAX_INT }
    if (dividend === 0) {return  0}
    var num, mul, prev,
        isNeg = false, isOverflow = false,
        dend = dividend,
        dsor = divisor,
        remain,
        ret = 0;
    if (dsor < 0) {
        isNeg = true;
        dsor = -dsor;
    }
    if (dend < 0) {
        isNeg = !isNeg;
        dend = 0-dend;
    }
    if (dsor === 1) {
        return divisor > 0 ?
                    // divisor = 1
                    dividend : (
                    // divisor = -1
                    dividend > 0 ?
                        0-dividend : (
                            // handle: [-2147483648, -1] = 2147483647
                            dend > MAX_INT ? MAX_INT : dend
                        )
                    )
    }
    if (dend < dsor) { return 0}
    if (dend === dsor) { return isNeg ? -1 : 1}
    remain = dend;
    while (remain >= dsor && !isOverflow) {
        prev = num = dsor;
        mul = 1;
        while (remain >= num) {
            prev = num;
            num = dsor << mul;
            mul += 1;
            isOverflow = num < 0;
            if (isOverflow) {
                break;
            }
        }
        ret += 1<<(mul-2);
        remain = remain - prev;
    }
    if (isOverflow) {
        mul -= 2;
        num = prev;
        while ( mul >= 0) {
            if (remain >= num) {
                ret += 1<<mul;
                remain -= num;
            } else {
                mul -= 1;
                num = dsor << mul;
            }
        }
    }
    return isNeg ? 0-ret : ret;
};