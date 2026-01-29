const styles = `.slider-bar-wrapper-dark .slider-bar {
            \n display: flex;
            \n align-items: flex-start;
            \n justify-content: center;
            \n flex-direction: column;
            \n
        }\n.slider-bar-wrapper-dark .slider-bar .slider-label {
        \n font-size: 12px;
        \n font-weight: normal;
        \n color: rgba(255, 255, 255, 0.86);
        \n padding: 0px;
        \n text-align: left;
        \n margin-right: 6px;
        \n margin-bottom: 5px;
        \n
    }\n.slider-bar-wrapper-dark .slider-bar .slider-wrapper {
    \n width: 128px;
    \n display: inline-block;
    \n vertical-align: middle;
    \n position: relative;
    \n
}\n.slider-bar-wrapper-dark .slider-bar .slider-wrapper .slider-track {
\n height: 3px;
\n width: 100%;
\n
}\n.slider-bar-wrapper-dark .slider-bar .slider-wrapper .slider-track .slider-track-left-one {
\n background-color: #6B6C6D;
\n height: 100%;
\n width: 100%;
\n left: 0;
\n position: absolute;
\n box-sizing: border-box;
\n border: none;
\n border-radius: 2px;
\n
}\n.slider-bar-wrapper-dark .slider-bar .slider-wrapper .slider-track .slider-track-left-two {
\n background: #396efe;
\n height: 100%;
\n width: 25%;
\n position: absolute;
\n border-radius: 2px;
\n
}\n.slider-bar-wrapper-dark .slider-bar .slider-wrapper .slider-circle {
\n top: -4px;
\n margin-left: -5px;
\n position: absolute;
\n border-radius: 50%;
\n left: 67.6%;
\n width: 12px;
\n height: 12px;
\n border: 2px solid #396efe;
\n background: #2b2c2e;
\n z-index: 2;
\n cursor: pointer;
\n box-sizing: border-box;
\n
}\n.slider-bar-wrapper-dark .slider-bar .slider-wrapper .slider-circle:hover::before {
\n opacity: 0;\n
}\n.slider-bar-wrapper-dark .slider-bar .slider-wrapper .slider-circle::before {
\n content: "";\n display: block;\n position: absolute;\n top: -4px;\n bottom: -4px;\n left: -4px;\n right: -4px;\n z-index: -1;\n border: 2px solid #2b2c2e;\n border-radius: 50%;\n pointer-events: none;\n transition-duration: 0.3s;\n
}\n.slider-bar-wrapper-dark .slider-bar .slider-wrapper .slider-disable-mask {
\n position: absolute;\n width: 100%;\n height: 100%;\n right: 0;\n top: 0;\n background: #ffffff;\n opacity: 0.5;\n z-index: 5;\n cursor: no-drop;\n
}\n.global-en .slider-bar-wrapper-dark .slider-bar .slider-label {
\n word-break: normal;\n
}\n`;

export default styles;