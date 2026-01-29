const styles = `.aigc-image-view {
            
 display: flex;
            
 height: 148px;
            

        }
.aigc-image-view .image-view-left {
        
 padding-left: 18px;
        
    }
.aigc-image-view .image-view-left .image-view-image-container {
    
 position: relative;
    
 width: 174px;
    
 height: 148px;
    
 display: flex;
    
 align-items: center;
    
 justify-content: center;
    
 background-color: #1B1B1B;
    
 border-radius: 8px;
    
 overflow: hidden;
    

}
.aigc-image-view .image-view-left .image-view-image-container .image-view-expand {

 position: absolute;

 right: 8px;

 bottom: 8px;

 color: #33353B;

 background: rgba(255, 255, 255, 0.6);

 display: flex;

 align-items: center;

 padding: 5px 13px;

 height: 18px;

 border-radius: 14px;

 cursor: pointer;

 backdrop-filter: blur(6px);


}
.aigc-image-view .image-view-left .image-view-image-container .image-view-expand:hover {

 color: #396efe;


}
.aigc-image-view .image-view-left .image-view-image-container .image-view-expand .image-view-expand-button {

 font-size: 17px;

 margin-right: 2px;


}
.aigc-image-view .image-view-left .image-view-image-container img {

 max-height: 100%;

 width: 100%;

 height: 100%;

 -o-object-fit: contain;

 object-fit: contain;


}
.aigc-image-view .image-view-right {

 width: 60px;

 text-align: center;

 margin-left: 10px;


}
.aigc-image-view .image-view-right .image-category-tree .image-category-filter-item {

 margin: 0 0 7px 0;

 cursor: pointer;


}
.aigc-image-view .image-view-right .image-category-tree .image-category-filter-item .image-category-name {

 position: relative;

 border-radius: 4px;

 white-space: nowrap;

 overflow: hidden;

 width: 60px;

 height: 24px;

 text-align: center;

 display: block;

 text-overflow: ellipsis;

 line-height: 26px;

 font-family: PingFangSC-Regular !important;

 color: #60646F;

 background: rgba(242, 242, 242, 0.6);


}
.aigc-image-view .image-view-right .image-category-tree .image-category-filter-item .image-category-name:hover {

 color: #33353B;


}
.aigc-image-view .image-view-right .image-category-tree .image-category-filter-item .selected-item {

 background: #ECF1FF;

 color: #396EFE;


}
.aigc-image-view .image-view-right .image-category-tree .image-category-filter-item .selected-item:hover {

 color: #396EFE;


}
.aigc-image-view .image-view-right .image-category-tree .image-category-filter-item .menu-container-active .image-category-name {

 color: #396EFE;

 background: #ECF1FF;


}
.aigc-image-view .image-view-right .image-category-tree .image-category-filter-item .menu-container-active .image-category-name .image-category-dropdown-button {

 transform: rotate(180deg);


}
.aigc-image-view .image-view-right .image-category-tree .image-category-filter-item .image-category-more-text {

 display: flex;

 justify-content: center;


}
.aigc-image-view .image-view-right .image-category-tree .image-category-filter-item .image-category-more-text .text {

 max-width: 36px;


}
.aigc-image-view .image-view-right .image-category-tree .image-category-filter-item .image-category-more-text .image-category-dropdown-button {

 margin-left: 2px;

 font-size: 10px;


}
.aigc-image-view .image-view-right .image-category-tree .image-category-filter-item .image-search-category-dropdown {

 width: auto;

 height: auto;


}
.homestyler-ui-components.sub-menu-container.image-search-category-dropdown-submenu {

 width: 156px;

 height: 36px;


}
.homestyler-ui-components.sub-menu-container.image-search-category-dropdown-submenu.sub-menu-container-active .sub-menu-main-active {

 background: #F5F5F5;


}
.homestyler-ui-components.sub-menu-container.image-search-category-dropdown-submenu .sub-menu-main:hover {

 background: #F5F5F5;


}
.homestyler-ui-components.sub-menu-container.image-search-category-dropdown-submenu .sub-menu-main::after {

 display: none;


}
.homestyler-ui-components.sub-menu-container.image-search-category-dropdown-submenu .sub-menu-ul {

 margin-left: 6px;

 margin-top: -4px;


}
.homestyler-ui-components.sub-menu-container.image-search-category-dropdown-submenu .sub-menu-ul li:first-child {

 border-top-left-radius: 3px;

 border-top-right-radius: 3px;


}
.homestyler-ui-components.sub-menu-container.image-search-category-dropdown-submenu .sub-menu-ul li:last-child {

 border-bottom-left-radius: 3px;

 border-bottom-right-radius: 3px;


}
.homestyler-ui-components.sub-menu-container.image-search-category-dropdown-submenu .sub-menu-ul::before {

 position: absolute;
 content: '';
 display: block;
 top: 0;
 left: -6px;
 width: 6px;
 height: 100%;

}
.homestyler-ui-components.pop-container .pop-container-ul li:first-child {

 border-top-left-radius: 3px;
 border-top-right-radius: 3px;

}
.homestyler-ui-components.pop-container .pop-container-ul li:first-child .sub-menu-main {

 border-top-left-radius: 3px;
 border-top-right-radius: 3px;

}
.homestyler-ui-components.pop-container .pop-container-ul li:last-child {

 border-bottom-left-radius: 3px;
 border-bottom-right-radius: 3px;

}
.homestyler-ui-components.pop-container .pop-container-ul li:last-child .sub-menu-main {

 border-bottom-left-radius: 3px;
 border-bottom-right-radius: 3px;

}
.homestyler-ui-components.menu-item.image-search-category-dropdown-menu-item {

 width: 156px;
 height: 36px;

}
.homestyler-ui-components.menu-item.image-search-category-dropdown-menu-item:hover, 
.homestyler-ui-components.menu-item.image-search-category-dropdown-menu-item.selected {

 background: #F5F5F5;

}
`;

export default styles;