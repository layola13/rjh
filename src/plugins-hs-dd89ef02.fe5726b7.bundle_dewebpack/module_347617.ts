const cssContent = `.view-setting .view-setting-mask {
            
 background: none repeat scroll 0 0 #19191e;
            
 left: 0;
            
 filter: alpha(opacity=38);
            
 -moz-opacity: 0.38;
            
 -khtml-opacity: 0.38;
            
 opacity: 0.38;
            
 position: fixed;
            
 width: 100%;
            
 height: 100%;
            
 z-index: 1002;
            
 display: block;
            
        }
.view-setting .view-wrapper {
        
 z-index: 3003;
        
 width: 500px;
        
 border-radius: 10px;
        
 background: #ffffff;
        
 box-shadow: 0px 4px 16px 0px rgba(25, 25, 30, 0.15);
        
 z-index: 3050;
        
 position: absolute;
        
 top: 50%;
        
 left: 50%;
        
 transform: translate(-50%, -50%);
        
    }
.view-setting .view-wrapper .view-header {
    
 color: #19191e;
    
 display: flex;
    
 flex-direction: column;
    
 padding: 15px 70px 15px 30px;
    
 align-items: start;
    
 align-content: center;
    
 justify-content: left;
    
 position: relative;
    
}
.view-setting .view-wrapper .view-header .view-title {

 margin-top: 15px;

 min-height: 50px;

 line-height: 20px;

 font-size: 20px;

 font-family: 'PingFangSC-Medium';

 font-weight: 600;

 position: relative;

}
.view-setting .view-wrapper .view-header .view-subtitle {

 margin-top: 9px;

 font-family: PingFangSC-Light !important;

 color: #33353B;

 font-size: 12px;

}
.view-setting .view-wrapper .view-content {

 margin-top: 10px;

 padding: 0px 34px;

 display: flex;

 justify-content: space-between;

}
.view-setting .view-wrapper .view-content .view-image-option {

 position: relative;

 cursor: pointer;

 width: 201px;

 height: 238px;

 border-radius: 8px;

 background: #f0f2f5;

 border: 0.5px solid #33353b;

}
.view-setting .view-wrapper .view-content .view-image-option img {

 width: 201px;

 height: 238px;

 border-radius: 8px;

}
.view-setting .view-wrapper .view-content .view-image-option .view-tips {

 text-align: center;

 font-weight: 600;

 color: #33353B;

 font-size: 14px;

 line-height: 14px;

 padding: 6px 5px;

 font-family: 'PingFangSC-Light';

}
.view-setting .view-wrapper .view-content .view-image-option .view-tips .view-tips-text {

 text-align: left;

 display: inline-block;

}
.view-setting .view-wrapper .view-content .view-image-option-selected {

 background: #f0f2f5 !important;

 border: 3px solid #396EFE;

 border-radius: 11px;

 width: 199px;

 height: 236px;

}
.view-setting .view-wrapper .view-content .view-image-option-selected img {

 width: 199px;

 height: 236px;

}
.view-setting .view-wrapper .view-content .view-image-option-selected .view-checkbox {

 -moz-appearance: none;

 appearance: none;

 -webkit-appearance: none;

 position: absolute;

 right: -12px;

 top: -12px;

 width: 24px;

 height: 24px;

 background: #396EFE;

 border-radius: 12px;

 margin: unset;

 border: unset;

}
.view-setting .view-wrapper .view-content .view-image-option-selected .view-checkbox:after {

 content: '';

 display: inline-block;

 position: relative;

 top: 3px;

 left: 8px;

 width: 8px;

 height: 12px;

 border-bottom: 2px solid #fff;

 border-right: 2px solid #fff;

 transform: rotate(45deg);

 -webkit-transform: rotate(45deg);

}
.view-setting .view-wrapper .view-content-more {

 padding: 0px 40px;

 flex-wrap: wrap;

 gap: 24px;

}
.view-setting .view-wrapper .view-content-more .view-image-option {

 width: 198px;

 height: 108px;

 box-sizing: border-box;

}
.view-setting .view-wrapper .view-content-more .view-image-option .view-tips {

 text-align: center;

 position: absolute;

 top: 50%;

 left: 50%;

 transform: translate(-50%, -50%);

 font-size: 16px;

}
.view-setting .view-wrapper .view-content-more .view-image-option-selected {

 background: unset;

}
.view-setting .view-wrapper .view-footer {

 text-align: center;

}
.view-setting .view-wrapper .view-footer .view-buttonstyle {

 color: #ffffff;

 width: 150px;

 height: 36px;

 border-radius: 18px;

 background: #396EFE;

 position: relative;

 margin-top: 53px;

 margin-bottom: 17px;

 font-size: 13px;

 font-weight: 600;

 font-family: 'AlibabaPuHuiTi-Bold';

 border: 0px;

 z-index: 0;

}
.view-setting .view-wrapper .view-close-btn {

 position: absolute;

 top: 30px;

 right: 30px;

}
.view-setting-hide {

 display: none;

}
`;

export default cssContent;