const styles = `.spark_pic_right_panel {
            
 position: absolute;
            
 top: 182px;
            
 width: 100%;
            
 bottom: 0;
            
 color: #fff;
            

        }
.spark_pic_right_panel .header {
        
 height: 42px;
        
 font-size: 15px;
        
 line-height: 42px;
        
 -webkit-user-select: none;
        
 -moz-user-select: none;
        
 user-select: none;
        
 margin: 10px 10px 0 16px;
        
 font-weight: bold;
        

    }
.spark_pic_right_panel .camera_setting {
    
 height: calc(100% - 55px);
    
 overflow-y: auto;
    
 overflow-x: hidden;
    
 /*定义滑块 内阴影+圆角*/

}
.spark_pic_right_panel .camera_setting::-webkit-scrollbar {

 width: 5px;

 height: 6px;


}
.spark_pic_right_panel .camera_setting::-webkit-scrollbar-thumb {

 border-radius: 6px;

 background-color: rgba(255, 255, 255, 0.3);


}
.larger_panel {

 top: 0;


}
.camera-switch-bar {

 height: 50px;

 display: flex;

 align-items: center;

 color: white;

 margin: 0 16px;

 border-top: 1px solid rgba(0, 0, 0, 0.14);


}
.camera-switch-bar .tooltip-anchor {

 margin-left: 5px;


}
.camera-switch-bar .switch-bar-title {

 font-size: 14px;

 font-weight: bold;

 line-height: 16px;

 display: flex;


}
.camera-switch-bar .switch-bar-title .hs-iconfont-view {

 margin-left: 4px;


}
.camera-switch-bar .ant-switch {

 background: rgba(255, 255, 255, 0.2) !important;

 margin-left: 10px;

 width: 30px;

 min-width: 30px;

 height: 17px;

 line-height: 17px;


}
.camera-switch-bar .ant-switch .ant-switch-handle {

 width: 13px;

 height: 13px;


}
.camera-switch-bar .ant-switch .ant-switch-handle::before {

 background: rgba(255, 255, 255, 0.9);


}
.camera-switch-bar .ant-switch-checked {

 background: #396efe !important;


}
.camera-switch-bar .ant-switch-checked:focus {

 box-shadow: none;


}
.camera-switch-bar .ant-switch-checked .ant-switch-handle {

 left: calc(100% - 13px - 2px);


}
`;

export default styles;