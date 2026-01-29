const cssContent = `.property-bar-slider-input-group {
            
 position: relative;
            

        }
.property-bar-slider-input-group.property-bar-slider-input-group-proportional .property-bar-slider-input-wrapper {
        
 padding-right: 14px;
        
 position: relative;
        

    }
.property-bar-slider-input-group.property-bar-slider-input-group-proportional .property-bar-slider-input-wrapper:not(:first-of-type):not(:last-of-type)::after {
    
 content: '';
    
 height: 100%;
    
 width: 10px;
    
 position: absolute;
    
 right: 0;
    
 top: 0;
    
 border: none;
    
 border-right: 2px solid;
    
 border-top: none;
    
 border-color: #D4D7E1;
    

}
.property-bar-slider-input-group.property-bar-slider-input-group-proportional .property-bar-slider-input-wrapper:first-of-type::after {

 content: '';

 height: 19px;

 width: 10px;

 position: absolute;

 right: 0;

 bottom: 0;

 border-right: 2px solid;

 border-top: 2px solid;

 border-color: #D4D7E1;


}
.property-bar-slider-input-group.property-bar-slider-input-group-proportional .property-bar-slider-input-wrapper:last-of-type::after {

 content: '';

 width: 10px;

 position: absolute;

 right: 0;

 top: 0;

 bottom: 19px;

 border-right: 2px solid;

 border-bottom: 2px solid;

 border-color: #D4D7E1;


}
.property-bar-slider-input-group.property-bar-slider-input-group-proportional.property-bar-slider-input-group-proportional-checked .property-bar-slider-input-proportional-icon {

 background: #F2F2F2;


}
.property-bar-slider-input-group.property-bar-slider-input-group-proportional.property-bar-slider-input-group-proportional-disabled .property-bar-slider-input-wrapper::after {

 border-color: #EAECF1;


}
.property-bar-slider-input-group.property-bar-slider-input-group-proportional.property-bar-slider-input-group-proportional-disabled .property-bar-slider-input-wrapper:not(:first-of-type):not(:last-of-type)::after {

 border-color: #EAECF1;


}
.property-bar-slider-input-group.property-bar-slider-input-group-proportional.property-bar-slider-input-group-proportional-disabled .property-bar-slider-input-proportional-icon {

 pointer-events: none;

 background-color: #fff;


}
.property-bar-slider-input-group.property-bar-slider-input-group-proportional .property-bar-slider-input-proportional-icon:hover {

 background-color: #F2F2F2;


}
.property-bar-slider-input-group.property-bar-slider-input-group-proportional .property-bar-slider-input-proportional-icon:hover .hover-icon-bg span.anticon {

 color: #396EFE !important;


}
.property-bar-slider-input-group .property-bar-slider-input-proportional-icon {

 width: 18px;

 height: 18px;

 border-radius: 2px;

 position: absolute;

 right: -8px;

 background: #F2F2F2;

 transform: translate(0, -50%);


}
.property-bar-slider-input-group .property-bar-slider-input-proportional-icon .hs-iconfont-view {

 position: absolute;

 left: 50%;

 top: 50%;

 transform: translate(-50%, -50%);


}
.property-bar-slider-input-proportional-tooltip .homestyler-popover-content {

 white-space: nowrap;


}
.property-bar-parent-tips {

 top: 15px !important;

 width: 80px;

 left: 138px !important;


}
`;

export default cssContent;