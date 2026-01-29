const cssContent = `#performance-3d-container {
    width: 68px;
    height: 34px;
}
#performance-3d-container #performanceBoard {
    width: 68px;
    height: 27px;
    margin-top: 3px;
    position: relative;
}
#performance-3d-container #arrow {
    transform-origin: 43px 34px;
}
#performance-3d-container #level1, 
#performance-3d-container #level2, 
#performance-3d-container #level3 {
    cursor: pointer;
}
#performance-3d-container .tip-container {
    pointer-events: auto;
    position: absolute;
    z-index: 1;
    border: solid 1px;
    border-radius: 4px;
    padding: 2px;
}
#performance-3d-container .tip-body {
    padding: 5px 5px;
    text-align: left;
}
#performance-3d-container .level-tip-container {
    border-color: #FFFFFF;
    background-color: #FFFFFF;
    min-width: 60px;
}
#performance-3d-container .level-tip-container::after {
    border-top: 6px solid #FFFFFF;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    width: 0;
    height: 0;
    content: "";
    display: block;
    position: absolute;
    left: 30%;
}
#performance-3d-container .tip-level1 {
    left: -14px;
    bottom: 130%;
}
#performance-3d-container .tip-level1::after {
    left: 20px;
}
#performance-3d-container .tip-level2 {
    left: 2px;
    bottom: 130%;
}
#performance-3d-container .tip-level2::after {
    left: 24px;
}
#performance-3d-container .tip-level3 {
    left: 24px;
    bottom: 130%;
}
#performance-3d-container .tip-level3::after {
    left: 20px;
}
#performance-3d-container .level-tip-body {
    font-size: 11px;
    color: #19191E;
    line-height: 16px;
}
#performance-3d-container .widget-tip-container {
    border: solid 1px #d9dbdf;
    background-color: #fafafa;
    width: 150px;
    bottom: 120%;
    left: -48px;
}
#performance-3d-container .widget-tip-body {
    font-size: 12px;
    color: #808080;
    line-height: 18px;
}
#performance-3d-container .widget-tip-container::after {
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
#performance-3d-container .nomore-show {
    margin-top: 5px;
    width: 100%;
    text-align: right;
    color: #4d9bd6;
    cursor: pointer;
}
#performance-3d-container .nomore-show:hover {
    text-decoration: underline;
}
.global-en #performance-3d-container .level-tip-container {
    border-color: #FFFFFF;
    background-color: #FFFFFF;
    min-width: 60px;
    white-space: nowrap;
}`;

export default cssContent;