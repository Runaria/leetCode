// https://leetcode.com/problems/longest-common-prefix/


/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs){
	var prefix = "",
		i = 1,
		len = strs.length,
		str,
		compare = function(pre, s){
			if(s.indexOf(pre)===0){
				return pre;
			}else{
				return compare(pre.slice(0, -1), s)
			}
		};
    if(strs && len){
    		prefix = strs[0];
    	while(i < len){
    		str = strs[i]
    		if(str && prefix){
    			prefix = compare(prefix, str);
    		}else{
    			return "";
    		}
    		i++;
    	}
    }
    return prefix;
};