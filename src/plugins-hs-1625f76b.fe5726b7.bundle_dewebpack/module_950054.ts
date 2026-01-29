const cssContent = `.ai-create-container {
            
 display: flex;
            
 position: absolute;
            
 font-size: 12px;
            
 left: 60px;
            
 top: 50px;
            
 height: calc(100vh - 60px);
            
 color: black;
            
 z-index: 1002;
            

        }
.ai-create-container.hide {
        
 display: none;
        

    }
.ai-create-container .ai-create-page {
    
 border-radius: 10px;
    
 overflow: hidden;
    
 width: 280px;
    
 height: 100%;
    
 background: white;
    
 box-shadow: 0 5px 50px 0 rgba(0, 0, 0, 0.1);
    

}
.ai-create-container .ai-create-page .ai-create-page-header {

 padding: 10px 16px 35px;
 background-image: url(BACKGROUND_IMAGE_URL);
 background-size: cover;
 background-position: bottom;

}
.ai-create-container .ai-create-page .ai-create-page-header .ai-top {

 display: flex;
 justify-content: space-between;
 align-items: center;

}
.ai-create-container .ai-create-page .ai-create-page-header .ai-top .ai-logo {

 display: flex;
 align-items: center;
 height: 40px;
 overflow: hidden;

}
.ai-create-container .ai-create-page .ai-create-page-header .ai-top .ai-icons {

 display: flex;

}
.ai-create-container .ai-create-page .ai-create-page-header .ai-top .ai-icons .ai-icon {

 margin-left: 12px;
 cursor: pointer;

}
.ai-create-container .ai-create-page .ai-create-page-header .ai-tutorial {

 display: flex;
 align-items: center;
 color: white;
 cursor: pointer;
 font-size: 12px;

}
.ai-create-container .ai-create-page .ai-create-page-header .ai-tutorial::after {

 content: '';
 width: 5px;
 height: 5px;
 border-right: 1px solid white;
 border-top: 1px solid white;
 transform: rotate(45deg);
 display: inline-block;

}
.ai-create-container .ai-create-page .ai-material-content-col {

 margin: 20px 18px;

}
.ai-create-container .ai-create-page .ai-material-content-col .dimension-title, 
.ai-create-container .ai-create-page .ai-material-content-col .upload-title {

 font-size: 12px;
 margin-bottom: 12px;

}
.ai-create-container .ai-create-page .ai-material-content-col .dimension-title .step, 
.ai-create-container .ai-create-page .ai-material-content-col .upload-title .step {

 font-size: 14px;

}
.ai-create-container .ai-create-page .ai-material-content-col .upload-content {

 font-size: 12px;

}
.ai-create-container .ai-create-page .ai-material-content-col .upload-content .upload-icon {

 width: 36px;
 height: 36px;

}
.ai-create-container .ai-create-page .ai-material-content-col .dimension-form .dimension-row .dimension-label {

 font-size: 12px;
}
.ai-create-container .ai-create-page .ai-material-content-col .dimension-form .dimension-row .dimension-input-wrapper .dimension-input .dimension-unit {

 font-size: 12px;
}
.ai-create-container .ai-create-page .ai-material-content-col .dimension-form .dimension-row .dimension-input-wrapper .dimension-error {

 top: 27px;
 font-size: 12px;

}
.ai-create-container .ai-create-page .ai-material-content-col .generate-footer {

 position: unset;
 margin-top: unset;

}
.ai-create-container .ai-create-page .ai-material-content-col .generate-footer .generate-cost-tips {

 font-size: 12px;
 margin-bottom: 10px;

}
.ai-create-container .ai-create-page .ai-material-content-col .generate-button {

 height: 36px;
 background-color: #396efe;
 font-size: 14px;
 line-height: 14px;

}
.ai-create-container .ai-create-page .ai-material-content-col .generate-button .free-trial-badge {

 top: -14px;
 height: 18px;

}
.ai-create-container .ai-create-page .ai-material-content-col .buy-more {

 font-size: 12px;
 margin-top: 11px;

}
.ai-create-container .ai-create-page .ai-material-content-col .ant-input-affix-wrapper {

 font-size: 12px;
 height: 16px;

}
`;

export default cssContent;