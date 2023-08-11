var functions = new Vue({
    el: "#left_area",
    data: {
        act: 0,
        left: false,
        father_node_name: '',
        new_node_name: '',
        del_node_name: "",
        show_list : [],
        if_show:0,
    },
    methods: {
        /** 切换面板的函数 **/
        switch_board(val) {
            this.act = val;
        },
        close(){
            this.if_show = 0;
        },
        add_node(if_left) {
            if (tree.nodes.get(this.new_node_name)) {
                alert("该节点已经存在于树中");
                return;
            }
            if (if_left === 1) {
                if (tree.add_left_node(this.father_node_name, this.new_node_name)) {
                    alert(`左结点${this.new_node_name}添加成功`);
                } else {
                    alert("没有找到对应的父节点或该位置已有结点,添加失败");
                    return;
                }
            }
            else if (if_left === 0) {
                if (tree.add_right_node(this.father_node_name, this.new_node_name)) {
                    alert(`右结点${this.new_node_name}添加成功`);
                } else {
                    alert("没有找到对应的父节点或该位置已有结点,添加失败");
                    return;
                }
            }
            this.update_map();
        },
        remove_node() {
            if (!tree.nodes.get(this.del_node_name)) {
                alert("没有在树中找到要删除的结点");
                return;
            }
            tree.remove_node(this.del_node_name);
            this.update_map();
        },
        async pre_order(){
            tree.clear_list();
            tree.pre_order("#");
            console.log(tree.pre_order_list);
            this.show_list=tree.pre_order_list;
            this.if_show = 1;
            for(let node_v of tree.pre_order_list){
                await trave(node_v);
            }
            this.update_map();

        },
        async in_order(){
            tree.clear_list();
            tree.in_order("#");
            this.show_list=tree.in_order_list;
            this.if_show = 1;
            for(let node_v of tree.in_order_list){
                await trave(node_v);
            }
            this.update_map();
        },
        async post_order(){
            tree.clear_list();
            tree.post_order("#");
            this.show_list=tree.post_order_list;
            this.if_show = 1;
            for(let node_v of tree.post_order_list){
                await trave(node_v);
            }
            this.update_map();
        },
        pre_thread(){
            tree.clear_list();
            tree.pre_order("#");
            for(let i=0 ; i<tree.pre_order_list.length-1; i++){
                let j = i+1;
                let node1 = tree.nodes.get(tree.pre_order_list[i]);
                let node2 = tree.nodes.get(tree.pre_order_list[j]);
                if(node1.right==='' )
                    draw_thread(node1,node2,'pink');
                if(node2.left==='')
                    draw_thread(node1,node2,'blue',2);
            }
        },
        in_thread(){
            tree.clear_list();
            tree.in_order("#");
            for(let i=0 ; i<tree.in_order_list.length-1; i++){
                let j = i+1;
                let node1 = tree.nodes.get(tree.in_order_list[i]);
                let node2 = tree.nodes.get(tree.in_order_list[j]);
                if(node1.right==='' )
                    draw_thread(node1,node2,'pink');
                if(node2.left==='')
                    draw_thread(node1,node2,'blue',2);
            }
        },
        post_thread(){
            tree.clear_list();
            tree.post_order("#");
            for(let i=0 ; i<tree.post_order_list.length-1; i++){
                let j = i+1;
                let node1 = tree.nodes.get(tree.post_order_list[i]);
                let node2 = tree.nodes.get(tree.post_order_list[j]);
                if(node1.right==='' )
                    draw_thread(node1,node2,'pink');
                if(node2.left==='')
                    draw_thread(node1,node2,'blue',2);
            }
        },
        update_map() {
            this.father_node_name='';
            this.new_node_name='';
            this.del_node_name='';
            clear_map();
            // console.log(tree.nodes);
            for (let [key, value] of tree.nodes) {
                // console.log(`Key: ${key}, Value: ${value}`);
                draw_line_father(key);
            }
            for (let [key, value] of tree.nodes) {
                // console.log(`Key: ${key}, Value: ${value}`);
                draw_node(key);
            }
            for (let [key, value] of tree.nodes) {
                // console.log(`Key: ${key}, Value: ${value}`);
                draw_name(key);
            }
        }
    }
})


var bars = new Vue({
    el: "#tab",
    data: {},
    methods: {
        big() {
            ZOOM.scaleBy(SVG, 1.1);
            d3.zoomTransform(SVG.node());
        },
        small() {
            ZOOM.scaleBy(SVG, 0.9);
            d3.zoomTransform(SVG.node());
        },
        clear() {
            clear_map();
        },
        init(){
            init();
        },
    }
})

