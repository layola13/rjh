const styles = `.popupWindowOuter {
            \n margin: 0;
            \n padding: 0;
            \n border: 0;
            \n font-size: 100%;
            \n font: inherit;
            \n vertical-align: baseline;
            \n font-family: 'Frutiger Next LT W1G', Calibri, Arial, Helvetica, sans-serif !important;
            \n outline: 0;
            \n box-sizing: content-box;
            \n
        }\n.popupWindowOuter .popupwindows {
        \n box-shadow: 0px 6px 11.83px 1.17px rgba(74, 77, 83, 0.41);
        \n border-radius: 4px;
        \n
    }\n.popupWindowOuter .popupwindows .windowWrapper, \n.popupWindowOuter .popupwindows .windowHeader, \n.popupWindowOuter .popupwindows .title {
    \n border-top-left-radius: 4px;
    \n border-top-right-radius: 4px;
    \n
}\n.popupWindowOuter .popupwindows .windowHeader .popupwindow-close-btn {
\n position: absolute;
\n top: 50%;
\n right: 30px;
\n transform: translateY(-50%);
\n
}\n.popupWindowOuter .popupwindows .windowContents {
\n width: 100%;
\n background-color: #f7f7f7;
\n color: #a7a7a7;
\n font-size: 15px;
\n overflow: hidden;
\n padding-bottom: 30px;
\n border-bottom-right-radius: 4px;
\n border-bottom-left-radius: 4px;
\n
}\n.popupWindowOuter .popupwindows .windowContents .contentsWrapper {
\n width: 100%;
\n height: 100%;
\n padding: 0px 0px 0;
\n text-align: center;
\n
}\n.ui-upgrade-popwindow.popupWindowOuter .popupwindows {
\n border-radius: 8px;
\n padding-top: 10px;
\n
}\n.ui-upgrade-popwindow.popupWindowOuter .popupwindows .windowWrapper {
\n padding-bottom: 30px;
\n border-radius: 8px;
\n
}\n.ui-upgrade-popwindow.popupWindowOuter .popupwindows .windowWrapper .windowHeader {
\n border-bottom: none;
\n padding: 0 30px;
\n height: 60px;
\n
}\n.ui-upgrade-popwindow.popupWindowOuter .popupwindows .windowWrapper .windowHeader h2.title {
\n color: #33353B;
\n font-weight: bold;
\n font-size: 20px;
\n width: auto;
\n height: 60px;
\n line-height: 60px;
\n
}\n.ui-upgrade-popwindow.popupWindowOuter .popupwindows .windowWrapper .windowHeader span.closeBtn {
\n top: 50%;
\n height: auto;
\n width: auto;
\n right: 30px;
\n margin-top: 0;
\n
}\n.ui-upgrade-popwindow.popupWindowOuter .popupwindows .windowWrapper .windowContents {
\n background-color: #fff;
\n box-sizing: border-box;
\n padding: 0 30px;
\n float: none;
\n height: calc(100% - 60px);
\n
}\n.ui-upgrade-popwindow.popupWindowOuter .popupwindows .windowWrapper .windowContents .contentsWrapper {
\n text-align: initial;
\n
}\n`;

export default styles;