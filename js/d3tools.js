function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

async function trave(node_v) {
    draw_trave(node_v);
    await delay(1000);
    draw_node(node_v);
    draw_name(node_v);
}

function draw_node(node_v) {
    let node = tree.nodes.get(node_v);
    let cx = node.x;
    let cy = node.y;
    if (node_v.father !== '') {
        g.append("circle")
            .attr("cx", cx)
            .attr("cy", cy)
            .attr("r", NODE_R)
            .attr("fill", NODE_FILL_COR)
            .attr("stroke", NODE_MARGIN_COR)
            .attr("stroke-width", NODE_MARGIN_WID)
    }
}

function draw_trave(node_v) {
    let node = tree.nodes.get(node_v);
    let cx = node.x;
    let cy = node.y;
    if (node_v.father !== '') {
        g.append("circle")
            .attr("cx", cx)
            .attr("cy", cy)
            .attr("r", NODE_R)
            .attr("fill", NODE_TRV_COR)
            .attr("stroke", NODE_MARGIN_COR)
            .attr("stroke-width", NODE_MARGIN_WID)
    }

}

function draw_line_father(node_v) {
    let node = tree.nodes.get(node_v);
    if (node.father === '/' || node.father === "") return;
    else {
        let [x1, y1] = [node.x, node.y];
        let father_node = tree.nodes.get(node.father);
        let [x2, y2] = [father_node.x, father_node.y];
        let offset = 0;
        g.append("line")
            .attr("x1", x1 + offset)
            .attr("x2", x2 + offset)
            .attr("y1", y1 + offset)
            .attr("y2", y2 + offset)
            .attr("stroke", "black")
            .attr("stroke-width", EDGE_MARGIN_WID)

    }
}

function draw_thread(node1_v, node2_v, color) {
    let node1 = tree.nodes.get(node1_v);
    let node2 = tree.nodes.get(node2_v);
    if (!node1 || !node2) return;
    let [x1, y1] = [node1.x, node1.y];
    let [x2, y2] = [node2.x, node2.y];
    let offset = 0;
    g.append("line")
        .attr("x1", x1 + offset)
        .attr("x2", x2 + offset)
        .attr("y1", y1 + offset)
        .attr("y2", y2 + offset)
        .attr("stroke", `${color}`)
        .attr("stroke-width", EDGE_MARGIN_WID)
}

function draw_thread(node1, node2, color,move=0) {
    if (!node1 || !node2) return;
    let [x1, y1] = [node1.x, node1.y];
    let [x2, y2] = [node2.x, node2.y];
    const startPoint = { x: x1 + move, y: y1 + move }; // 起始点
    const endPoint = { x: x2 + move, y: y2+move }; // 结束点
    const controlPointX = (startPoint.x + endPoint.x) / 2;
    const controlPointY = startPoint.y - RADIUS - move * 10;
    const curveGenerator = d3.line()
        .x(d => d.x)
        .y(d => d.y)
        .curve(d3.curveBasis);
    // 构造贝塞尔曲线的数据点
    const curveData = [
        startPoint,
        { x: controlPointX, y: controlPointY },
        endPoint
    ];

    g.append("path")
        .attr("d", curveGenerator(curveData))
        .attr("fill", "none")
        .attr("stroke", `${color}`)
        .attr("stroke-width", 2);
}

function clear_map() {
    d3.select('g').selectAll('*').remove();
}

function draw_name(node_v) {
    let node = tree.nodes.get(node_v);
    let x = node.x + WORD_X;
    let y = node.y + WORD_Y;
    g.append("text")
        .text(node_v)
        .attr("x", x)
        .attr("y", y)
        .attr("font-size", TEXT_SIZE);
}

function init() {
    clear_map();
    draw_node('#');
    draw_name("#");
}

init();

