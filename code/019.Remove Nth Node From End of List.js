/*
*   https://leetcode.com/problems/remove-nth-node-from-end-of-list/
*
*   Given a linked list, remove the nth node from the end of list and return its head.
*
*   For example,
*
*      Given linked list: 1->2->3->4->5, and n = 2.
*
*      After removing the second node from the end, the linked list becomes 1->2->3->5.
*
*   Note:
*   Given n will always be valid.
*   Try to do this in one pass.
*
*/


/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
// 172ms
var removeNthFromEnd = function(head, n) {
    var len = 0,
        cache = [];
    while(head){
        cache[len] = head;
        len++;
        head = head.next;
    }
    if(len > 1){
        if(len === n){
            return cache[1];
        }else{
            // left
            cache[len - n - 1].next = cache[len - n + 1] || null;
        }
    }else{
        return null
    }
    return cache[0];
}




// 164ms solution from leetcode
var removeNthFromEnd = function(head, n) {
    var dummy = new ListNode(0);
    dummy.next = head;
    var temp = dummy;
    var i = 0;
    while(temp !== null && i < n) {
        temp = temp.next;
        i++;
    }
    if(temp === null) return dummy.next;
    var slow = dummy;
    while(temp.next !== null) {
        temp = temp.next;
        slow = slow.next;
    }
    slow.next = slow.next.next;
    return dummy.next;
};