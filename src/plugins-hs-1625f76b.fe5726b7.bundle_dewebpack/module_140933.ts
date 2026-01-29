const cssContent = `.template-recommend-model-page {
            \n display: flex;
            \n flex-direction: column;
            \n width: 280px;
            \n height: 100%;
            \n
        }\n.template-recommend-model-page .back {
        \n display: flex;
        \n align-items: center;
        \n height: 40px;
        \n margin: 10px 0 0 18px;
        \n
    }\n.template-recommend-model-page .back .back-tip {
    \n margin-left: 8px;
    \n font-size: 16px;
    \n font-family: AlibabaPuHuiTi-Bold !important;
    \n
}\n.template-recommend-model-page .description {
\n padding-right: 15px;
\n font-size: 12px;
\n line-height: 16px;
\n margin-bottom: 6px;
\n margin-left: 18px;
\n
}\n.template-recommend-model-page .color-bar {
\n padding-right: 15px;
\n margin-left: 18px;
\n margin-bottom: 7px;
\n cursor: pointer;
\n
}\n.template-recommend-model-page .color-bar .color-item {
\n position: relative;
\n display: inline-block;
\n width: 27px;
\n height: 27px;
\n
}\n.template-recommend-model-page .color-bar .color-item:first-child {
\n border-radius: 4px 0 0 4px;
\n
}\n.template-recommend-model-page .color-bar .color-item:last-child {
\n border-radius: 0 4px 4px 0;
\n
}\n.template-recommend-model-page .color-bar .color-item.all-color {
\n background-image: url(IMAGE_URL_PLACEHOLDER);
\n background-repeat: no-repeat;
\n background-size: 100% 100%;
\n
}\n.template-recommend-model-page .color-bar .color-item:hover {
\n outline: 1px solid #EFF1F3;
\n border-radius: 4px;
\n z-index: 1;
\n
}\n.template-recommend-model-page .color-bar .color-item.active {
\n z-index: 1;
\n outline: 2px solid #396EFE;
\n border-radius: 4px;
\n box-shadow: 0px 0px 0px 1px #EFF1F3 inset;
\n
}\n.template-recommend-model-page .product-list {
\n display: flex;
\n flex: 1;
\n flex-wrap: wrap;
\n flex-shrink: 0;
\n height: 0;
\n margin-left: 18px;
\n align-content: flex-start;
\n
}\n.template-recommend-model-page .loading {
\n display: block;
\n text-align: center;
\n background: transparent;
\n position: absolute;
\n top: calc(50% - 40px);
\n left: calc(50% - 40px / 2);
\n width: 40px;
\n height: 40px;
\n
}\n.template-recommend-model-page .loading img {
\n width: inherit;
\n height: inherit;
\n
}\n.template-recommend-model-page .no-result {
\n position: absolute;
\n top: 50%;
\n left: 50%;
\n transform: translate(-50%, -50%);
\n text-align: center;
\n
}\n.template-recommend-model-page .no-result .image {
\n margin-bottom: 5px;
\n
}`;

export default cssContent;