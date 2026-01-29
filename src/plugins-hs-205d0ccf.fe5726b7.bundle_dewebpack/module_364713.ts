const cssContent = `.teaching-top {
    padding: 0 13px 0 10px;
    display: flex;
    align-items: center;
    height: 40px;
    margin-top: 16px;
}
.teaching-top .top-left {
    position: relative;
    flex-shrink: 0;
    flex-flow: 0;
}
.teaching-top .top-title {
    font-size: 16px;
    font-family: AlibabaPuHuiTi-Bold !important;
    color: #33353b;
    margin-left: 10px;
}
.teaching-top .top-search {
    flex: auto;
    position: relative;
    height: 36px;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    margin-left: 2px;
}
.teaching-top .top-search .operate {
    display: flex;
    align-items: center;
    width: 72px;
    justify-content: flex-end;
}
.teaching-top .top-search .search-input {
    transition: all 0.3s linear;
    overflow: hidden;
    width: 100%;
}
.teaching-top .top-search .width-none {
    width: 0;
    overflow: hidden;
    flex-shrink: 0;
    flex-grow: 0;
}
.teaching-top .round-icon-o {
    width: 30px;
    height: 30px;
    transition: all 0.3s linear;
}
.teaching-top .top-close {
    flex: 0 0 30px;
    margin-left: 10px;
}
.teaching-top .input-search-icon {
    color: #9b9fab !important;
    font-size: 18px;
}
.teaching-top .input-search-icon:hover {
    color: #396efe !important;
}
.teaching-top.teaching-light .top-title {
    color: #33353b;
}
.teaching-top.teaching-black .top-title {
    color: #fff;
}
.coruse-icon-popover {
    z-index: 3050 !important;
    margin-right: 12px;
}`;

export default cssContent;