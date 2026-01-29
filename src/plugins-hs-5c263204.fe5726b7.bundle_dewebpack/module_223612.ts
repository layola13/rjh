const cssContent = `.font1 {
            
 font-size: 12px;
            
 color: #33353B;
            
 letter-spacing: -0.03px;
            

        }
.font2 {
        
 font-size: 12px;
        
 color: #33353B;
        
 letter-spacing: -0.03px;
        

    }
.font4 {
    
 font-size: 12px;
    
 color: #33353B;
    

}
.selectedStyle {

 color: #396EFE;

 font-weight: normal;


}
.hoverStyle {

 color: #396EFE;

 border-radius: 2px;


}
.commonTextStyleForLongText {

 overflow: hidden;

 white-space: nowrap;

 text-overflow: ellipsis;


}
#addressViewContainer {

 display: block;

 width: 900px;

 height: 539px;

 position: absolute;

 top: 39px;

 left: -140px;


}
#addressViewContainer.hide {

 display: none;


}
#addressViewContainer.showUp {

 z-index: 4444444;


}
#addressViewContainer.showUp #addressView {

 width: 100%;

 height: 100%;

 position: absolute;

 top: 2px;

 z-index: 1;


}
#addressViewContainer.showUp #addressView #addressViewMask {

 width: 100%;

 height: 100%;

 position: absolute;

 background: rgba(255, 255, 255, 0.5);

 z-index: 5;

 border-radius: 10px;


}
#addressViewContainer.showUp #addressView #addressViewMask #addressInfoContainer {

 width: 280px;

 max-height: 507px;

 padding: 10px 0px 10px 16px;

 border-radius: 10px;

 z-index: 6;

 text-align: left;

 background: #FFFFFF;

 box-shadow: 0px 2px 16px 0px rgba(144, 149, 163, 0.3);

 position: absolute;

 left: 140px;

 overflow: hidden;


}
#addressViewContainer.showUp #addressView #addressViewMask #addressInfoContainer.hide {

 display: none;


}
#addressViewContainer.showUp #addressView #addressViewMask #addressInfoContainer .currentLocation {

 display: none;


}
#addressViewContainer.showUp #addressView #addressViewMask #addressInfoContainer .currentLocation span {

 font-size: 12px;

 color: #33353B;

 letter-spacing: -0.03px;

 display: inline-block;

 margin-right: 3px;

 font-size: 14px;

 font-weight: 600;


}
#addressViewContainer.showUp #addressView #addressViewMask #addressInfoContainer .currentLocation .label {

 font-size: 12px;

 color: #33353B;

 letter-spacing: -0.03px;

 cursor: pointer;

 font-size: 14px;

 padding: 0;

 line-height: 30px;

 font-weight: 600;

 margin-left: 14px;


}
#addressViewContainer.showUp #addressView #addressViewMask #addressInfoContainer .currentLocation img {

 width: 16px;

 height: 16px;

 position: relative;

 top: 3px;

 left: 11px;


}
#addressViewContainer.showUp #addressView #addressViewMask #addressInfoContainer .addressList {

 height: 472px;


}
#addressViewContainer.showUp #addressView #addressViewMask #addressInfoContainer .addressList .regionBlock {

 clear: both;

 width: 100%;

 margin-bottom: 12px;


}
#addressViewContainer.showUp #addressView #addressViewMask #addressInfoContainer .addressList .regionBlock .regionName {

 font-size: 12px;

 color: #33353B;

 letter-spacing: -0.03px;

 font-weight: 600;

 height: 25px;

 line-height: 25px;


}
#addressViewContainer.showUp #addressView #addressViewMask #addressInfoContainer .addressList .regionBlock .provinceBlock {

 width: 100%;

 height: 25px;

 line-height: 25px;

 text-align: center;

 margin-bottom: 12px;


}
#addressViewContainer.showUp #addressView #addressViewMask #addressInfoContainer .addressList .regionBlock .provinceBlock .provinceName {

 float: left;

 height: 24px;

 line-height: 24px;

 font-size: 12px;

 color: #33353B;

 letter-spacing: -0.03px;

 font-weight: 300;

 margin-right: 6px;

 padding: 0 6px;

 border-radius: 4px;

 overflow: hidden;

 white-space: nowrap;

 text-overflow: ellipsis;

 position: relative;


}
#addressViewContainer.showUp #addressView #addressViewMask #addressInfoContainer .addressList .regionBlock .provinceBlock .provinceName:hover {

 cursor: pointer;

 background: #F5F5F5;


}
#addressViewContainer.showUp #addressView #addressViewMask #addressInfoContainer .addressList .regionBlock .provinceBlock .provinceName.selected {

 color: #396EFE;

 font-weight: normal;


}
#addressViewContainer.showUp #addressView #addressViewMask #addressInfoContainer .addressList .regionBlock .provinceBlock .provinceName #triangle-up {

 width: 100%;

 height: 0;

 position: absolute;

 bottom: 0;

 border: 1px solid #396EFE;

 background: #396EFE;


}
#addressViewContainer.showUp #addressView #addressViewMask #addressInfoContainer .addressList .regionBlock .provinceBlock .cityBlock {

 width: 95%;

 line-height: 25px;

 float: left;

 border-radius: 2px;

 text-align: left;

 margin-top: 4px;

 margin-bottom: 12px;

 background: #F5F5F5;

 border-radius: 4px;

 padding: 7px 12px;

 box-sizing: border-box;


}
#addressViewContainer.showUp #addressView #addressViewMask #addressInfoContainer .addressList .regionBlock .provinceBlock .cityBlock.hide {

 display: none;


}
#addressViewContainer.showUp #addressView #addressViewMask #addressInfoContainer .addressList .regionBlock .provinceBlock .cityBlock .cityNameBlock {

 float: left;

 height: 22px;

 line-height: 22px;

 margin-right: 18px;

 text-align: center;

 font-size: 12px;

 font-weight: 300;

 color: #33353B;

 letter-spacing: 0;

 overflow: hidden;

 white-space: nowrap;

 text-overflow: ellipsis;


}
#addressViewContainer.showUp #addressView #addressViewMask #addressInfoContainer .addressList .regionBlock .provinceBlock .cityBlock .cityNameBlock:hover {

 color: #396EFE;

 border-radius: 2px;

 cursor: pointer;


}
#addressViewContainer.showUp #addressView #addressViewMask #addressInfoContainer .addressList .regionBlock .provinceBlock .cityBlock .cityNameBlock.citySeleted, 
#addressViewContainer.showUp #addressView #addressViewMask #addressInfoContainer .addressList .regionBlock .provinceBlock .cityBlock .cityNameBlock.seleted {

 color: #396EFE;

 font-weight: normal;


}
`;

export default cssContent;