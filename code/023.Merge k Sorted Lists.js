/*
    https://leetcode.com/problems/merge-k-sorted-lists/

    Merge k sorted linked lists and return it as one sorted list. Analyze and describe its complexity.

 */





/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
// Time Limit Exceeded
var mergeKLists = function(lists) {
    var node,
        list = [],
        start;
    // filter out empty listNode
    while(node = lists.pop()){
        if(node){
            list.push(node)
        }
    }
    if(list.length>1){
        list.sort(sorter);
        start = list[0];
        link(list);
    }
    return start;
};
var sorter = function(a, b){
    return a.val-b.val;
}
var link = function(list){
    if(list.length <= 1){ return }
    var prev = list[0],
        // walk to next
        next = list[0].next;
    if(!next){
        list.shift();
    }else{
        list[0] = next;
    }
    list.sort(sorter);
    if(next !== list[0]){
        prev.next = list[0];
        link(list);
    }
}


// Memory Limit Exceeded
var mergeKLists = function(lists) {
    var start,
        out;
    if(lists && lists.length){
        start = findMin(lists);
        if(start >= 0){
            out = lists[start];
            merge(lists, start);
        }
    }
    return out;
},
findMin = function(list){
    var min = Infinity,
        out = -1;
    for(var i=0, len = list.length; i<len; i++) {
        if(list[i] && list[i].val < min){
            min = list[i].val;
            out = i;
        }
    }
    return out;
},
merge = function(list, prevIdx){
    if(list.length <= 1){ return }
    var prev = list[prevIdx],
        // walk to next
        next = prev && prev.next,
        minIdx;
    if(!next){
        list.shift();
    }else{
        list[prevIdx] = next;
    }
    minIdx = findMin(list);
    if(minIdx !== prevIdx){
        prev.next = list[minIdx];
    }
    merge(list, minIdx);
}



// solution: 196 ms
var mergeKLists = function(lists) {
    var node,
        len = lists.length,
        list = [],
        start;
    // delete empty listNode
    while(--len >= 0){
        node = lists[len];
        if(node){
            list.push(node)
        }
    }
    if(list.length){
        list.sort(function(a,b){
            return a.val - b.val;
        })
        start = list[0];
        combine(list);
    }else{
        return [];
    }
    return start;
},
combine = function(list){
    if(list.length <= 1){return}
    var prev = list[0],
        next = prev && prev.next;
    if(next){
        for(var i=1, len = list.length; i<len; i++){
            if(next.val <= list[i].val){
                break;
            }
        }
        if(i===1){
            list[0] = next;
        }else{
            prev.next = list[1];
            list.splice(i,0,next);
            list.shift();
        }
    }else{
        prev.next = list[1];
        list.shift();
    }
    combine(list);
}