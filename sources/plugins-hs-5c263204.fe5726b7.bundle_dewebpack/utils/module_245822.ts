const cssContent = `.all-group {
            \n font-size: 12px;
            \n
        }\n.all-group .header {
        \n display: flex;
        \n line-height: 17px;
        \n border-bottom: 0.5px solid #E8EBF2;
        \n padding-bottom: 10px;
        \n
    }\n.all-group .header .icon {
    \n margin-right: 4px;
    \n
}\n.all-group .item-group {
\n display: flex;
\n flex-direction: column;
\n margin-bottom: 12px;
\n
}\n.all-group .item-group .item-content {
\n padding: 12px 14px;
\n
}\n.all-group .item-group .item-content .radio {
\n box-sizing: border-box !important;
\n
}\n.all-group .item-group .item-content:hover {
\n background: #F5F5F5;
\n
}\n.all-group .fav-item {
\n display: flex;
\n cursor: pointer;
\n height: 34px;
\n margin-bottom: 6px;
\n align-items: center;
\n border-radius: 4px;
\n color: #33353b;
\n padding-left: 4px;
\n
}\n.all-group .fav-item:hover {
\n background-color: #F5F5F5;
\n
}\n.all-group .fav-item.show-input:hover {
\n background-color: transparent;
\n
}\n.all-group .fav-item .hsc-iconfont-view {
\n margin-right: 8px;
\n height: 100%;
\n
}\n.all-group .fav-item .error-tips {
\n position: absolute;
\n bottom: -16px;
\n
}\n.all-group .fav-item .normal-status {
\n width: 100%;
\n height: 100%;
\n display: flex;
\n justify-content: space-between;
\n align-items: center;
\n
}\n.all-group .fav-item .normal-status .text {
\n font-size: 13px;
\n display: block;
\n max-width: 154px;
\n text-overflow: ellipsis;
\n overflow: hidden;
\n white-space: nowrap;
\n margin-right: 8px;
\n width: 100%;
\n
}\n.all-group .fav-item .normal-status .icons {
\n display: block;
\n
}\n.all-group .fav-item .normal-status .icons .hsc-iconfont-view {
\n width: 16px;
\n height: 16px;
\n
}\n.all-group .fav-item .normal-status .icons .edit {
\n display: inline-block;
\n
}\n.all-group .fav-item .normal-status .icons .delete {
\n display: inline-block;
\n
}\n.all-group .fav-item .homestyler-ui-components.homestyler-popover-item::before {
\n content: unset;\n
}\n.favorites-group .favorites-group-title {
\n display: flex;\n align-items: center;\n justify-content: space-between;\n padding-bottom: 16px;\n
}\n.favorites-group .favorites-group-title-label {
\n font-size: 14px;\n font-family: PingFangSC-Semibold;\n font-weight: 600;\n color: #33353B;\n line-height: 16px;\n
}\n.favorites-group .favorites-group-title-create-btn {
\n height: 16px !important;\n line-height: 16px !important;\n min-width: 40px !important;\n transition: unset !important;\n
}\n.favorites-group .favorites-group-title-create-btn .hs-iconfont-view {
\n padding-right: 4px;\n
}\n.favorites-group .favorites-group-title-create-btn .hs-iconfont-view span {
\n font-size: 13px !important;\n padding-top: 2px;\n
}\n.favorites-group .favorites-group-title-create-btn:hover .hs-iconfont-view span, 
.favorites-group .favorites-group-title-create-btn:focus .hs-iconfont-view span {
\n color: #007aff !important;\n
}\n.homestyler-ui-components.homestyler-popover-item.create-group-input {
\n border-radius: 8px;\n z-index: 2001;\n
}\n.homestyler-ui-components.homestyler-popover-item.create-group-input .homestyler-popover-content {
\n padding: 12px;\n
}`;

export default cssContent;