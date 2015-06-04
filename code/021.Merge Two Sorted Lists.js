/*
    https://leetcode.com/problems/merge-two-sorted-lists/

    Merge two sorted linked lists and return it as a new list. The new list should be made by splicing together the nodes of the first two lists.

 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
// version 1: Time Limit Exceeded
var mergeTwoLists = function(l1, l2) {
    var prev = {next:null}, start;
    if(l1 && l2){
        start = l1.val > l2.val ? l2 : l1;
        while (true) {
            if(l1 && l2){
                if(l1.val > l2.val){
                    prev.next = l2;
                    l2.next = l1;
                    prev = l1;
                }else{
                    prev.next = l1;
                    l1.next = l2;
                    prev = l2;
                }
                l1 = l1.next;
                l2 = l2.next;
            }else{
                prev.next = l1 || l2;
                break;
            }
        }
    }else{
        start = l1 || l2;
    }
    return start;
};
// version 2: 164 ms
var mergeTwoLists = function(l1, l2){
    var temp;
    if(l1 && l2){
        // make node 1 always bigger than node 2
        if(l1.val < l2.val){
            temp = l2;
            l2 = l1;
            l1 = temp;
        }
        walk(l2, l1);
        return l2;
    }else{
        return l1 || l2;
    }
}
var walk = function (walker, control) {
    var next = walker.next;
    if(next){
        if(next.val > control.val){
            walker.next = control;
            walk(control, next);
        }else{
            walk(next, control);
        }
    }else{
        walker.next = control;
    }
}