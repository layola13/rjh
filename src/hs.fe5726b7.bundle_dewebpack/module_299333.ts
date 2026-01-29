const styles = `.checkbtn {
            \n cursor: pointer !important;
            \n vertical-align: middle;
            \n margin: 0 !important;
            \n outline: none !important;
            \n -moz-appearance: none;
            \n appearance: none;
            \n -webkit-appearance: none;
            \n width: 18px;
            \n height: 18px;
            \n background: #fff;
            \n border-radius: 2px;
            \n display: inline-flex;
            \n align-items: center;
            \n justify-content: center;
            \n border-color: #DCDCE1;
            \n
        }\n.checkbtn:after {
        \n content: "";
        \n display: inline-flex;
        \n position: relative;
        \n top: -2px;
        \n width: 6px;
        \n height: 9px;
        \n border-bottom: 1px solid #fff;
        \n border-right: 1px solid #fff;
        \n transform: rotate(45deg);
        \n -webkit-transform: rotate(45deg);
        \n
    }\n.checkbtn:focus {
    \n outline: none !important;
    \n border-color: #DCDCE1;
    \n
}\n.checkbtn.checkbtn-checked {
\n background: #327DFF;
\n border-color: #327DFF;
\n
}\n.checkbtn.checkbtn-checked:focus {
\n border-color: #327DFF;
\n
}\n.checkboxContainer {
\n height: 34px;
\n display: inline-flex;
\n align-items: center;
\n
}\n.checkboxContainer .inputlabel {
\n font-weight: 400;
\n color: #343a40;
\n margin-left: 8px;
\n vertical-align: middle;
\n
}\n.checkboxContainer.disable {
\n opacity: 0.5;
\n cursor: not-allowed;
\n
}\n.checkboxContainer.single-line .inputlabel {
\n color: #96969b;
\n margin-left: 0;
\n margin-right: 6px;
\n display: inline-block;
\n
}\n`;

export default styles;