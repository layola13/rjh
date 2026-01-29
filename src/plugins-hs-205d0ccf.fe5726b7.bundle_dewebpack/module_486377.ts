const cssContent = `.filter-panel {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.filter-panel .dropdown-btn {
    box-sizing: border-box;
    background-color: transparent;
    border: 0;
    color: rgba(255, 255, 255, 0.86);
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    height: 24px;
    padding: 0 7px;
    border-radius: 12px;
}

.filter-panel .dropdown-btn span {
    max-width: 90%;
    display: inline-block;
    font-size: 12px;
    margin-right: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: auto;
}

.filter-panel .dropdown-btn .hs-iconfont-view {
    width: 8px;
}

.filter-panel .dropdown-btn:hover,
.filter-panel .dropdown-btn:focus {
    background-color: #222222;
    color: #ffffff;
}

.spark-filter-panel.menu-item {
    width: 136px;
    color: rgba(255, 255, 255, 0.86);
    text-align: center;
    box-sizing: border-box;
    border-radius: 0;
    padding: 7px 12px;
    font-size: 12px;
}

.spark-filter-panel.menu-item:hover {
    background-color: #222222;
    color: #ffffff;
}

.spark-filter-panel.menu-items {
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    box-shadow: none;
    transform: translateY(-5px);
    background-color: #2B2C2E;
    margin-top: 4px;
}

.spark-filter-panel.menu-items:before {
    box-shadow: none;
}`;

export default cssContent;