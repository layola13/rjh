// @ts-nocheck
const CSS_CONTENT = `.dialogue {
            \n width: 100%;
            \n padding: 0px 8px;
            \n word-wrap: break-word;
            \n white-space: pre-wrap;
            \n
        }\n.dialogue .time-content {
        \n font-size: 11px;
        \n font-family: AlibabaPuHuiTi_2_55_Regular;
        \n color: rgba(28, 28, 28, 0.4);
        \n text-align: center;
        \n padding: 2px 0px 8px;
        \n
    }\n.dialogue .time-content:first-child {
    \n padding: 10px 0px 8px;
    \n
}\n.dialogue .person-detail {
\n width: 18px;
\n height: 18px;
\n border-radius: 18px;
\n
}\n.dialogue .person-detail .name {
\n font-size: 11px;
\n font-family: AlibabaPuHuiTi_2_55_Regular;
\n color: #888888;
\n
}\n.dialogue .person-detail .avatar {
\n width: 100%;
\n height: 100%;
\n border-radius: 18px;
\n
}\n.dialogue .person-detail .arrow {
\n position: absolute;
\n -o-object-fit: scale-down;
\n object-fit: scale-down;
\n
}\n.dialogue .main-content {
\n max-width: 186px;
\n min-width: 64px;
\n padding: 8px;
\n margin-bottom: 14px;
\n border-radius: 6px;
\n color: #33353B;
\n background: #F4F5F9;
\n
}\n.dialogue .main-content .content-cursor {
\n width: 0px;
\n height: 0px;
\n display: none;
\n
}\n.dialogue .main-content .content {
\n word-break: break-word;
\n
}\n.dialogue .main-content .content div {
\n color: #33353B;
\n line-height: 16px;
\n
}\n.dialogue .main-content .content div:not :first-child {
\n margin-bottom: 8px;
\n
}\n.dialogue .main-content .content ul {
\n padding: 0px 10px;
\n
}\n.dialogue .main-content .content li {
\n line-height: 20px;
\n cursor: pointer;
\n
}\n.dialogue .main-content .content li::marker {
\n content: "* ";
\n
}\n.dialogue .main-content .content li:first-child {
\n margin-top: 4px;
\n
}\n.dialogue .main-content .content a {
\n color: #396EFE;
\n text-decoration: underline;
\n
}\n.dialogue .main-content .selection-content {
\n margin-top: 6px;
\n
}\n.dialogue .main-content .selection-content .checkbox-item .ant-checkbox-wrapper span {
\n font-size: 12px;
\n color: #33353B;
\n font-weight: 600;
\n
}\n.dialogue .main-content .selection-content .checkbox-item .ant-checkbox-inner {
\n width: 12px;
\n height: 12px;
\n background: #FFFFFF;
\n border: 1px solid #d4d7e1;
\n
}\n.dialogue .main-content .selection-content .checkbox-item .ant-checkbox-checked .ant-checkbox-inner {
\n background-color: #396EFE;
\n border-color: #396EFE;
\n
}\n.dialogue .main-content .selection-content .radio-item {
\n margin-top: 8px;
\n
}\n.dialogue .main-content .selection-content .radio-item .radio-container span {
\n font-size: 12px;
\n color: #33353B;
\n font-weight: 600;
\n
}\n.dialogue .main-content .selection-content a {
\n color: #396EFE;
\n text-decoration: underline;
\n font-size: 12px;
\n
}\n.dialogue .main-content .loading-bar {
\n display: flex;
\n width: 20px;
\n height: 8px;
\n align-items: center;
\n margin: 1px 0px 1px 0px;
\n
}\n.dialogue .main-content .loading-bar .loading {
\n height: 4px;
\n width: 4px;
\n opacity: 0.5;
\n border-radius: 2px;
\n background: #396EFE;
\n margin-right: 4px;
\n
}\n.dialogue .main-content .loading-bar .loading:last-child {
\n margin-right: 0px;
\n
}\n.dialogue .main-content .loading-bar .loading:nth-child(1) {
\n animation: loading-pulse 1s infinite;
\n
}\n.dialogue .main-content .loading-bar .loading:nth-child(2) {
\n animation: loading-pulse 1s infinite 0.333s;
\n
}\n.dialogue .main-content .loading-bar .loading:nth-child(3) {
\n animation: loading-pulse 1s infinite 0.6667s;
\n
}\n@keyframes loading-pulse {
\n 0% {
    \n height: 4px;
    \n opacity: 0.5;
    \n
}\n 25% {
\n height: 4px;
\n opacity: 1;
\n
}\n 50% {
\n height: 8px;
\n opacity: 1;
\n
}\n 75% {
\n height: 4px;
\n opacity: 1;
\n
}\n 100% {
\n height: 4px;
\n opacity: 0.5;
\n
}\n
}\n.dialogue .main-content .message-actions {
\n margin-top: 2px;
\n text-align: right;
\n
}\n.dialogue .main-content .message-actions .action-item {
\n display: inline-block;
\n margin-left: 5px;
\n width: 18px;
\n height: 18px;
\n padding: 3px;
\n border-radius: 4px;
\n
}\n.dialogue .main-content .message-actions .action-item:hover {
\n background: #FFFFFF;
\n
}\n.dialogue .main-content .message-actions .action-item-click {
\n background: #FFFFFF;
\n
}\n.host {
\n display: flex;
\n align-items: flex-start;
\n
}\n.host .main-content {
\n position: relative;
\n margin-left: 4px;
\n width: -moz-fit-content;
\n width: fit-content;
\n background: #EBEDF3;
\n border-radius: 0px 6px 6px 6px;
\n
}\n.host .main-content .content-area .content {
\n font-size: 12px;
\n -webkit-user-select: text;
\n -moz-user-select: text;
\n user-select: text;
\n font-family: AlibabaPuHuiTi_2_55_Regular;
\n color: #1C1C1C;
\n line-height: 14px;
\n
}\n.host .main-content .content-area .close-btn {
\n position: absolute;
\n top: 7px;
\n right: 7px;
\n width: 18px;
\n height: 18px;
\n border-radius: 50%;
\n padding: 4px;
\n color: #33353B;
\n font-size: 12px;
\n display: flex;
\n justify-content: center;
\n align-items: center;
\n margin-top: -6px;
\n margin-right: -6px;
\n cursor: pointer;
\n
}\n.host .main-content .content-area .close-btn:hover {
\n background-color: rgba(0, 0, 0, 0.04);
\n
}\n.host .main-content .content-area .close-btn:active .close-welcome {
\n color: #327DFF;
\n background-color: rgba(0, 0, 0, 0.04);
\n
}\n.host .main-content .content-area .close-btn-disabled-cursor {
\n cursor: not-allowed;
\n opacity: 0.6;
\n
}\n.host .main-content .content-area .close-btn-disabled-event {
\n pointer-events: none;
\n
}\n.host .main-content .content-selection-area {
\n display: flex;
\n width: 100%;
\n margin-top: 10px;
\n flex-direction: row;
\n flex-wrap: wrap;
\n align-items: center;
\n row-gap: 5px;
\n -moz-column-gap: 5px;
\n column-gap: 5px;
\n
}\n.host .main-content .content-selection-area button {
\n flex-grow: 1;
\n min-width: 47%;
\n height: 26px;
\n line-height: 100%;
\n font-size: 12px;
\n font-family: AlibabaPuHuiTi_2_55_Regular;
\n background-color: white;
\n color: #33353B;
\n
}\n.host .main-content .content-selection-area button:hover {
\n background-color: #396EFE;
\n color: #FFFFFF;
\n
}\n.host .main-content .content-selection-area button:disabled {
\n background-color: #ccc;
\n color: #666;
\n cursor: not-allowed;
\n opacity: 0.6;
\n
}\n.host .main-content .content-selection-area .first-button {
\n color: #396EFE;
\n
}\n.host .main-content .content-multi-selection-area {
\n display: flex;
\n width: 100%;
\n margin-top: 10px;
\n flex-direction: column;
\n align-items: center;
\n row-gap: 5px;
\n -moz-column-gap: 5px;
\n column-gap: 5px;
\n
}\n.host .main-content .content-multi-selection-area button {
\n width: 100%;
\n height: 26px;
\n line-height: 100%;
\n font-size: 12px;
\n font-family: AlibabaPuHuiTi_2_55_Regular;
\n background-color: white;
\n color: #33353B;
\n
}\n.host .main-content .content-multi-selection-area button:hover {
\n background-color: #396EFE;
\n color: #FFFFFF;
\n
}\n.host .main-content .content-multi-selection-area button:disabled {
\n background-color: #ccc;
\n color: #666;
\n cursor: not-allowed;
\n opacity: 0.6;
\n
}\n.host .main-content .content-multi-selection-area .first-button {
\n color: #396EFE;
\n
}\n.host .main-content .content-check-area {
\n display: flex;
\n width: 100%;
\n margin-top: 10px;
\n padding: 5px;
\n flex-direction: row;
\n align-items: center;
\n justify-content: space-evenly;
\n
}\n.host .main-content .content-check-area button {
\n min-width: 80px;
\n height: 26px;
\n line-height: 100%;
\n margin-left: 5px;
\n font-size: 12px;
\n font-family: AlibabaPuHuiTi_2_55_Regular;
\n background-color: white;
\n
}\n.host .main-content .content-check-area button:hover {
\n background-color: #396EFE;
\n
}\n.host .main-content .content-check-area .confirm-button {
\n color: #396EFE;
\n
}\n.host .main-content .content-check-area .cancel-button {
\n color: #33353B;
\n
}\n.host .main-content .content-area-isLoading .content {
\n color: #AAB5D2;
\n padding-right: 0px;
\n
}\n.host .person-detail .arrow {
\n left: 26px;
\n
}\n.host .person-detail .name {
\n margin-left: 4px;
\n /* 设置每个点不同的延迟，为了让动画效果呈现连续 */\n
}\n@keyframes blink {
\n 0%, \n 100% {
    \n opacity: 0;
    \n
}\n 50% {
\n opacity: 1;
\n
}\n
}\n.host .person-detail .name .dots {
\n display: inline-block;
\n margin-right: 5px;
\n font-size: 24px;
\n opacity: 0;
\n animation: blink 1s infinite;
\n /* 持续时间1秒，无限次数 */\n
}\n.host .person-detail .name .dots:nth-child(1) {
\n animation-delay: 0s;
\n
}\n.host .person-detail .name .dots:nth-child(2) {
\n animation-delay: 0.3s;
\n
}\n.host .person-detail .name .dots:nth-child(3) {
\n animation-delay: 0.6s;
\n
}\n.host .loading-stop {
\n margin-left: 4px;
\n margin-top: 5px;
\n padding: 0px 8px;
\n border: 1px solid #dfdfdf;
\n color: #656565;
\n font-size: 12px;
\n background: #FFFFFF;
\n border-radius: 4px;
\n line-height: 18px;
\n cursor: pointer;
\n
}\n.host .loading-stop:hover {
\n background: #F4F4F4;
\n border: unset;
\n padding: 1px 9px;
\n
}\n.host .exist-selection {
\n width: 100%;
\n
}\n.host .exist-action {
\n padding-bottom: 4px;
\n
}\n.guest {
\n display: flex;
\n flex-direction: row-reverse;
\n align-items: flex-start;
\n
}\n.guest .main-content {
\n margin-right: 4px;
\n background: #E6EDFF;
\n border-radius: 6px;
\n border-radius: 6px 0px 6px 6px;
\n
}\n.guest .main-content .content {
\n line-height: 14px;
\n font-size: 12px;
\n -webkit-user-select: text;
\n -moz-user-select: text;
\n user-select: text;
\n font-family: PingFangSC-Regular;
\n color: #33353B;
\n
}\n.guest .person-detail .arrow {
\n right: 26px;
\n
}\n.guest .person-detail .name {
\n margin-right: 4px;
\n
}\n`;

interface CSSModule {
  id: string;
}

interface CSSLoaderFunction {
  (sourceMap: boolean): {
    push: (entry: [string, string]) => void;
  };
}

export default function cssModuleExport(
  module: CSSModule,
  _exports: unknown,
  cssLoaderRequire: CSSLoaderFunction
): void {
  const cssLoader = cssLoaderRequire(986380);
  const result = cssLoader(false);
  result.push([module.id, CSS_CONTENT]);
}