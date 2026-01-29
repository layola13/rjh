const styles = `.grid-viewer-pagination {
    right: 40px;
    height: 25px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    position: relative;
    margin: 12px 0 0 0;
    padding: 0;
}
.grid-viewer-pagination.hide {
    visibility: hidden;
}
.grid-viewer-pagination .prev-button, 
.grid-viewer-pagination .next-button {
    position: relative;
    width: 20px;
    height: 20px;
    box-sizing: border-box;
    background: transparent;
    border-radius: 50%;
    margin: 0 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
}
.grid-viewer-pagination .prev-button:hover, 
.grid-viewer-pagination .next-button:hover {
    cursor: pointer;
}
.grid-viewer-pagination .prev-button:active, 
.grid-viewer-pagination .next-button:active {
    color: #1C1C1C;
    background: #ffffff;
}
.grid-viewer-pagination .page-item.current {
    background-color: #404040;
    color: #ffffff;
    font-weight: 600;
}
.grid-viewer-pagination .prev-button.disable, 
.grid-viewer-pagination .next-button.disable {
    cursor: default;
    color: #d8d8d8;
}
.grid-viewer-pagination .prev-button.disable:hover, 
.grid-viewer-pagination .next-button.disable:hover {
    background: transparent;
}
.grid-viewer-pagination .prev-button.disable:active, 
.grid-viewer-pagination .next-button.disable:active {
    color: #d8d8d8;
    background: transparent;
}
.grid-viewer-pagination .page-item {
    height: 20px;
    border-radius: 50%;
    line-height: 20px;
    min-width: 20px;
    max-width: 42px;
    padding: 0 4px;
    margin: 1px 6px;
    background: transparent;
    box-sizing: border-box;
    font-size: 14px;
    font-weight: 200;
    text-align: center;
    color: rgba(255, 255, 255, 0.84);
    cursor: pointer;
}
.grid-viewer-pagination .page-item:hover {
    background-color: #404040;
}
.grid-viewer-pagination .page-item:active {
    background-color: #404040;
    color: #ffffff;
    font-weight: 600;
}
.grid-viewer-pagination .ellipsis-icon {
    margin: 1px 6px;
    width: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(255, 255, 255, 0.84);
    font-size: 14px;
}
.grid-viewer-pagination .pagation-icon {
    color: rgba(255, 255, 255, 0.84);
}
.grid-viewer-pagination .pagation-icon:active {
    background-color: #ffffff;
    font-weight: 600;
}`;

export default styles;