const cssContent = `#diy_property_plane {
            
 width: 340px;
            
 height: 100%;
            
 background-color: #f5f5fa;
            
 z-index: 102;
            
 position: absolute;
            
 left: 0;
            
 top: 40px;
            
 font: 12px/1.5 Helvetica, PingFangSC-Regular, Tahoma, Arial, Microsoft YaHei, sans-serif;
            

        }
#diy_property_plane_hide {
        
 width: 340px;
        
 height: 100%;
        
 background-color: white;
        
 z-index: -102;
        
 display: none;
        

    }
.property_plane_header {
    
 padding: 10px 21px;
    
 padding-top: 16px;
    
 padding-bottom: 4px;
    
 background: white;
    
 border-bottom: 0.5px solid #DCDCE1;
    
 font-weight: bold;
    
 font-size: 16px;
    
 color: #19191E;
    
 height: 29px;
    

}
.property_plane_close {

 float: right;

 width: 20px;

 height: 20px;

 cursor: pointer;


}
#command_label {

 height: 30px;

 background-color: #444444;

 color: white;


}
.command_label_icon {

 border-radius: 50%;

 width: 24px;

 height: 24px;

 background-color: white;

 float: left;

 margin-top: 2.5px;

 margin-left: 24px;


}
.command_label_name {

 display: inline-block;

 font-size: 14px;

 margin-left: 10px;

 line-height: 30px;


}
.command_label_button {

 float: right;

 width: 190px;

 margin-right: 4px;


}
.command_label_button_hide {

 display: none;


}
.command_label_cancel {

 width: 90px;

 display: inline-block;

 text-align: center;

 letter-spacing: 1px;

 vertical-align: baseline;

 margin-top: 5px;

 background-color: #dbdbdb;

 color: #343a40;

 border: solid 1px #d9dbdf;

 float: left;

 margin-right: 3px;


}
.command_label_cancel.command_label_cancel:hover {

 background-color: #fff;

 border: solid 1px #4d9bd6;

 cursor: pointer;


}
.command_label_apply, 
.command_label_next {

 text-align: center;

 letter-spacing: 1px;

 display: inline-block;

 width: 90px;

 background-color: #4d9bd6;

 color: #fff;

 margin-top: 5px;

 border: 1px solid #3085c4;


}
.command_label_apply.command_label_apply, 
.command_label_next.command_label_apply, 
.command_label_apply.command_label_next:hover, 
.command_label_next.command_label_next:hover {

 background-color: #36a1f0 !important;

 cursor: pointer;


}
.detail_divider {

 height: 6px;


}
.diy_command_detail {

 margin-left: 57px;


}
.diy_command_detail .property_input_component .property_input_label {

 display: inline-block;

 font-size: 14px;

 font-weight: 500;

 line-height: 33px;

 font-weight: bold;


}
.diy_command_detail .property_input_component .property_input_detail {

 margin-left: 25px;


}
.property-tips-container {

 background-color: #343a40;


}
.property-tips-container #first-property-step {

 margin-left: 57px;


}
.property-tips-container span {

 display: inline-block;

 text-align: center;

 border-radius: 5px;

 margin-top: 7px;

 width: 45px;


}
.property-tips-container .property-step-active {

 background-color: #111;


}
.property-tips-container .property-step {

 background-color: #777;


}
.property-tips-container .property-tips-content {

 margin-left: 57px;

 margin-top: 5px;


}
`;

export default cssContent;