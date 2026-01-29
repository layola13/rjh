const styles = `.plugin_customizedModeling_snapping_plane_help .tip-wrap {
            
 background-color: #fafafa;
            
 z-index: 1;
            
 border-radius: 4px;
            
 padding: 7px;
            
 position: absolute;
            
 top: -160px;
            
 left: -89px;
            
 width: 200px;
            
 text-align: left;
            
 cursor: default;
            
 color: #808080;
            
 font-size: 12px;
            

        }
.plugin_customizedModeling_snapping_plane_help .tip-wrap .tip-head {
        
 display: flex;
        
 justify-content: flex-start;
        
 align-items: center;
        
 padding: 5px;
        
 line-height: 18px;
        

    }
.plugin_customizedModeling_snapping_plane_help .tip-wrap .tip-body {
    
 line-height: 20px;
    
 padding: 3px 5px 0;
    

}
.plugin_customizedModeling_snapping_plane_help .tip-wrap .tip-body > div:first-of-type {

 margin-bottom: 10px;


}
.plugin_customizedModeling_snapping_plane_help .tip-wrap::after {

 border-top: 8px solid #fafafa;

 border-left: 8px solid transparent;

 border-right: 8px solid transparent;

 width: 0;

 height: 0;

 content: "";

 display: block;

 position: absolute;

 left: 96px;

 top: 148px;


}
.plugin_customizedModeling_snapping_plane_help .tip-wrap .nomore-show {

 width: 100%;

 text-align: right;

 padding-bottom: 9px;

 line-height: 12px;


}
.plugin_customizedModeling_snapping_plane_help .tip-wrap .nomore-show span {

 display: inline-block;

 color: #4d9bd6;

 text-align: center;

 line-height: 12px;

 letter-spacing: 0.5px;

 margin: 0;

 cursor: pointer;


}
.plugin_customizedModeling_snapping_plane_help .tip-wrap .nomore-show span:hover {

 text-decoration: underline;


}
`;

export default styles;