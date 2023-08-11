function get_x(idx) {
    let y = Math.floor(Math.log2(idx));
    let x = (idx - (1 << y)) / (1 << y) + 1 / (1 << (y + 1));
    return x * WID + COORD_X;
}
function get_y(idx) {
    let y = Math.floor(Math.log2(idx));
    return y * HEI + COORD_Y;
}
/********************************************************/
class Node {
    constructor(idx, val) {
        this.idx = idx;
        this.val = val;
        this.x = get_x(idx); //节点的坐标
        this.y = get_y(idx);
        this.father = '';   //父节点  指向val
        this.left = '';   // 左右结点 指向val
        this.right = '';
        this.line_left = 0; //是否划线
        this.line_right = 0;
    }

}

class BiTree {
    constructor() {
        this.nodes = new Map(); //所有的结点{ node_v : Node};
        this.pre_order_list = [];
        this.in_order_list = [];
        this.post_order_list = [];
    }
    get_left_v(node_v) {
        let now_node = this.nodes.get(node_v);
        return now_node.left;
    }
    get_right_v(node_v) {
        let now_node = this.nodes.get(node_v);
        return now_node.right;
    }
    add_root() {
        let root_node = new Node(1, '#');
        root_node.father = '/';
        this.nodes.set('#', root_node);
    }
    add_left_node(parent_v, new_node_v) {
        let parent_node = this.nodes.get(parent_v);
        if (parent_node && parent_node.left === '') {
            let new_node_idx = 2 * parent_node.idx;
            let new_node = new Node(new_node_idx, new_node_v);
            new_node.father = parent_node.val;
            parent_node.left = new_node_v;
            this.nodes.set(new_node_v, new_node);
            return 1;
        }
        else {
            return 0;
        }
    }
    add_right_node(parent_v, new_node_v) {
        let parent_node = this.nodes.get(parent_v);
        if (parent_node && parent_node.right === '') {
            let new_node_idx = 2 * parent_node.idx + 1;
            let new_node = new Node(new_node_idx, new_node_v);
            new_node.father = parent_node.val;
            parent_node.right = new_node_v;
            this.nodes.set(new_node_v, new_node);
            return 1;
        }
        else {
            return 0;
        }
    }
    remove_node(node_v) {
        let now_node = this.nodes.get(node_v);
        if (!now_node) return;

        if (now_node.father) {
            const parent_node = this.nodes.get(now_node.father);
            if (parent_node) {
                if (parent_node.left === node_v) {
                    parent_node.left = ''; // 如果是左子节点，更新左指针为空
                } else if (parent_node.right === node_v) {
                    parent_node.right = ''; // 如果是右子节点，更新右指针为空
                }
            }
        }

        if (now_node.left) {
            this.remove_node(now_node.left);
        }
        if (now_node.right) {
            this.remove_node(now_node.right);
        }
        this.nodes.delete(node_v);
    }
    pre_order(node_v) {
        if (!node_v) return; // 检查节点是否存在
        /***************************************/
        this.pre_order_list.push(node_v);

        /***************************************/
        this.pre_order(this.get_left_v(node_v));
        this.pre_order(this.get_right_v(node_v));
    };
    in_order(node_v) {
        if (!node_v) return; // 检查节点是否存在
        /*************************************/

        this.in_order(this.get_left_v(node_v));
        /*************************************/
        this.in_order_list.push(node_v);
        console.log(node_v);
        /*************************************/
        this.in_order(this.get_right_v(node_v));

    };
    post_order(node_v) {
        if (!node_v) return; // 检查节点是否存在
        /**************************************/
        this.post_order(this.get_left_v(node_v));
        this.post_order(this.get_right_v(node_v));
        /**************************************/
        console.log(node_v);
        this.post_order_list.push(node_v);
    };
    clear_list() {
        this.pre_order_list = [];
        this.in_order_list = [];
        this.post_order_list = [];
    }
}

let tree = new BiTree();
tree.add_root();