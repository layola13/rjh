const cssContent = `.style-selector-wrapper {
    width: 110px;
    padding: 10px;
    font-size: 12px;
    box-sizing: border-box;
}
.style-selector-wrapper > div {
    width: 100%;
}
.style-selector-wrapper .style-selector-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
}
.style-selector-wrapper .style-selector-header .style-selector-close {
    display: inline-block;
    width: 11px;
    height: 11px;
    background: url(${require('./close-icon.png')}) center / 11px no-repeat;
    cursor: pointer;
}
.style-selector-wrapper .style-selector-header .style-selector-label {
    color: #FAFAFA;
}
.style-selector-wrapper .style-selector-body {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 6px;
}
.style-selector-wrapper .style-selector-body > .style-selector-type {
    display: inline-block;
    width: 40px;
    height: 20px;
    line-height: 20px;
    color: #fff;
    text-align: center;
    background: rgba(150, 150, 155, 0.5);
    box-sizing: border-box;
    margin-bottom: 6px;
    border-radius: 50px;
    cursor: pointer;
}
.style-selector-wrapper .style-selector-body > .style-selector-type:not(:nth-child(2n)) {
    margin-right: 5px;
}
.style-selector-wrapper .style-selector-body > .style-selector-type.style-selector-selected {
    background: #fff;
    color: #396EFE;
}
.style-selector-wrapper .style-selector-footer > button {
    width: 100%;
    padding: 0;
    background: #396EFE;
    text-align: center;
    color: #fff;
    outline: none;
    border: none;
    height: 20px;
    border-radius: 50px;
}`;

export default cssContent;