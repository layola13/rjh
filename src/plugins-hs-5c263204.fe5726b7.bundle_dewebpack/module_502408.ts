const styles = `.search-history-container.init {
            \n width: 854px;
            \n height: 54px;
            \n margin-left: 42px;
            \n margin-top: 16px;
            \n padding-left: 4px;
            \n text-align: left;
            \n
        }\n.search-history-container.init .search-history-title {
        \n font-size: 14px;
        \n color: #33353B;
        \n float: left;
        \n height: 400px;
        \n line-height: 18px;
        \n margin-right: 16px;
        \n padding-top: 2px;
        \n font-weight: bold;
        \n
    }\n.search-history-container.init .search-history-item {
    \n border-radius: 2px;
    \n float: left;
    \n padding: 6px 6px;
    \n font-size: 12px;
    \n color: #33353B;
    \n
}\n.search-history-container.init .search-history-item.selected {
\n border-radius: 2px;
\n color: #396EFE;
\n
}\n.search-history-container.init .search-history-item:hover {
\n color: #396EFE;
\n cursor: pointer;
\n
}\n.search-history-container.init .search-history-item .neighborName, \n.search-history-container.init .search-history-item .city {
\n display: inline-block;
\n padding: 0 4px;
\n
}\n.search-history-container.result {
\n text-align: left;
\n position: absolute;
\n width: 300px;
\n top: 64px;
\n left: 140px;
\n background: #FFFFFF;
\n box-shadow: 0px 2px 16px 0px rgba(144, 149, 163, 0.3);
\n z-index: 222222;
\n box-sizing: border-box;
\n font-size: 12px;
\n color: #33353B;
\n padding-bottom: 6px;
\n border-radius: 10px;
\n
}\n.search-history-container.result .search-history-title {
\n padding: 12px 0 0 15px;
\n display: block;
\n height: 22px;
\n color: #33353B;
\n font-size: 14px;
\n font-weight: bold;
\n
}\n.search-history-container.result .search-history-item {
\n padding: 10px 12px;
\n display: block;
\n color: #33353B;
\n font-size: 12px;
\n cursor: pointer;
\n border: 1px solid transparent;
\n
}\n.search-history-container.result .search-history-item:hover {
\n background: #F5F5F5;
\n
}\n.search-history-container.result .search-history-item:active {
\n color: #396EFE;
\n
}\n.search-history-container.result .search-history-item .neighborName {
\n padding-left: 10px;
\n color: #33353B;
\n
}\n`;

export default styles;