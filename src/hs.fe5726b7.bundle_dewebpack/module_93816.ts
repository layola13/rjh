const cssContent = `.dropdownwrapper .current-option .dropDownArrow.flipV {
    transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    /* IE 9 */
    -webkit-transform: rotate(180deg);
    /* Safari and Chrome */
}
.dropdownwrapper svg, 
.dropdownwrapper img {
    width: 18px;
    height: 18px;
    position: absolute;
}
.dropdownwrapper svg path {
    fill: #5f5f5f;
}
.dropdownwrapper .current-option .dropDownArrow svg {
    width: 8px;
    height: 8px;
}
.dropdownwrapper .current-option .dropDownArrow svg path {
    fill: none;
    stroke: #5f5f5f;
}
`;

export default cssContent;