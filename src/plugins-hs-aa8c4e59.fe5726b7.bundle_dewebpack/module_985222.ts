const cssContent = `.design-style-dialog-wrapper .design-style-dialog-main {
            \n top: 50%;
            \n left: 50%;
            \n position: absolute;
            \n z-index: 3050;
            \n transform: translate(-50%, -50%);
            \n box-sizing: border-box;
            \n width: 500px;
            \n background-color: white;
            \n display: flex;
            \n align-items: center;
            \n justify-content: flex-start;
            \n flex-direction: column;
            \n border-radius: 8px;
            \n flex: auto;
            \n padding: 0 46px 0 54px;
            \n
        }\n.design-style-dialog-wrapper .design-style-dialog-main .design-style-header {
        \n position: relative;
        \n display: flex;
        \n align-items: center;
        \n justify-content: center;
        \n width: 100%;
        \n height: 72px;
        \n flex: none;
        \n
    }\n.design-style-dialog-wrapper .design-style-dialog-main .design-style-header .design-style-title {
    \n font-weight: bold;
    \n color: #19191E;
    \n font-size: 20px;
    \n
}\n.design-style-dialog-wrapper .design-style-dialog-main .design-style-header .design-style-close {
\n position: absolute;
\n right: -20px;
\n top: 28px;
\n cursor: pointer;
\n width: 15px;
\n height: 15px;
\n
}\n.design-style-dialog-wrapper .design-style-dialog-main .design-style-header .design-style-close::before {
\n position: absolute;\n content: '';\n width: 1px;\n left: 7px;\n height: 17px;\n display: inline-block;\n background: #888;\n transform: rotate(45deg);
\n
}\n.design-style-dialog-wrapper .design-style-dialog-main .design-style-header .design-style-close::after {
\n position: absolute;
\n content: '';
\n width: 1px;
\n left: 7px;
\n height: 17px;
\n display: inline-block;
\n background: #888;
\n transform: rotate(-45deg);
\n
}\n.design-style-dialog-wrapper .design-style-dialog-main .design-style-header .design-style-close:hover::before, 
.design-style-dialog-wrapper .design-style-dialog-main .design-style-header .design-style-close:hover::after {
\n background: #327dff;\n
}\n.design-style-dialog-wrapper .design-style-dialog-main .design-style-body {
\n position: relative;\n display: inline-flex;\n align-items: center;\n justify-content: flex-start;\n width: 100%;\n flex-direction: column;\n box-sizing: border-box;\n flex: auto;\n
}\n.design-style-dialog-wrapper .design-style-dialog-main .design-style-body .design-style-items {
\n display: inline-flex;\n align-items: center;\n justify-content: flex-start;\n word-wrap: break-word;\n flex-wrap: wrap;\n
}\n.design-style-dialog-wrapper .design-style-dialog-main .design-style-body .design-style-items .design-style-item {
\n display: inline-flex;\n align-items: center;\n justify-content: center;\n width: 70px;\n height: 28px;\n border-radius: 2px;\n color: black;\n font-size: 12px;\n background-color: #F6F5FB;\n margin-right: 10px;\n margin-top: 10px;\n cursor: pointer;\n
}\n.design-style-dialog-wrapper .design-style-dialog-main .design-style-body .design-style-items .design-style-item:hover {
\n background: rgba(50, 125, 255, 0.1);
\n color: #327DFF;
\n
}\n.design-style-dialog-wrapper .design-style-dialog-main .design-style-body .design-style-items .design-style-item-selected {
\n background: #327DFF;
\n color: #FFFFFF;
\n
}\n.design-style-dialog-wrapper .design-style-dialog-main .design-style-body .design-style-items .design-style-item-selected:hover {
\n background: #327DFF;
\n color: #FFFFFF;
\n
}\n.design-style-dialog-wrapper .design-style-dialog-main .design-style-foot {
\n position: relative;
\n flex: none;
\n flex-direction: row;
\n height: 84px;
\n display: flex;
\n align-items: center;
\n justify-content: center;
\n width: 100%;
\n
}\n.design-style-dialog-wrapper .design-style-dialog-main .design-style-foot .design-style-button {
\n display: inline-flex;
\n justify-content: center;
\n align-items: center;
\n color: #19191e;
\n width: 146px;
\n height: 30px;
\n border-radius: 2px;
\n border: 1px solid #dcdce1;
\n background: #FFFFFF;
\n font-size: 12px;
\n
}\n.design-style-dialog-wrapper .design-style-dialog-main .design-style-foot .design-style-cancel-button:hover {
\n color: #327DFF;
\n border: 1px solid #327DFF;
\n
}\n.design-style-dialog-wrapper .design-style-dialog-main .design-style-foot .design-style-confirm-button {
\n margin-left: 40px;
\n color: #FFFFFF;
\n background: linear-gradient(to right, #327DFF, #4B96FF);
\n border: 1px solid transparent;
\n
}\n.design-style-dialog-wrapper .design-style-dialog-main .design-style-foot .design-style-confirm-button:hover {
\n background: linear-gradient(to right, #1A62E0, #2476E9);
\n
}\n.design-style-dialog-wrapper .design-style-dialog-main .design-style-foot .design-style-disabled-button {
\n color: #808080;
\n background: #ECECF1;
\n outline: none;
\n cursor: not-allowed;
\n
}\n.design-style-dialog-wrapper .design-style-dialog-main .design-style-foot .design-style-disabled-button:hover {
\n background: #ECECF1;
\n
}\n`;

export default cssContent;