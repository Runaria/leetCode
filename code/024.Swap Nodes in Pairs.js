/*  https://leetcode.com/problems/swap-nodes-in-pairs/

    Given a linked list, swap every two adjacent nodes and return its head.

    For example,
    Given 1->2->3->4, you should return the list as 2->1->4->3.

    Your algorithm should use only constant space. You may not modify the values in the list, only nodes itself can be changed. 

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
 * @return {ListNode}
 */
var swapPairs = function(head) {
    var n1, n2, prev, cache;
    if(!head){
        return []
    }
    n1 = head;
    n2 = head.next;
    if(!n2){
        return head;
    }
    head = n2;
    while (n1 && n2) {
        n1.next = n2.next;
        n2.next = n1;
        prev && (prev.next = n2);

        prev = n1;
        n1 = n1.next;
        n2 = n1 && n1.next;
    }
    return head;
};