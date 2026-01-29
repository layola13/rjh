const cssContent = `.hs-design-info {
            \n display: inline-block;
            \n position: relative;
            \n height: 100%;
            \n
        }\n.hs-design-info .designinfo {
        \n height: 100%;
        \n float: left;
        \n position: relative;
        \n height: 24px;
        \n padding: 13px 0;
        \n margin-left: 8px;
        \n
    }\n.hs-design-info .designinfo .menu {
    \n max-width: 170px;
    \n height: 24px;
    \n text-decoration: none;
    \n font-size: 12px;
    \n padding: 0;
    \n display: inline-flex;
    \n align-items: center;
    \n justify-content: flex-start;
    \n cursor: pointer;
    \n position: relative;
    \n border-radius: 24px;
    \n padding: 0 8px;
    \n
}\n.hs-design-info .designinfo .menu .hs-iconfont-view {
\n display: inline-flex;
\n
}\n.hs-design-info .designinfo .menu.hoverMenu {
\n background: rgba(255, 255, 255, 0.9);
\n color: #396efe;
\n
}\n.hs-design-info .designinfo .menu.hoverMenu ul {
\n display: block;
\n
}\n.hs-design-info .designinfo .menu:hover {
\n background: rgba(255, 255, 255, 0.9);
\n
}\n.hs-design-info .designinfo .menu .design-name {
\n max-width: 89px;
\n display: inline-block;
\n padding: 0px 5px;
\n overflow: hidden;
\n text-overflow: ellipsis;
\n white-space: nowrap;
\n vertical-align: middle;
\n min-width: 20px;
\n
}\n.hs-design-info .designinfo:hover .menu {
\n background: rgba(255, 255, 255, 0.9);
\n
}\n.hs-design-info .designinfo .menus {
\n left: 0px;
\n top: 45px;
\n display: none;
\n float: none;
\n width: 220px;
\n height: auto;
\n position: absolute;
\n border: 1px solid #d9dbdf;
\n background: #ffffff;
\n box-shadow: 0px 4px 16px 0px rgba(25, 25, 50, 0.15);
\n border-radius: 10px;
\n
}\n.hs-design-info .designinfo .menus.ul-content {
\n display: block;
\n
}\n.hs-design-info .designinfo .menus .design-name-input {
\n border: 1px solid #eaecf1;
\n color: #33353b;
\n float: none;
\n white-space: nowrap;
\n text-overflow: ellipsis;
\n width: 159px;
\n box-sizing: border-box;
\n height: 24px;
\n border-radius: 4px;
\n font-size: 12px;
\n line-height: 24px;
\n margin: 14px 8px 14px 12px;
\n padding: 0px 7px;
\n display: inline-flex;
\n
}\n.hs-design-info .designinfo .menus .design-name-input:hover {
\n background-color: #e8e8e8;
\n
}\n.hs-design-info .designinfo .menus .design-name-input:focus {
\n background: rgba(50, 125, 255, 0.1);
\n border: 1px solid #327dff;
\n
}\n.hs-design-info .designinfo .menus .design-name-input.design-name-error {
\n border: 1px solid #eb5d46;
\n background: white;
\n
}\n.hs-design-info .designinfo .menus .design-name-input.design-name-error:focus {
\n border: 1px solid #eb5d46;
\n background: white;
\n
}\n.hs-design-info .designinfo .menus .design-name-input::-webkit-input-placeholder {
\n color: #cdcfd5;
\n
}\n.hs-design-info .designinfo .menus .design-name-input::-moz-placeholder {
\n /* Firefox 18- */\n color: #cdcfd5;
\n
}\n.hs-design-info .designinfo .menus .design-name-input::-moz-placeholder {
\n /* Firefox 19+ */\n color: #cdcfd5;
\n
}\n.hs-design-info .designinfo .menus .design-name-input::-ms-input-placeholder {
\n color: #cdcfd5;
\n
}\n.hs-design-info .designinfo .menus .design-name-limit {
\n position: absolute;
\n right: 6px;
\n display: inline-block;
\n margin-top: 7px;
\n padding-top: 6px;
\n width: 50px;
\n text-align: right;
\n height: 12px;
\n font-size: 12px;
\n color: #19191e;
\n line-height: 12px;
\n top: 6px;
\n white-space: nowrap;
\n
}\n.hs-design-info .designinfo .menus .design-name-limit.design-name-limit-error {
\n color: #eb5d46;
\n
}\n.hs-design-info .designinfo .menus .design-name-error-message {
\n color: #eb5d46;
\n font-size: 12px;
\n font-family: PingFangSC-Light;
\n line-height: 20px;
\n margin-left: 10px;
\n
}\n.hs-design-info .designinfo .menus .designinfo-menu-items {
\n position: relative;
\n padding: 0px 0px;
\n margin-bottom: 4px;
\n
}\n.hs-design-info .designinfo .menus .designinfo-menu-items::after {
\n position: absolute;
\n top: 0;
\n left: 10px;
\n right: 10px;
\n content: '';
\n border-top: 1px solid #eaecf1;
\n
}\n.hs-design-info .designinfo .menus .designinfo-menu-items > * {
\n margin-bottom: 6px;
\n
}\n.hs-design-info .designinfo .menus .designinfo-menu-items > *:last-child {
\n margin-bottom: 0;
\n
}\n.hs-design-info .designinfo .menus .designinfo-menu-items .designinfo-menu-item {
\n position: relative;
\n color: #33353B;
\n font-size: 12px;
\n box-sizing: border-box;
\n min-height: 36px;
\n padding: 8px 0 8px 12px;
\n display: flex;
\n align-items: center;
\n cursor: pointer;
\n
}\n.hs-design-info .designinfo .menus .designinfo-menu-items .designinfo-menu-item:hover {
\n background: #F5F5F5;
\n
}\n.hs-design-info .designinfo .menus .designinfo-menu-items .designinfo-menu-item .hotkey {
\n position: absolute;
\n right: 11px;
\n display: inline-flex;
\n margin-left: 8px;
\n color: #33353b;
\n
}\n.hs-design-info .designinfo .menus li:hover {
\n background: #38a0ef;
\n color: #fff;
\n
}\n.hs-design-info .designinfo .menus.disable li:hover {
\n background: #fafafa;
\n color: #b4b4b9;
\n
}`;

export default cssContent;