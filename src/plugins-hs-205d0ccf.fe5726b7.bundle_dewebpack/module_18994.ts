const styles = `.item-wrapper {
    font-family: PingFangSC-Regular !important;
    font-size: 12px;
    letter-spacing: 0;
    line-height: 16px;
    cursor: pointer;
    border-radius: 6px;
    padding: 8px 6px;
    margin: 0 10px;
    transition: background-color 0.3s, color 0.3s;
}
.item-wrapper .dian {
    float: left;
    font-family: PingFangSC-Regular !important;
    font-size: 12px;
}
.item-wrapper .content {
    line-height: 16px;
    margin-left: 10px;
    padding-right: 4px;
}
.item-wrapper .content .tag-span {
    display: inline-block;
    font-family: AlibabaPuHuiTi-Bold !important;
    transform: skew(-15deg, 0);
    font-weight: 600;
}
.item-wrapper .content .title {
    font-family: PingFangSC-Regular !important;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    transition: color 0.3s;
}
.item-wrapper .content .title em {
    font-family: PingFangSC-Medium !important;
}
.item-wrapper .content .title .title-content {
    font-family: PingFangSC-Regular !important;
}
.item-wrapper .content .key-word-wrapper {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 1px;
}
.item-wrapper .content .key-word-wrapper .key-word {
    font-family: PingFangSC-Light !important;
    margin-right: 6px;
    font-size: 11px;
}
.item-wrapper .content .key-word-wrapper em {
    font-family: PingFangSC-Regular !important;
}
.item-wrapper.teaching-light:hover {
    background-color: rgba(111, 129, 175, 0.1);
}
.item-wrapper.teaching-light:hover .content .title {
    color: #60646f;
}
.item-wrapper.teaching-light .content .title em {
    color: #eb5d46;
}
.item-wrapper.teaching-light .content .key-word-wrapper em {
    color: #eb5d46;
}
.item-wrapper.teaching-black:hover {
    background-color: rgba(255, 255, 255, 0.04);
}
.item-wrapper.teaching-black:hover .content .title {
    color: #fff;
}
.item-wrapper.teaching-black .content .title em {
    color: #eb5d46;
}
.item-wrapper.teaching-black .content .key-word-wrapper em {
    color: #eb5d46;
}`;

export default styles;