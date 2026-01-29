const styles = `.task_wrapper_container {
            \n position: fixed;
            \n z-index: 9999;
            \n height: 40px;
            \n line-height: 40px;
            \n display: flex;
            \n
        }\n.task_wrapper_container .content_wrapper {
        \n padding: 0px 10px 0px 10px;
        \n
    }\n.task_wrapper_container .content_wrapper > span {
    \n color: #FFF;
    \n font-weight: 600;
    \n font-size: 14px;
    \n
}\n.task_wrapper_container .img_wrapper {
\n padding-right: 13px;
\n display: flex;
\n align-items: center;
\n width: 14px;
\n
}\n.task_wrapper_container .task_wrapper_inside {
\n position: fixed;
\n display: flex;
\n background: #396EFE;
\n border-radius: 8px;
\n
}\n.task_wrapper_container .task_arrow > svg {
\n color: rgba(255, 255, 255, 0.6);
\n
}\n.task_tip_left_arrow::after {
\n content: "";
\n position: absolute;
\n width: 0px;
\n height: 0px;
\n left: -5px;
\n top: 50%;
\n transform: translateY(-50%);
\n border-top: 10px solid transparent;
\n border-right: 10px solid #396EFE;
\n border-bottom: 10px solid transparent;
\n
}\n.task_tip_right_arrow::after {
\n content: "";
\n position: absolute;
\n width: 0px;
\n height: 0px;
\n left: 100%;
\n top: 20px;
\n transform: translateY(-50%) translateX(-5px);
\n border-top: 10px solid transparent ;
\n border-left: 10px solid #396EFE;
\n border-bottom: 10px solid transparent;
\n
}\n.task_tip_top_arrow::after {
\n content: "";
\n position: absolute;
\n width: 0px;
\n height: 0px;
\n left: 50%;
\n top: -5px;
\n transform: translateX(-50%);
\n border-bottom: 10px solid #396EFE;
\n border-left: 10px solid transparent;
\n border-right: 10px solid transparent;
\n
}\n.task_tip_bottom_arrow::before {
\n content: "";\n position: absolute;\n width: 0px;\n height: 0px;\n left: 50%;\n top: 35px;\n transform: translateX(-50%);
\n border-top: 10px solid #396EFE;
\n border-left: 10px solid transparent;
\n border-right: 10px solid transparent;
\n
}\n.task_wrapper_left_fix {
\n transform: translateX(-100%) translateX(-10px);
\n
}\n`;

export default styles;