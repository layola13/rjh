export const styles = `.double-slider-wrapper {
            \n display: inline-block;
            \n
        }\n.double-slider-wrapper .slider-bar {
        \n display: flex;
        \n align-items: center;
        \n justify-content: center;
        \n
    }\n.double-slider-wrapper .slider-bar .slider-wrapper {
    \n display: inline-block;
    \n vertical-align: middle;
    \n position: relative;
    \n width: 77px;
    \n
}\n.double-slider-wrapper .slider-bar .slider-wrapper .slider-track {
\n height: 4px;
\n width: 100%;
\n
}\n.double-slider-wrapper .slider-bar .slider-wrapper .slider-track .slider-track-left-one {
\n background-color: #EAEAED;
\n height: 100%;
\n width: 25%;
\n left: 0;
\n position: absolute;
\n box-sizing: border-box;
\n border: 1px solid #dcdce1;
\n border-top-left-radius: 2px;
\n border-bottom-left-radius: 2px;
\n
}\n.double-slider-wrapper .slider-bar .slider-wrapper .slider-track .slider-track-left-two {
\n background: #327DFF;
\n height: 100%;
\n width: 25%;
\n position: absolute;
\n
}\n.double-slider-wrapper .slider-bar .slider-wrapper .slider-track .slider-track-right-one {
\n background: #327DFF;
\n height: 100%;
\n width: 25%;
\n position: absolute;
\n left: 50%;
\n
}\n.double-slider-wrapper .slider-bar .slider-wrapper .slider-track .slider-track-right-two {
\n background-color: #eaeaed;
\n height: 100%;
\n width: 25%;
\n position: absolute;
\n box-sizing: border-box;
\n border: 1px solid #dcdce1;
\n border-top-right-radius: 2px;
\n border-bottom-right-radius: 2px;
\n
}\n.double-slider-wrapper .slider-bar .slider-wrapper .slider-track .slider-track-center {
\n top: -1px;
\n margin-left: -3px;
\n position: absolute;
\n border-radius: 50%;
\n left: 50%;
\n width: 6px;
\n height: 6px;
\n background: #327dff;
\n
}\n.double-slider-wrapper .slider-bar .slider-wrapper .slider-circle {
\n top: -3px;
\n margin-left: -5px;
\n position: absolute;
\n border-radius: 50%;
\n left: 67.6%;
\n width: 10px;
\n height: 10px;
\n background: #ffffff;
\n box-shadow: rgba(25, 25, 50, 0.3) 0px 1px 4px 0px;
\n cursor: pointer;
\n
}\n.double-slider-wrapper .slider-bar .slider-wrapper .slider-disabled-mask {
\n position: absolute;
\n width: 100%;
\n height: 100%;
\n right: 0;
\n top: 0;
\n background: #eee;
\n opacity: 0.5;
\n z-index: 5;
\n cursor: no-drop;
\n
}\n.double-slider-wrapper .slider-bar .slider-label {
\n color: #96969b;
\n font-size: 12px;
\n font-weight: 400;
\n width: 54px;
\n text-align: left;
\n margin-right: 8px;
\n
}\n`;

export default styles;