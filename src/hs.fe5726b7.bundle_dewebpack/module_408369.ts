const cssContent = `.propertybar {
            
 position: absolute;
            
 bottom: 10px;
            
 margin: 0 auto;
            
 left: 30%;
            
 background-color: #fff;
            
 border: none;
            
 width: auto;
            
 height: 30px;
            
 z-index: 103;
            
 border: solid 1px #ccc;
            

        }
.propertybar .contents {
        
 height: 32px;
        

    }
.propertybar .contents > li {
    
 position: relative;
    
 height: 100%;
    
 line-height: 32px;
    
 padding: 0;
    
 float: left;
    

}
.propertybar span {

 margin: 0 5px;


}
.propertybar input[type=text] {

 border: 1px solid #cfcfcf;

 text-indent: 10px;

 width: 88px;

 height: 28px;

 line-height: 28px;


}
.propertybar input[type=text].readonly {

 border: 0px;

 width: 88px;

 color: #5f5f5f;

 font-size: 13px;

 /*text-indent: 1px;
*/


}
.propertybar input[type=text]:focus, 
.propertybar input[type=text].focus {

 /*border-color:#1c79bc;
*/


}
.propertybar input[type=text].error {

 border-color: #ff0000;


}
.propertybar span.inputlabel {

 font-size: 12px;

 cursor: default;

 color: #19191E;


}
.propertybar span.inputlabel.disabled {

 color: #ccc;


}
.propertybar .verticaldivider {

 border-right: 1px solid #cfcfcf;

 font-size: 20px;

 height: 35px;

 display: inline-block;


}
.propertybar span.verticaldivider {

 height: 100%;


}
.propertybar span.verticalsubdivider {

 vertical-align: middle;

 padding: 12px 0;

 border-right: 1px solid #cfcfcf;

 font-size: 20px;

 box-sizing: border-box;

 display: inline-block;


}
.propertybar span.space {

 margin: 0;

 display: inline-block;


}
.propertybar .imagebutton, 
.propertybar .linkbutton {

 cursor: pointer;


}
.propertybar .imagebutton {

 line-height: 0px;


}
.propertybar .image img {

 width: 30px;

 height: 30px;


}
.propertybar .imagebutton svg {

 fill: #333;

 width: 25px;

 height: 25px;

 padding-top: 3px;

 /*just a workaround to get svg aligned...*/


}
.propertybar .imagebutton img {

 width: 33px;

 height: 25px;

 border: 1px solid #ccc;


}
.propertybar .imagebtn:not(.disable) .imagebutton:hover svg {

 fill: #237ab9;


}
.propertybar .disable svg path {

 fill: #dadada;


}
.propertybar li.active svg path {

 fill: #36a1f0;


}
.propertybar .active svg path {

 fill: #1c79bc;


}
.propertybar .linkbutton {

 color: #333;

 font-size: 12px;

 text-decoration: underline;


}
.propertybar li.btn {

 width: 107px;

 padding: 0 6px;


}
.propertybar .checkboxContainer input[type=checkbox] {

 cursor: pointer;


}
.propertybar.statusBar .imagebtn {

 display: inline-block;


}
.propertybar.statusBar .imagebtn + .miniHelpBtn .imagebutton {

 width: 0px;

 margin-left: -25px;


}
.propertybar.statusBar .radioBtn {

 vertical-align: middle;

 min-height: 21px;


}
.propertybar.statusBar .radioBtn + .miniHelpBtn {

 vertical-align: middle;


}
.propertybar.statusBar .radioBtn + .miniHelpBtn .imagebutton {

 width: 0px;

 height: auto;

 margin-top: 0px;

 margin-right: 0px;

 margin-left: 0px;

 margin-right: 10px;

 padding: 0px;

 vertical-align: middle;


}
.propertybar.statusBar .contents li .miniHelpBtn .imagebutton {

 vertical-align: middle;

 padding: 0px;

 border: unset;

 margin-top: 0px;

 margin-bottom: 0px;


}
.propertybar.statusBar .contents li .miniHelpBtn .imagebutton svg {

 width: 15px;


}
.propertybar .cameraHelp .imagebtn {

 margin: 0 5px 0 0;


}
.propertybar .box_button {

 right: 0px;

 width: 30px;

 height: 22px;

 position: absolute;

 border: solid 1px #c3c4c8;

 background-color: #fafafa;


}
.propertybar .box_button.left {

 border-radius: 0px 30px 30px 0px;


}
.propertybar .box_button.right {

 border-radius: 30px 0px 0px 30px;


}
.propertybar .box_pin_button.hover {

 background-color: #dce9f1;


}
.propertybar .box_pin_button.active {

 background-color: #4d9bd6;


}
.propertybar .pinbtn {

 z-index: 2;

 text-align: center;

 position: absolute;

 right: 5px;


}
.propertybar .miniHelpBtnWrapper {

 margin: unset !important;


}
`;

export default cssContent;