const styles = `.layout-design-page {
            
 height: 100%;

        }
.layout-design-page .content {
        
 display: flex;
 padding: 8px 0 8px 0;
 height: calc(100% - 66px);

    }
.layout-design-page .content .categories {
    
 width: 62px;
 padding-left: 12px;
 padding-right: 10px;

}
.layout-design-page .content .categories .cate {

 margin: 3px 0 3px 0;
 padding: 8px 4px 8px 6px;

}
.layout-design-page .content .categories .cate .text {

 font-size: 12px;
 line-height: 14px;
 max-height: 28px;

}
.layout-design-page .content .categories .cate:hover {

 background-color: #F2F2F2;
 border-radius: 4px;

}
.layout-design-page .content .categories .cate.selected {

 font-family: PingFangSC-Semibold;
 color: #396EFE;

}
.layout-design-page .content .scroll-area {

 flex: 1;

}
.layout-design-page .content .scroll-area .products {

 display: flex;
 flex: 1;
 flex-wrap: wrap;

}
.layout-design-page .content .scroll-area .products .product:nth-child(2n+1) {

 margin-right: 10px;

}
.layout-design-page .content .scroll-area .products .product .image-container {

 display: flex;
 align-items: center;
 justify-content: center;
 width: 85px;
 height: 85px;
 border-radius: 8px;
 background-color: #F6F6F6;
 border: 1px solid #EAECF1;

}
.layout-design-page .content .scroll-area .products .product .image-container:hover {

 cursor: pointer;
 background-color: #EAECEF;

}
.layout-design-page .content .scroll-area .products .product .image-container .image {

 max-width: 60px;
 max-height: 60px;
 height: -moz-fit-content;
 height: fit-content;
 width: -moz-fit-content;
 width: fit-content;

}
.layout-design-page .content .scroll-area .products .product .text {

 margin: 5px 0 5px 0;
 height: 28px;
 max-width: 85px;
 font-size: 12px;
 line-height: 14px;
 color: #60646F;
 text-align: center;

}
`;

export default styles;