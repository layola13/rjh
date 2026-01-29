const styles = `.thumbnail-view-topbar .drop-button {
    border: 1px solid #eaecf1;
    border-radius: 4px;
    position: relative;
}
.thumbnail-view-topbar .drop-button .current-item {
    width: 108px;
    height: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: rgba(244, 244, 244, 0.7);
    border-radius: 4px;
}
.thumbnail-view-topbar .drop-button .current-item.hover {
    border-color: #e2e2e2;
    background-color: #FFFFFF;
}
.thumbnail-view-topbar .drop-button .current-item.selected {
    background-color: #FFFFFF;
}
.thumbnail-view-topbar .drop-button .current-item .tuozhan {
    position: absolute;
    bottom: 4px;
    right: 6px;
}
.thumbnail-view-topbar .drop-button .text-description {
    font-size: 12px;
    line-height: 12px;
    align-self: center;
    text-align: center;
    color: #33353B;
}
.thumbnail-view-topbar .drop-button .text-description.hover {
    color: #396EFE;
    font-family: AlibabaPuHuiTi-Bold !important;
}
.thumbnail-view-topbar .drop-button .sub-items {
    display: none;
    position: absolute;
    background-color: #fff;
    flex-direction: column;
    z-index: 5000;
    box-shadow: 0px 5px 20px 0px rgba(86, 95, 121, 0.2);
    width: -moz-max-content;
    width: max-content;
    border-radius: 4px;
}
.thumbnail-view-topbar .drop-button .sub-items .show {
    display: flex;
}
.thumbnail-view-topbar .drop-button .sub-items .sub-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 108px;
    height: 24px;
    z-index: 10;
    position: relative;
    cursor: pointer;
}
.thumbnail-view-topbar .drop-button .sub-items .sub-item:first-of-type {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}
.thumbnail-view-topbar .drop-button .sub-items .sub-item:last-of-type {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
}
.thumbnail-view-topbar .drop-button .sub-items .sub-item .text-description {
    flex: auto;
    white-space: wrap;
}
.thumbnail-view-topbar .drop-button .sub-items .sub-item.hover {
    background: #F5F5F5;
}
.thumbnail-view-topbar .drop-button .sub-items .sub-item.current {
    background: #ECF1FF;
}`;

export default styles;