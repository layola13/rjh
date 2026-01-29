const styles = `.product-item-recommend-small {
            
 width: 78px !important;
            
 height: 78px !important;
            
 overflow: hidden;
            
 margin: 5px !important;
            

        }
.recommand-list-small {
        
 display: flex !important;
        
 width: 100%;
        
 flex-wrap: wrap;
        
 justify-content: flex-start;
        
 margin: 0 8px;
        
 overflow: hidden;
        

    }
.recommand-list-small .item-image {
    
 height: 76px !important;
    

}
.recommand-list-small .item-image .product-info-detail {

 display: none !important;


}
.recommend-carousel-next, 
.recommend-carousel-prev {

 position: absolute;

 top: 3px;

 z-index: 100;


}
.recommend-carousel-next .hover-icon-bg, 
.recommend-carousel-prev .hover-icon-bg {

 width: 14px !important;

 height: 14px !important;


}
.recommend-carousel-next {

 right: 25px;


}
.recommend-carousel-prev {

 left: 25px;


}
.ant-carousel .slick-prev, 
.ant-carousel .slick-next, 
.ant-carousel .slick-prev:hover, 
.ant-carousel .slick-next:hover {

 font-size: inherit;

 color: currentColor;


}
`;

export default styles;