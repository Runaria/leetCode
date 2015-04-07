// https://leetcode.com/problems/3sum/


/**
 * @param {number[]} num
 * @returns {number[][]} an array of number arrays with length = 3
 */
var threeSum = function (num) {
	var out = [],
		tmp, map = {}, str,
		len = num ? num.length : 0,
		x, y, z,
		a, b, c;
    if(len < 3){
    	return out;
    }
    for(x=0; x<len-2; x++){
    	a = num[x];
    	for(y=x+1;y<len-1;y++){
    		b = num[y];
    		for(z=y+1;z<len;z++){
    			c = num[z];
    			if(a+b+c === 0){
    				tmp = [a, b, c].sort();
    				str = tmp.join("");
    				if(!map[str]){
    					out.push(tmp);
    					map[str] = 1;
    				}
    			}
    		}
    	}
    }
    return out;
},
// version 2
threeSum = function(num){
	var out = [],
		outMap = {},
		map = {},
		len = num ? num.length : 0,
		tmp, str,
		x, y, z,
		a, b, c;
	if(len < 3){
    	return out;
    }
    for(x=0;x<len;x++){
    	map[num[x]] = x;
    }
    for(x=0;x<len-1;x++){
    	a = num[x];
    	for(y=x+1;y<len;y++){
    		b = num[y];
    		c = 0 - a - b;
    		z = map[c];
    		if(z && z > y){
    			tmp = [a, b, c].sort();
    			str = tmp.join(" ");
    			if(!outMap[str]){
    				outMap[str] = 1;
    				out.push(tmp)
    			}
    		}
    	}
    }
    return out;
}，
// version 3
threeSum = function(num){
	var out = [],
		outMap = {},
		map = {},
		len = num ? num.length : 0,
		tmp, str,
		x, y, z,
		a, b, c;
	if(len < 3){
    	return out;
    }
    for(x=0;x<len;x++){
    	a = num[x];
    	if(!map[a]){
    		map[a]=1
    	}else{
    		map[a]++;
    	}
    }
    for(a in map) if(map.hasOwnProperty(a)){
    	x = parseInt(map[a], 10);
    	for(b in map) if(map.hasOwnProperty(b)){
    		y = parseInt(map[b], 10);
    		c = 0 - a - b;
    		z = map[c];
    		map[a]--;
    		map[b]--;
    		map[c]--;
    		if( (--map[a]) * (--map[b]) * (--map[c]) >= 0 ){
    			tmp = [a, b, c].sort();
    			str = tmp.join(" ");
    			if(!outMap[str]){
    				outMap[str] = 1;
    				out.push(tmp)
    			}
    		}
    		map[a] = x;
    		map[b] = y;
    		map[c] = z;
    	}
    }
    return out;
},
// version 4
threeSum = function(num){
	var out = [], map = {},
		len = num && num.length,
		left, current, right,
		target, sum, temp, str;
	num.sort(function(a,b){return a-b});
	if(len > 2){
		for(current = 0; current < len - 2; current++){
			if(num[current]>0){break;}
			if(current > 0 && num[current] === num[current-1]){
				continue;
			}
			target = -1 * num[current];
			left = current + 1;
			right = len - 1;
			while(left < right){
				if(right < len-1 && num[right] === num[right+1]){
					right--;
				}else if(left > current+1 && num[left] === num[left-1]){
					left++;
				}else{
					sum = num[left]+num[right];
					if(sum > target){
						right--;
					}else if (sum < target) {
						left++;
					}else{
						temp = [num[current], num[left], num[right]];
						str = temp.join(",");
						if(!map[str]){
							out.push(temp);
							map[str] = 1;
						}
						left++;
						right--;
					};
				}
			}
		}
	}
	return out;
}/*,
// version 5
threeSum = function(num){
	var out = [],
		plus = [],
		minus = [],
		left = 0,
		x,
		right = num && num.length - 1, zero = 0;
	if(num<3){return out}
	while(left <= right){
		x = num[left];
		if(x>0){
			plus.push(x)
		}else if(x<0){
			minus.push(x)
		}else{
			zero++;
		}
	}
	if(zero>3){
		out.push([0,0,0])
	}
	num = num.sort(function(a, b){return a-b;})
}*/;