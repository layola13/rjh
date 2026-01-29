const styles = `#fpcollection-search-result-container {
    text-align: left;
    position: absolute;
    width: 500px;
    top: 63px;
    left: 140px;
    background: #FFFFFF;
    border: 1px solid #E3E3E3;
    box-shadow: 0 2px 4px 0 rgba(180, 180, 185, 0.2);
    box-sizing: border-box;
    font-size: 14px;
    color: #808080;
    border-radius: 8px;
    white-space: nowrap;
    overflow-x: hidden;
    z-index: 1;
}
#fpcollection-search-result-container.show {
    display: block;
}
#fpcollection-search-result-container.hide {
    display: none;
}
#fpcollection-search-result-container .search-result-item {
    padding: 6px 12px 0 15px;
    height: 22px;
    cursor: pointer;
    border: 1px solid transparent;
    white-space: nowrap;
    overflow-x: hidden;
}
#fpcollection-search-result-container .search-result-item:first-of-type {
    padding-top: 12px;
    border-radius: 8px 8px 0 0;
}
#fpcollection-search-result-container .search-result-item:last-of-type {
    padding-bottom: 6px;
    border-radius: 0 0 8px 8px;
}
#fpcollection-search-result-container .search-result-item:hover {
    font-weight: bold;
    background-color: #F5F5F5;
}
#fpcollection-search-result-container .search-result-item .search-result-item-tooltip {
    display: flex;
    font-size: 12px;
}
#fpcollection-search-result-container .search-result-item .city {
    max-width: 77px;
    padding-right: 12px;
    font-size: 12px;
    color: #808080;
}
#fpcollection-search-result-container .search-result-item .neighborNameWrapper {
    width: 319px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
#fpcollection-search-result-container .search-result-item .neighborNameWrapper .neighborName {
    color: #33353B;
    font-size: 12px;
}
#fpcollection-search-result-container .search-result-item .neighborNameWrapper .communityName {
    margin-left: 12px;
    color: #808080;
}
#fpcollection-search-result-container .search-result-item .totalCount {
    padding-left: 27px;
    right: 12px;
    position: absolute;
    width: 75px;
    text-align: right;
    font-size: 12px;
    color: #33353B;
}
.homestyler-ui-components.homestyler-popover-item.search-result-tooltip-wrapper {
    z-index: 3004;
}`;

export default styles;