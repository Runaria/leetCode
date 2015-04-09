// https://leetcode.com/problems/add-two-numbers/


/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2){
	var sum = 0,
		out = node = new ListNode(0),
		prev;
	while(l1 || l2 || sum){
		if(l1){
			sum += l1.val;
			l1 = l1.next;
		}
		if(l2){
			sum += l2.val;
			l2 = l2.next;
		}
		node.val = sum%10;
		sum = sum>9 ? 1 : 0;
		if(prev){
			// create link prev object
			prev.next = node;
		}
		prev = node;
		node = new ListNode(0);
	}
	return out;
};
// version 2
var addTwoNumbers = function(l1, l2){
	var n1 = "",
		n2 = "",
		sum;
	while(l1 || l2){
		if(l1){
			n1 = l1.val + n1;
			l1 = l1.next;
		}
		if(l2){
			n2 = l2.val + n2;
			l2 = l2.next;
		}
	}
	sum = ((parseInt(n1, 10) + parseInt(n2, 10))+"");
	var x = sum.length,
		prev, node, out;
	while(--x>=0){
		node = new ListNode(parseInt(sum[x],10));
		if(prev){
			prev.next = node;
		}else{
			out = node;
		}
		prev = node;
	}
	return out;
}