const cssContent = `.bom-filter-container {
            \n width: 820px;
            \n margin-left: 10px;
            \n
        }\n.bom-filter-container-model {
        \n height: 94px;
        \n padding: 20px 18px;
        \n width: 100%;
        \n background: #FFFFFF;
        \n border-radius: 5px;
        \n box-shadow: 0px 2px 50px 0px rgba(0, 0, 0, 0.04);
        \n margin-bottom: 10px;
        \n
    }\n.bom-filter-container-model-content {
    \n padding-top: 9px;
    \n display: grid;
    \n grid-template-columns: 20% 20% 20% 20% 20%;
    \n margin-left: -4px;
    \n
}\n.bom-filter-container-category {
\n height: 278px;
\n padding: 20px 18px;
\n width: 100%;
\n background: #FFFFFF;
\n border-radius: 5px;
\n box-shadow: 0px 2px 50px 0px rgba(0, 0, 0, 0.04);
\n margin-bottom: 10px;
\n
}\n.bom-filter-container-category-content-level1 {
\n font-size: 14px;
\n font-weight: bold;
\n margin: 13px 0 13px 0;
\n
}\n.bom-filter-container-category-content-level1 .check-box-container {
\n display: block !important;
\n
}\n.bom-filter-container-category-content-level1 .homestyler-ui-components.check-box-container > .check-box + span {
\n font-size: 13px;
\n
}\n.bom-filter-container-category-content-level2 {
\n font-size: 12px;
\n display: grid;
\n margin: 13px 0 13px 25px;
\n grid-template-columns: 20% 20% 20% 20% 20%;
\n
}\n.bom-filter-container-title {
\n display: flex;
\n justify-content: space-between;
\n align-items: center;
\n
}\n.bom-filter-container-title-text {
\n font-weight: bold;
\n font-size: 14px;
\n
}\n.bom-filter-container .tile-plan-model-numbers {
\n background-color: #fff;
\n padding: 20px 18px;
\n
}\n.bom-modal-footer {
\n margin-top: 20px;
\n text-align: end;
\n
}\n.bom-modal-footer button:first-child {
\n margin-right: 16px;
\n
}\n.bom-modal-footer button {
\n font-weight: 600;
\n
}\n.bom-modal-footer .bom-exclusive-tag {
\n display: flex;
\n align-items: center;
\n justify-content: center;
\n position: absolute;
\n line-height: 18px;
\n font-size: 12px;
\n right: 41px;
\n bottom: 54px;
\n height: 18px;
\n border-top-left-radius: 9px;
\n border-top-right-radius: 2px;
\n border-bottom-right-radius: 9px;
\n border-bottom-left-radius: 2px;
\n background-image: linear-gradient(to right, #0b51ff, #e318b4);
\n color: white;
\n cursor: pointer;
\n padding: 0px 8px;
\n
}\n.bom-modal-footer .bom-exclusive-tag .hs-iconfont-view {
\n margin-right: 2px;
\n
}\n.bom-filter-box .homestyler-modal-outer {
\n width: auto;
\n
}\n.bom-filter-box .homestyler-modal-content-wrapper-content {
\n background-color: #d8d8d8;
\n padding: 22px 0 !important;
\n
}\n.bom-filter-box .homestyler-modal-bottom-container {
\n display: none !important;
\n
}\n.bom-filter-box .ant-btn-default, 
.bom-filter-box .ant-btn-primary {
\n width: 146px !important;
\n height: 42px !important;
\n font-size: 16px !important;
\n
}\n.bom-filter-box .homestyler-modal-title {
\n font-size: 22px !important;
\n
}\n.bom-tooltip-icon {
\n display: inline-block;
\n margin-left: 5px;
\n margin-top: 1px;
\n
}\n.marketing-badge-bom {
\n display: flex;
\n justify-content: space-between;
\n align-items: center;
\n width: 235px;
\n height: 30px;
\n margin-bottom: 8px;
\n border-radius: 15px;
\n background-image: linear-gradient(to right, #0b51ff, #e318b4);
\n
}\n.marketing-badge-bom .left .icon {
\n display: inline-block;
\n margin-left: 8px;
\n
}\n.marketing-badge-bom .left .text {
\n position: relative;
\n top: -3px;
\n left: 2px;
\n font-weight: 600;
\n color: white;
\n
}\n.marketing-badge-bom .right {
\n margin-right: 8px;
\n
}\n.marketing-badge-bom .right .upgrade {
\n height: 22px;
\n line-height: 22px;
\n min-width: 72px;
\n text-align: center;
\n background: white;
\n border-radius: 11px;
\n color: #C633BF;
\n cursor: pointer;
\n
}\n.bom-tooltip-popover .hs-popover-context {
\n background: rgba(0, 0, 0, 0.9);
\n
}\n.bom-tooltip-popover .hs-popover-caret {
\n border-bottom: 5px solid rgba(0, 0, 0, 0.8);
\n
}\n.bom-tooltip-popover .tool-info-icon-text {
\n font-size: 12px;
\n margin-top: 8px;
\n font-family: PingFangSC-Light !important;
\n color: #FFFFFF;
\n
}\n.models-count {
\n font-family: PingFangSC-Regular;
\n font-weight: normal;
\n color: #60646F;
\n font-size: 14px;
\n margin-left: 4px;
\n
}\n.global-en .bom-modal-footer .bom-exclusive-tag {
\n background-image: linear-gradient(to right, #FEDE9D, #81ADFF);
\n color: black;
\n
}\n.global-en .marketing-badge-bom {
\n background-image: linear-gradient(128deg, #FEDE9D 0%, #FFDCAE 33%, #81ADFF 100%);
\n
}\n.global-en .marketing-badge-bom .left .text {
\n color: black;
\n
}\n.global-en .marketing-badge-bom .right .upgrade {
\n background: #000;
\n color: #FFFFFF;
\n
}\n.tile-plan-model-numbers-icon {
\n vertical-align: sub;
\n
}\n`;

export default cssContent;