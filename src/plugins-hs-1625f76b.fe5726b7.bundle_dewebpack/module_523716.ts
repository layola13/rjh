const cssContent = `.cameraUI {
            \n position: absolute;
            \n top: 0;
            \n left: 0;
            \n
        }\n.cameraUI .sideMask1, \n.cameraUI .sideMask2 {
        \n position: absolute;
        \n background: rgba(0, 0, 0, 0.2);
        \n
    }\n.cameraUI .midMask .line {
    \n background: #297bb7;
    \n position: absolute;
    \n
}\n.cameraUI .midMask .closeBtn {
\n position: absolute;
\n background: #297bb7;
\n color: white;
\n cursor: pointer;
\n padding: 12px 15px;
\n
}\n.cameraUI .sizeText {
\n display: block;
\n position: absolute;
\n width: 300px;
\n text-align: center;
\n height: 30px;
\n line-height: 30px;
\n font-size: 30px;
\n
}\n.cameraUI .typeHint {
\n position: absolute;
\n width: 32px;
\n height: 32px;
\n left: 8px;
\n top: 8px;
\n
}\n.cameraUI.vertical .sideMask1 {
\n border-bottom: solid #297bb7;
\n
}\n.cameraUI.vertical .sideMask2 {
\n border-top: solid #297bb7;
\n
}\n.cameraUI.horizon .sideMask1 {
\n border-right: solid #297bb7;
\n
}\n.cameraUI.horizon .sideMask2 {
\n border-left: solid #297bb7;
\n
}\n.cameraUI .mask {
\n background: rgba(0, 0, 0, 0.2);
\n
}\n.cameraUI .dashboardBtnMask {
\n background: #297bb7;
\n position: absolute;
\n z-index: 100;
\n
}\n.cameraUI .canvasScreenShot {
\n content: "";
\n position: absolute;
\n width: 100%;
\n height: 100%;
\n left: 0;
\n top: 0;
\n
}\n`;

export default cssContent;