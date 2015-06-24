/*  https://leetcode.com/problems/reverse-nodes-in-k-group/

    Given a linked list, reverse the nodes of a linked list k at a time and return its modified list.

    If the number of nodes is not a multiple of k then left-out nodes in the end should remain as it is.

    You may not alter the values in the nodes, only nodes itself may be changed.

    Only constant memory is allowed.

    For example,
    Given this linked list: 1->2->3->4->5

    For k = 2, you should return: 2->1->4->3->5

    For k = 3, you should return: 3->2->1->4->5
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
 * @param {number} k
 * @return {ListNode}
 */
// version 1: 失败，如果最后一组节点数小于K时，不需要反转处理
var reverseKGroup = function(head, k) {
    if (head) {
        if (k>1) {
            var i = 0,
                // current node
                node = head,
                // next node
                next = null,
                // previous node
                prev = null,
                // first node in every parts
                prevFirst = null,
                thisFirst = null;
            while(node){
                // cache next node
                next = node.next;
                if (i === 0) {
                    // cache this part's first node
                    thisFirst = node;
                    if (!next && prevFirst) {
                        // link previous part
                        prevFirst.next = node;
                    }
                }else{
                    // reverse
                    node.next = prev;
                    if (i === k-1 || !next) {
                        if (prevFirst) {
                            // link previous part
                            prevFirst.next = node;
                        } else {
                            // cache
                            head = node;
                        }
                        // set next part
                        prevFirst = thisFirst;
                        // set next loop
                        i = -1;
                    }
                }
                // set next loop
                prev = node;
                node = next;
                i++;
            }
            // set last node
            thisFirst.next = null;
            return head;
        }else{
            return head;
        }
    } else {
        return [];
    }
}

// version 2 : 180ms
var reverseKGroup = function(head, k) {
    // failed
    if (head) {
        if (k>1) {
            var i = 0,
                // current node
                node = head,
                // next node
                next = null,
                // previous node
                prev = null,
                cache = [];
            head = null;
            while(node){
                next = node.next;
                // read k nodes
                cache.push(node);
                if (i<k-1) {
                    i++;
                    if (!next) {
                        prev && (prev.next = cache[0]);
                    }
                } else {
                    // do reverse
                    while ( i>=0 ) {
                        if (prev) {
                            prev.next = cache[i];
                        }
                        prev = cache[i];
                        i--;
                    }
                    i = 0;
                    // cache first node
                    head || (head = cache[k-1]);
                    if(next){
                        // reset cache
                        cache.length = 0;
                    } else {
                        // end node link
                        cache[0].next = null;
                    }
                }
                node = next;
            }
        }
        return head || cache[0];
    } else {
        return [];
    }
}

// version 3
var reverseKGroup = function(head, k) {
    if (head) {
        if (k<2) {
            return head;
        }
        var part = _readAndReverse(head, k),
            temp,
            out = part.first;
        while (part.next) {
            temp = _readAndReverse(part.next, k);
            // link part
            part.last.next = temp.first;
            // set next loop
            part = temp;
        }
        // end last node
        part.last.next = null;
        return out;
    }
    return [];
},
_readAndReverse = function(node, k) {
    var cache = [],
        len = 0, x = 0, prevNode,
        nextNode = null,
        isFull = false;
    while (node && len < k) {
        len = cache.push(node);
        node = node.next;
    }
    if (len === k) {
        isFull = true;
        nextNode = cache[len-1].next;
        while ( x < len ) {
            node = cache[x];
            prevNode && (node.next = prevNode);
            prevNode = node;
            x++;
        }
    }
    return isFull ? {
        first: cache[len-1],
        last: cache[0],
        next: nextNode
    } : {
        first: cache[0],
        last: cache[len-1],
        next: null
    }
}


// version 4 from discuss : 172ms
// https://leetcode.com/discuss/27468/20-line-iterative-c-solution
var reverseKGroup = function(head, k) {
    if (!head || k < 2) {
        return head
    }
    var preNode = new ListNode(),
        pre = preNode,
        cur = head,
        nxt,
        sum = 0, i;
    preNode.next = head;
    while (cur) {
        sum++;
        cur = cur.next;
    }
    while (sum >= k) {
        cur = pre.next;
        nxt = cur.next;
        for (i=1; i<k; i++) {
            cur.next = nxt.next;
            nxt.next = pre.next;
            pre.next = nxt;
            nxt = cur.next;
        }
        pre = cur;
        sum -= k;
    }
    return preNode.next;
}