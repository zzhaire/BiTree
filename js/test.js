class Node {
    constructor(v) {
        this.v = v;
        this.left = -1;
        this.right = -1;
        this.line_left = -1;
        this.line_right = -1;
    }
}

class BiTree {
    constructor() {
        this.tree = new Array(70).fill(null);
    }

    add_node(parent_v, is_left) {
        if (idx >= 0 && idx < 70 && this.tree[idx] === null) {
            this.tree[idx] = new Node(idx, v);

            if (parentIdx >= 0 && parentIdx < 70 && this.tree[parentIdx] !== null) {
                if (isLeft) {
                    this.tree[parentIdx].add_left(idx);
                } else {
                    this.tree[parentIdx].add_right(idx);
                }
            }
        }
    }

    // Other methods for tree traversal or manipulation can be added here
}

// Example usage
const myTree = new BiTree();

// Inserting nodes
myTree.insertNode(0, 10, -1, false); // Root node
myTree.insertNode(1, 5, 0, true);    // Left child of the root
myTree.insertNode(2, 15, 0, false);  // Right child of the root
myTree.insertNode(3, 3, 1, true);    // Left child of node 1
myTree.insertNode(4, 7, 1, false);   // Right child of node 1

// ... continue inserting nodes as needed

console.log(myTree.tree);
