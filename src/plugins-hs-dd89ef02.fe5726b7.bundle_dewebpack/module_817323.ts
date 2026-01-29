const cssContent = `.propertybar .corniceSize span, 
.propertybar .baseboardSize span {
    margin: 0px 5px;
}
.propertybar .corniceSize span svg, 
.propertybar .baseboardSize span svg {
    width: 24px;
    height: 24px;
    vertical-align: middle;
    fill: #999999;
    padding-top: 1px;
}
.propertybar .corniceSize span:hover, 
.propertybar .baseboardSize span:hover {
    fill: #337ab7;
}
.propertybar li.baseboardTypeButton, 
.propertybar li.baseboardMaterialButton, 
.propertybar li.corniceTypeButton {
    padding-left: 2px;
    padding-right: 2px;
}
.propertybar .contents li.advancedButton, 
.propertybar .contents li.applyToAllWalls {
    background: hsla(0, 0%, 80%, 0.29);
    margin-left: 8px;
    margin-right: 8px;
    border-left: 1px solid #cfcfcf;
    border-right: 1px solid #cfcfcf;
    padding-left: 5px;
    padding-right: 5px;
}
.statusbarPopup .propertybarPopup {
    height: 34px;
    background: #f7f7f7;
    border: 1px solid #c3c4c8;
    border-radius: 3px;
}
.statusbarPopup .propertybarPopup > .contents {
    margin-left: 0;
    height: 100%;
}
.statusbarPopup .propertybarPopup > .contents .linkbutton {
    margin: 10px;
    text-decoration: none;
}
.statusbarPopup .propertybarPopup > .contents .moldingWidthImg span, 
.statusbarPopup .propertybarPopup > .contents .moldingHeightImg span, 
.statusbarPopup .propertybarPopup > .contents .moldingOffsetImg span {
    font-size: 12px;
    margin: 0px 0px 0px 7px;
}
.statusbarPopup .propertybarPopup > .contents .moldingWidthImg span svg, 
.statusbarPopup .propertybarPopup > .contents .moldingHeightImg span svg, 
.statusbarPopup .propertybarPopup > .contents .moldingOffsetImg span svg {
    width: 24px;
    height: 24px;
    vertical-align: middle;
}
.statusbarPopup .propertybarPopup > .contents .moldingWidthInput, 
.statusbarPopup .propertybarPopup > .contents .moldingHeightInput, 
.statusbarPopup .propertybarPopup > .contents .moldingOffsetInput {
    margin-right: 3px;
}
.statusbarPopup .propertybarPopup > .contents .moldingWidthInput .lengthinput, 
.statusbarPopup .propertybarPopup > .contents .moldingHeightInput .lengthinput, 
.statusbarPopup .propertybarPopup > .contents .moldingOffsetInput .lengthinput, 
.statusbarPopup .propertybarPopup > .contents .moldingWidthInput .inputwidgets, 
.statusbarPopup .propertybarPopup > .contents .moldingHeightInput .inputwidgets, 
.statusbarPopup .propertybarPopup > .contents .moldingOffsetInput .inputwidgets {
    margin: auto;
}
.statusbarPopup .propertybarPopup > .contents .moldingWidthInput .lengthinput input, 
.statusbarPopup .propertybarPopup > .contents .moldingHeightInput .lengthinput input, 
.statusbarPopup .propertybarPopup > .contents .moldingOffsetInput .lengthinput input, 
.statusbarPopup .propertybarPopup > .contents .moldingWidthInput .inputwidgets input, 
.statusbarPopup .propertybarPopup > .contents .moldingHeightInput .inputwidgets input, 
.statusbarPopup .propertybarPopup > .contents .moldingOffsetInput .inputwidgets input {
    height: 26px;
    border: 1px solid #c3c4c8;
    border-radius: 2px;
    margin: 4px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
.statusbarPopup .propertybarPopup > .contents .moldingWidthInput .lengthinput input:hover, 
.statusbarPopup .propertybarPopup > .contents .moldingHeightInput .lengthinput input:hover, 
.statusbarPopup .propertybarPopup > .contents .moldingOffsetInput .lengthinput input:hover, 
.statusbarPopup .propertybarPopup > .contents .moldingWidthInput .inputwidgets input:hover, 
.statusbarPopup .propertybarPopup > .contents .moldingHeightInput .inputwidgets input:hover, 
.statusbarPopup .propertybarPopup > .contents .moldingOffsetInput .inputwidgets input:hover, 
.statusbarPopup .propertybarPopup > .contents .moldingWidthInput .lengthinput input:active, 
.statusbarPopup .propertybarPopup > .contents .moldingHeightInput .lengthinput input:active, 
.statusbarPopup .propertybarPopup > .contents .moldingOffsetInput .lengthinput input:active, 
.statusbarPopup .propertybarPopup > .contents .moldingWidthInput .inputwidgets input:active, 
.statusbarPopup .propertybarPopup > .contents .moldingHeightInput .inputwidgets input:active, 
.statusbarPopup .propertybarPopup > .contents .moldingOffsetInput .inputwidgets input:active, 
.statusbarPopup .propertybarPopup > .contents .moldingWidthInput .lengthinput input:focus, 
.statusbarPopup .propertybarPopup > .contents .moldingHeightInput .lengthinput input:focus, 
.statusbarPopup .propertybarPopup > .contents .moldingOffsetInput .lengthinput input:focus, 
.statusbarPopup .propertybarPopup > .contents .moldingWidthInput .inputwidgets input:focus, 
.statusbarPopup .propertybarPopup > .contents .moldingHeightInput .inputwidgets input:focus, 
.statusbarPopup .propertybarPopup > .contents .moldingOffsetInput .inputwidgets input:focus {
    border: 1px solid #4d9bd6;
    box-shadow: 0px 0px 3px 0px rgba(77, 155, 214, 0.6);
}
.statusbarPopup .propertybarPopup > .contents .moldingWidthInput .lengthinput input.error, 
.statusbarPopup .propertybarPopup > .contents .moldingHeightInput .lengthinput input.error, 
.statusbarPopup .propertybarPopup > .contents .moldingOffsetInput .lengthinput input.error, 
.statusbarPopup .propertybarPopup > .contents .moldingWidthInput .inputwidgets input.error, 
.statusbarPopup .propertybarPopup > .contents .moldingHeightInput .inputwidgets input.error, 
.statusbarPopup .propertybarPopup > .contents .moldingOffsetInput .inputwidgets input.error {
    border: 1px solid red;
}
.statusbarPopup .propertybarPopup > .contents .moldingAutoFit span {
    font-size: 12px;
}`;

export default cssContent;