// https://leetcode.com/problems/container-with-most-water/


/**
 * @param {number[]} height
 * @returns {number}
 */
var maxArea = (function(height) {
    var getArea = function(x1, h1, x2, h2){
    	return (x2 - x1)*Math.min(h1, h2);
    }
    return function(height){
    	var max = 0,
    		area,
    		i = 0,
    		j = height.length - 1,
    		h1, h2;
    	while(i < j){
    		h1 = height[i];
    		h2 = height[j];
    		if(h1<h2){
    			area = (j-i)*h1;
    			while(i<j && height[i] <= h1){
    				i++
    			}
    		}else{
    			area = (j-i)*h2;
    			while(i<j && height[j] <= h2){
    				j--
    			}
    		}
    		if(area>max){
    			max = area;
    		}
    	}
    	return max;
    }
})();