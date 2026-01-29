const cssContent = `.inputwidgets {
            
 margin: 0 5px;
            
 height: 32px;
            

        }
.inputwidgets input[disabled] {
        
 background-color: #F7F7F7;
        

    }
.inputwidgets input {
    
 font-size: 14px;
    
 color: #5f5f5f;
    
 border: 1px solid #cfcfcf;
    
 text-indent: 10px;
    
 width: 88px;
    
 height: 28px;
    
 line-height: 28px;
    
 /* css 3 */
 border-radius: 2px;
    
 /* mozilla */
 -moz-border-radius: 2px;
    
 /* webkit */
 -webkit-border-radius: 2px;
    

}
.inputwidgets input:focus, 
.inputwidgets input.focus {

 border-color: #327DFF;

 color: #327DFF;


}
.inputwidgets input.error {

 border-color: #ea3324;

 color: #ea3324;


}
.inputwidgets input.disabled {

 border-color: #ddd;


}
.inputwidgets input.readonly {

 background: #eaeaea;

 color: #a3a3a3;


}
.inputwidgets .unit-type {

 width: 20px;

 height: 22px;

 right: 5px;

 top: 6px;

 padding: 0px 2px;

 position: absolute;

 display: inline-block;

 font-size: 12px;

 border-left: 0.5px solid #dcdce1;


}
.inputwidgets .unit-type span {

 margin: 0px !important;

 position: relative;

 top: -4px;


}
.inputwidgets .readonly {

 color: #a3a5a0;


}
.inputwidgets .unit-edit {

 border-left: 0.5px solid #327DFF;

 color: #343A40;


}
.inputwidgets .error {

 border-left: 0.5px solid #ff0000;


}
.inputwidgets .arrowgroup {

 margin: 0 0 0 -26px;

 height: 100%;

 display: inline-block;

 vertical-align: middle;


}
.inputwidgets .arrowgroup .arrowHit {

 margin: 0 5px;

 height: 50%;

 display: inline-block;

 padding: 0;

 clear: both;

 float: left;

 width: 15px;

 cursor: pointer;

 /*&.hover .caret{
    
 border-top-color:#297BB7;
    

}*/


}
.inputwidgets .arrowgroup .arrowHit a.caret.caret-reversed {

 border-top-width: 0;

 border-bottom: 4px solid #999;

 border-right-width: 4px;

 border-left-width: 4px;

 /*left: 0;

 bottom: 0;

 top: auto;
*/
 margin-top: 75%;


}
.inputwidgets .arrowgroup .arrowHit a.caret {

 border-top: 4px solid #999;

 cursor: pointer;

 border-right-width: 4px;

 border-left-width: 4px;

 display: block;

 margin-top: 25%;


}
.inputwidgets .arrowgroup .arrowHit:hover a.caret-reversed {

 border-bottom-color: #297BB7;


}
.inputwidgets .arrowgroup .arrowHit:hover a.caret {

 border-top-color: #297BB7;


}
.inputwidgets .arrowgroup .arrowHit a.disabled, 
.inputwidgets .arrowgroup .arrowHit a.caret-reversed.disabled, 
.inputwidgets .arrowgroup .arrowHit a.caret.disabled {

 display: none;


}
.plugin_customizedModeling_input_edges .unit-type {

 right: 10px;


}
.plugin_customizedModeling_lineraid_raidCount .inputlabel {

 margin-right: 6px !important;


}
.plugin_customizedModeling_radioraid_raidCount .inputlabel {

 margin-right: 6px !important;


}
`;

export default cssContent;