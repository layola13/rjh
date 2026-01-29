import { CSSResult } from './types';

const styles: string = `.user-info-container {
            
 position: absolute;
            
 left: 0;
            
 top: 0;
            
 z-index: 3000;
            

        }
.user-info-usericon {
        
 width: 30px;
        
 height: 30px;
        
 position: relative;
        
 border-radius: 15px;
        
 justify-content: center;
        
 align-items: center;
        
 display: flex;
        
 margin: 0 12px;
        

    }
.user-info-usericon:hover {
    
 background: #f5f5f5 !important;
    

}
.user-info-usericon-avatar {

 width: 20px;

 height: 20px;

 border-radius: 10px;


}
.user-info-usericon-reddot {

 position: absolute;

 width: 6px;

 height: 6px;

 border-radius: 50%;

 background: #eb5d46;

 margin-left: 2px;

 top: 2px;

 right: 1px;


}
.user-info-usericon .user-info-name {

 font-family: AlibabaPuHuiTi-Regular !important;

 font-size: 12px;

 max-width: 81px;

 overflow: hidden;

 text-overflow: ellipsis;

 display: inline-block;

 white-space: nowrap;

 position: relative;

 margin: 0 3px;

 box-sizing: border-box;

 min-width: 26px;


}
.user-info-menu {

 height: 30px;

 display: inline-flex;

 align-items: center;

 justify-content: center;

 border-radius: 15px;

 box-sizing: border-box;

 position: relative;

 cursor: pointer;

 z-index: 3002 !important;


}
.user-info-menu.black {

 background-color: #2b2c2e;


}
.user-info-menu.black:hover {

 color: #fff;

 background-color: #2b2c2e;


}
.user-info-menu.black .menus {

 background-color: #343538;

 color: #FFFFFF;


}
.user-info-menu.black .menus .ant-dropdown-menu-item {

 color: #FFFFFF;


}
.user-info-menu.black .menus .ant-dropdown-menu-item a {

 color: #FFFFFF;


}
.user-info-menu.black .menus .ant-dropdown-menu-item:hover {

 background-color: #3D3D40;


}
.user-info-menu.black .menus .user-info-userdetail {

 color: #FFFFFF;


}
.user-info-menu.black .header-divider {

 width: 145px;

 border-bottom: 1px solid #2C2D30;


}
.user-info-menu.light:hover {

 background-color: #ffffff;


}
.user-info-menu.light .menus {

 background-color: #FFFFFF;

 color: #60646f;


}
.user-info-menu.light .menus .ant-dropdown-menu-item {

 color: #60646f;


}
.user-info-menu.light .menus .ant-dropdown-menu-item a {

 color: #60646f;


}
.user-info-menu.light .menus .ant-dropdown-menu-item:hover {

 background-color: #F2F2F2;


}
.user-info-menu.light .menus .user-info-userdetail {

 color: #60646f;

 background-color: transparent;


}
.user-info-menu.light .menus .user-info-userdetail:hover {

 background-color: transparent;


}
.user-info-menu.light .header-divider {

 width: 145px;

 border-bottom: 1px solid #eaecf1;


}
.settings-content {

 display: flex;

 align-items: center;

 justify-content: center;

 height: 100%;


}
.settings-content .settings-icons {

 height: 30px;

 width: 30px;

 display: flex;

 align-items: center;

 justify-content: center;

 border-radius: 15px;


}
.settings-content .settings-icons:hover {

 background: rgba(255, 255, 255, 0.9);


}
.notification-content {

 display: flex;

 align-items: center;

 justify-content: center;

 height: 100%;

 margin-left: 14px;

 position: relative;


}
.notification-content .notification-icons {

 height: 30px;

 width: 30px;

 display: flex;

 align-items: center;

 justify-content: center;

 cursor: pointer;

 border-radius: 15px;


}
.notification-content .notification-icons:hover {

 background: rgba(255, 255, 255, 0.9);


}
.unrend-num {

 padding: 1px 7px;

 border-radius: 12px;

 background-color: #eb5d46;

 color: #fff;

 font-size: 12px;

 position: absolute;

 transform: scale(0.9);

 top: 4px;

 right: -8px;


}
.ant-dropdown .menus {

 min-width: 156px;

 border-radius: 8px !important;


}
.ant-dropdown .menus .cli {

 font-size: 12px;

 font-weight: 500;

 width: 100%;

 height: 100%;

 text-align: start;

 display: flex;

 align-items: center;


}
.ant-dropdown .menus .cli a {

 font-size: 12px;

 font-weight: 500;

 text-decoration: none;


}
.ant-dropdown .menus .cli .user-info-name {

 font-family: AlibabaPuHuiTi-Regular !important;

 font-size: 12px;

 max-width: 81px;

 overflow: hidden;

 text-overflow: ellipsis;

 display: inline-block;

 white-space: nowrap;

 position: relative;

 margin: 0 3px;

 box-sizing: border-box;

 min-width: 20px;


}
.ant-dropdown .menus .userInfo-divider {

 pointer-events: none;


}
.ant-dropdown .menus .user-info-userdetail {

 cursor: default;

 height: 36px;

 width: 140px;

 padding-left: 16px;

 display: grid;

 grid-template-columns: 30px 94px;

 align-items: center;


}
.ant-dropdown .menus .user-info-userdetail-avatar {

 width: 24px;

 height: 24px;

 border-radius: 12px;


}
.ant-dropdown .menus .user-info-userdetail-name {

 line-height: 17px;

 width: 94px;

 font-family: AlibabaPuHuiTi-Bold;

 font-size: 12px;

 letter-spacing: 0;

 font-weight: bold;

 max-height: 60px;

 display: -webkit-box;

 -webkit-box-orient: vertical;

 -webkit-line-clamp: 2;

 text-align: left;

 overflow: hidden;

 text-overflow: ellipsis;

 word-wrap: break-word;

 white-space: pre-wrap;

 word-break: break-all;


}
`;

export default styles;