const styles = `.auth-popup-container {
            
 position: absolute;
            
 width: 100%;
            
 height: 100%;
            
 background: rgba(255, 255, 255, 0.9);
            
 backdrop-filter: blur(6px);
            
 left: 0;
            
 top: 0;
            
 z-index: 20000;
            

        }
.auth-popup-container-content {
        
 width: 420px;
        
 position: absolute;
        
 transform: translate(-50%, -50%);
        
 left: 50%;
        
 top: 50%;
        
 padding-bottom: 30px;
        

    }
.auth-popup-container-content-title {
    
 font-size: 24px;
    
 font-weight: bold;
    
 margin-bottom: 18px;
    

}
.auth-popup-container-content-description {

 line-height: 24px;

 font-size: 16px;

 color: #666;

 margin-bottom: 38px;


}
.auth-popup-container-content .has-checkbox {

 margin-bottom: 15px !important;


}
.auth-popup-container-content-checkbox {

 margin-bottom: 22px;


}
.auth-popup-container-content-checkbox .check-box-container {

 margin-left: -5px;


}
.auth-popup-container-content-checkbox .check-box-container span {

 font-size: 14px !important;

 color: #666;


}
.auth-popup-container-content-action {

 display: flex;


}
.auth-popup-container-content-action-btn {

 width: 60px;

 height: 60px;

 border-radius: 100%;

 border: 1px solid #D5D5D5;

 color: #1C1C1C;

 position: relative;


}
.auth-popup-container-content-action-btn:hover {

 background-color: #396EFE !important;

 border-color: #396EFE !important;


}
.auth-popup-container-content-action-btn:hover .anticon {

 color: #fff !important;


}
.auth-popup-container-content-action-btn .hs-iconfont-view {

 margin: 19px 0 0 19px;


}
.auth-popup-container-content-action-btn-text {

 left: 2px;

 color: #666;

 position: absolute;

 bottom: -25px;

 width: 60px;


}
.auth-popup-container-content-action-prev {

 background-color: #F2F2F2;


}
.auth-popup-container-content-action-next {

 margin-left: 46px;

 border-color: #1C1C1C;

 background-color: #1C1C1C;


}
`;

export default styles;