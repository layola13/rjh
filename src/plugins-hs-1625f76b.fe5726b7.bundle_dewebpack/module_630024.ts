export const styles = `.aigc-image-search-page-container {
            
 height: 100%;
            

}
.aigc-image-search-page-container .image-search-page-header {
        
 position: relative;
        
 display: flex;
        
 align-items: center;
        
 padding: 11px 18px 6px 15px;
        

}
.aigc-image-search-page-container .image-search-page-header .image-search-page-header-title {
    
 line-height: 40px;
    
 font-size: 16px;
    
 font-weight: bold;
    
 color: #33353B;
    
 margin-left: 8px;
    
 width: 160px;
    
 text-overflow: ellipsis;
    
 white-space: nowrap;
    
 overflow: hidden;
    

}
.aigc-image-search-page-container .image-search-page-header .expand-btn {

 position: absolute;

 right: 18px;


}
.aigc-image-search-page-container .image-search-product-page-content {

 display: flex;

 height: calc(100% - 205px);


}
.aigc-image-search-page-container .image-search-product-page-content .hsc-filter-container {

 height: 32px;

 padding: 12px 0 2px 12px;


}
.aigc-image-search-page-container .image-search-product-page-content .image-search-page-product-list-container {

 display: flex;

 flex-direction: column;

 height: calc(100% - 32px - 24px);

 overflow: auto;

 transition: all ease 0.25s;

 box-sizing: border-box;


}
.aigc-image-search-page-container .image-search-product-page-content .image-search-page-product-list-container::-webkit-scrollbar-thumb {

 border-radius: 4px;

 background-color: #dcdce1;


}
.aigc-image-search-page-container .image-search-product-page-content .image-search-page-product-list-container::-webkit-scrollbar {

 width: 4px;

 height: 5px;

 border-radius: 4px;

 padding-left: 1px;


}
.aigc-image-search-page-container .image-search-product-page-content .image-search-page-product-list-container::-webkit-scrollbar-track {

 border-radius: 20px;


}
.aigc-image-search-page-container .image-search-product-page-content .image-search-page-product-list-container .image-search-page-product-list {

 display: flex;

 flex-wrap: wrap;

 padding-left: 18px;

 justify-content: flex-start;

 align-content: flex-start;

 box-sizing: border-box;


}
.aigc-image-search-page-container .image-search-product-page-content .no-result-page {

 display: flex;

 line-height: 24px;

 align-items: center;

 justify-content: center;

 flex-direction: column;

 flex: 1;

 width: 100%;

 height: 100%;

 text-align: center;

 font-size: 14px;


}
.aigc-image-search-page-container .image-search-product-page-content .no-result-page .icon {

 display: block;

 background-repeat: no-repeat;

 background-position: center;

 width: 80px;

 height: 80px;

 background-size: 100px 100px;

 margin-bottom: 10px;

 margin-top: -100px;


}
.aigc-image-search-page-container .image-search-product-page-content .no-result-page .tooltipstext {

 font-size: 12px;

 width: 100%;

 color: #33353B;


}
.aigc-image-search-page-container .image-search-product-page-content .no-result-page.hidden {

 display: none;


}
`;