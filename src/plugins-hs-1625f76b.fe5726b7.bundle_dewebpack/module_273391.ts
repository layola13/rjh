const styles = `.ps-scrollbar-x-rail {
    display: none !important;
}
#cameraposition_overlay {
    visibility: hidden;
    left: 0px;
    top: 0px;
    bottom: 60px;
    width: 100%;
    z-index: 300;
    height: 0px;
}
#cameraposition_overlay .barTriangle {
    position: absolute;
    width: 18px;
    height: 9px;
    z-index: 11;
}
#np_navigator img:hover {
    cursor: pointer;
}
#np_navigator .emptydes {
    height: 100%;
    left: 0;
    width: 100%;
    position: absolute;
}
#np_navigator .emptydes img {
    position: relative;
    width: 88px;
    height: 80px;
    left: 50%;
    margin-top: 30px;
    margin-left: -44px;
}
#np_navigator .emptydes .ctext {
    position: relative;
    font-size: 14px;
    margin-top: 12px;
    text-align: center;
    color: #33353B;
}
#np_navigator #camera_lg_list_slider {
    height: 150px;
    margin: 15px 18px;
    overflow: hidden !important;
    position: relative;
}
#np_navigator #camera_lg_list_slider .camera_bar {
    height: 100%;
    white-space: nowrap;
}
#np_navigator #camera_lg_list_slider .camera_bar .cameraItem {
    height: 144px;
    width: 254px;
    display: inline-block;
    clear: none;
    padding: 0;
    margin: 0 6px;
    border-radius: 13px;
    border: solid 3px transparent;
}
#np_navigator #camera_lg_list_slider .camera_bar .cameraItem:hover, 
#np_navigator #camera_lg_list_slider .camera_bar .cameraItem.active {
    border: solid 3px #396EFE;
    color: #4d9bd6;
}
#np_navigator #camera_lg_list_slider .camera_bar .cameraItem .delete_icon {
    width: 28px;
    height: 28px;
    top: 8px;
    right: 11px;
    position: absolute;
    z-index: 1;
    display: inline-flex;
    border-radius: 50%;
    cursor: pointer;
    justify-content: center;
    align-items: center;
}
#np_navigator #camera_lg_list_slider .camera_bar .cameraItem .delete_icon_disable {
    cursor: not-allowed;
}
#np_navigator #camera_lg_list_slider .camera_bar .cameraItem .delete_icon_disable > div {
    pointer-events: none !important;
}
#np_navigator #camera_lg_list_slider .camera_bar .cameraItem .cameraImg {
    height: 144px;
    width: 254px;
    border-radius: 10px;
    position: absolute;
}
#np_navigator #camera_lg_list_slider .camera_bar .cameraItem .cameraImg .room_name {
    background: transparent;
    border: 0px;
    padding-left: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 20px;
    text-align: center;
    background-clip: content-box;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #343a40;
    font-size: 14px;
    border-radius: 0 0 4px 4px;
}
#np_navigator #camera_lg_list_slider .item {
    height: 133.5px !important;
    padding-top: 7.5px;
    padding-bottom: 7.5px;
}
#np_navigator #camera_lg_list_slider .item .row {
    margin-left: 0px;
    margin-right: 0px;
}
#np_navigator #camera_lg_list_slider .item.next.left, 
#np_navigator #camera_lg_list_slider .item.prev.right {
    top: 15.5px;
}
#np_navigator .camera_lg_list {
    height: 100%;
    left: 0;
    right: 160px;
    position: absolute;
}
#np_navigator .camera_lg_list .list_button.left::after {
    content: "";
    position: absolute;
    top: 9px;
    left: 20px;
    width: 60px;
    height: 160px;
    background: linear-gradient(to right, white, transparent);
    pointer-events: none;
}
#np_navigator .camera_lg_list .list_button.right {
    right: 0;
    left: auto;
}
#np_navigator .camera_lg_list .list_button.right::after {
    content: "";
    position: absolute;
    top: 9px;
    right: 10px;
    width: 60px;
    height: 160px;
    background: linear-gradient(to right, transparent, white);
    pointer-events: none;
}
#np_navigator .camera_lg_list .list_button {
    background-repeat: repeat-x;
    width: 12px;
    top: 0;
    height: 100%;
    margin: 0 4px;
    position: absolute;
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;
}
#cameraposition_overlay.visible {
    visibility: visible;
}
#np_navigator.item {
    height: 180px;
}
#np_navigator.phone, 
#np_navigator.tablet {
    height: 110px;
}
#np_navigator.phone .camera_lg_list, 
#np_navigator.tablet .camera_lg_list {
    display: none;
}`;

export default styles;