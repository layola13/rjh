const cssContent = `#performance3dContainer {
    background: #eae9e9;
    border-right: solid 1px #ccc;
    border-left: solid 1px #ccc;
}
#performance3dContainer #performanceBoard {
    width: 86px;
    height: 34px;
}
#performance3dContainer #arrow {
    transform-origin: 43px 34px;
}
#performance3dContainer #level1, 
#performance3dContainer #level2, 
#performance3dContainer #level3 {
    cursor: pointer;
}
#performance3dContainer .tip-container {
    pointer-events: auto;
    position: absolute;
    z-index: 1;
    border: solid 1px;
    border-radius: 4px;
    padding: 2px;
}
#performance3dContainer .tip-body {
    padding: 5px 5px;
    text-align: left;
}
#performance3dContainer .level-tip-container {
    border-color: #717171;
    background-color: #717171;
    min-width: 60px;
}
#performance3dContainer .level-tip-container::after {
    border-top: 6px solid #717171;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    width: 0;
    height: 0;
    content: "";
    display: block;
    position: absolute;
    left: 30%;
}
#performance3dContainer .tip-level1 {
    left: -5px;
    bottom: 112%;
}
#performance3dContainer .tip-level1::after {
    left: 20px;
}
#performance3dContainer .tip-level2 {
    left: 13px;
    bottom: 112%;
}
#performance3dContainer .tip-level2::after {
    left: 24px;
}
#performance3dContainer .tip-level3 {
    left: 42px;
    bottom: 112%;
}
#performance3dContainer .tip-level3::after {
    left: 20px;
}
#performance3dContainer .level-tip-body {
    font-size: 11px;
    color: white;
    line-height: 16px;
}
#performance3dContainer .widget-tip-container {
    border: solid 1px #d9dbdf;
    background-color: #fafafa;
    width: 150px;
    bottom: 120%;
    left: -48px;
}
#performance3dContainer .widget-tip-body {
    font-size: 12px;
    color: #808080;
    line-height: 18px;
}
#performance3dContainer .widget-tip-container::after {
    border-top: 8px solid #fafafa;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    width: 0;
    height: 0;
    content: "";
    display: block;
    position: absolute;
    left: 50%;
}
#performance3dContainer .nomore-show {
    margin-top: 5px;
    width: 100%;
    text-align: right;
    color: #4d9bd6;
    cursor: pointer;
}
#performance3dContainer .nomore-show:hover {
    text-decoration: underline;
}
.global-en #performance-3d-container .level-tip-container {
    border-color: #FFFFFF;
    background-color: #FFFFFF;
    min-width: 60px;
    white-space: nowrap;
}`;

export default cssContent;