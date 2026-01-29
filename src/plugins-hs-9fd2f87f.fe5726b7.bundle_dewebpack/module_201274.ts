const cssContent = `.toolitem .tip-wrap {
    background-color: #fafafa;
    width: 177px;
    z-index: 0;
    border-radius: 4px;
    padding: 2px;
    position: absolute;
    left: -65px;
    top: 60px;
    text-align: left;
    cursor: default;
}
.toolitem .tip-wrap .tip-body {
    font-size: 12px;
    color: #808080;
    line-height: 18px;
    padding: 5px;
}
.toolitem .tip-wrap::after {
    border-bottom: 8px solid #fafafa;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    width: 0;
    height: 0;
    content: "";
    display: block;
    position: absolute;
    left: 80px;
    top: -8px;
}
.toolitem .tip-wrap .nomore-show {
    margin-top: 5px;
    width: 100%;
    text-align: right;
    color: #4d9bd6;
    cursor: pointer;
}
.toolitem .tip-wrap .nomore-show:hover {
    text-decoration: underline;
}`;

export default cssContent;