const SVG = d3.select('#tree');
const SVG_HEIGHT = parseInt(SVG.style("height"));
const SVG_WIDTH = parseInt(SVG.style("width"));
let g = SVG.append("g"); //整个图的group
//设置了缩放的范围为0.1到5倍。d3.zoom()函数用于创建一个缩放对象，可以应用于SVG元素上
const ZOOM = d3.zoom().scaleExtent([0.1, 5.0]).on("zoom", zoomed);
SVG.call(ZOOM);
const NODE_R = 20; //节点的半径
const NODE_FILL_COR = "#f8cbad"; //节点的填充色
const NODE_TRV_COR = "#5dc5f0"; //遍历时的颜色
const NODE_MARGIN_COR = "black"; //节点边框的颜色
const NODE_MARGIN_WID = 3; //节点边框的宽度
const EDGE_MARGIN_WID = 3; //一条边的宽度
const TEXT_SIZE = 30; //站点的标识文字大小
const LINE_TEXT_SIZE = 16; //线的标识文字大小
const WID = SVG_WIDTH - 100;
const HEI = 200;
const COORD_X = 90;
const COORD_Y = 100;
const WORD_X = -10;
const WORD_Y = 10;

const RADIUS = 50; // 曲率半径


/** 缩放函数 **/
function zoomed(event) {
    const { transform } = event;
    g.attr("transform", transform);
}


