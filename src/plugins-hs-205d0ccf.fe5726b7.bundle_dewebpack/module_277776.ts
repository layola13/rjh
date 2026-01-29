const styles = `.material-dropdown-list {
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 30px 0px 0px 30px;
}
.material-dropdown-list .current-material {
    margin: 2px 16px 5px 14px;
    cursor: pointer;
}
.material-dropdown-list .current-material .current-material-img {
    position: relative;
    top: 3px;
}
.material-dropdown-list .current-material .current-material-drop-icon {
    display: block;
    position: relative;
    bottom: 2px;
    left: 18px;
}
.material-dropdown-list .hover-material .hs-iconfont-view .hover-icon-bg .anticon {
    color: #396EFE !important;
}
.material-dropdown-list .material-dropdown-ul {
    width: 166px;
    height: auto;
    background: #FFFFFF;
    box-shadow: 0px 5px 50px 0px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    position: absolute;
    bottom: 40px;
    padding-top: 5px;
    padding-bottom: 5px;
}
.material-dropdown-list .material-dropdown-ul .dropdown-ul-item {
    width: 166px;
    height: 36px;
    background: #fff;
    cursor: pointer;
    line-height: 36px;
}
.material-dropdown-list .material-dropdown-ul .dropdown-ul-item .ul-item-img {
    display: inline-block;
    position: relative;
    top: 6px;
    left: 10px;
    height: 20px;
    width: 20px;
    margin-right: 4px;
}
.material-dropdown-list .material-dropdown-ul .dropdown-ul-item .ul-item-img * {
    transition: all 0.2s ease-out;
}
.material-dropdown-list .material-dropdown-ul .dropdown-ul-item .ul-item-label {
    font-size: 12px;
    color: #33353B;
    position: relative;
    margin-left: 6px;
    transition: all 0.2s ease-out;
}
.material-dropdown-list .material-dropdown-ul .dropdown-ul-item .ul-item-hotkey {
    font-size: 12px;
    color: #33353B;
    float: right;
    line-height: 36px;
    margin-right: 10px;
    transition: all 0.2s ease-out;
}
.material-dropdown-list .material-dropdown-ul .dropdown-ul-item:hover {
    background: #F5F5F5;
}
.material-dropdown-list .material-dropdown-ul .dropdown-ul-item.active .ul-item-label {
    color: #396EFE;
}
.material-dropdown-list .material-dropdown-ul .dropdown-ul-item.active .ul-item-hotkey {
    color: #396EFE;
}
.material-dropdown-list .material-dropdown-ul .dropdown-ul-item.active .hover-icon-bg .anticon {
    color: #396EFE !important;
}
.global-en .material-dropdown-list .material-dropdown-ul {
    width: 200px;
}
.global-en .material-dropdown-list .material-dropdown-ul .dropdown-ul-item {
    width: inherit;
}`;

export default styles;