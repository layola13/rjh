const cssContent = `#customizedtool-tip .tip-wrap {
    background-color: #fafafa;
    width: 177px;
    opacity: 1!important;
    z-index: 101;
    border-radius: 0!important;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    padding: 0!important;
    position: absolute;
    left: -65px;
    top: 55px;
    text-align: left;
    cursor: default;
    box-shadow: 0 2px 6px 0 rgba(190, 190, 200, 0.5);
}
#customizedtool-tip .tip-wrap .tip-head {
    width: 100%;
    height: 6px;
    margin-bottom: 4px;
    background-color: #c8e3f7;
}
#customizedtool-tip .tip-wrap .triangle {
    width: 8px;
    height: 8px;
    background-color: #c8e3f7;
    transform: rotate(45deg);
    position: absolute;
    left: 86px;
    top: -4px;
}
#customizedtool-tip .tip-wrap .tip-body {
    font-size: 12px;
    color: #808080;
    line-height: 18px;
    padding: 5px 10px 10px;
}
#customizedtool-tip .tip-wrap::after {
    display: none;
}
#customizedtool-tip .tip-wrap .nomore-show {
    margin-top: 5px;
    width: 100%;
    text-align: right;
    color: #4d9bd6;
    cursor: pointer;
}
#customizedtool-tip .tip-wrap .nomore-show:hover {
    text-decoration: underline;
}`;

export default cssContent;