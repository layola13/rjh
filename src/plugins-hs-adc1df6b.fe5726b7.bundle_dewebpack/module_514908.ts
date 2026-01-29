const styles = `
.property-bar-rooftypes-wrapper {
    width: 224px;
    max-height: 204px;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #F8F8F8;
    padding: 8px;
    position: relative;
    left: -6px;
    border-radius: 6px;
}

.property-bar-rooftypes-wrapper::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.14);
}

.property-bar-rooftypes-wrapper::-webkit-scrollbar {
    width: 4px;
    height: 5px;
    border-radius: 4px;
    padding-left: 1px;
}

.property-bar-rooftypes-wrapper::-webkit-scrollbar-track {
    border-radius: 20px;
}

.property-bar-rooftypes-container {
    display: flex;
    flex-wrap: wrap;
    width: 208px;
}

.property-bar-rooftypes-container > div {
    position: relative;
    width: 64px;
    height: 86px;
    margin-right: 8px;
}

.property-bar-rooftypes-container > div:nth-child(3n) {
    margin-right: 0px;
}

.property-bar-rooftypes-container > div .roof-img {
    width: 64px;
    height: 64px;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid #EAEBF0;
}

.property-bar-rooftypes-container > div img {
    width: 62px;
    height: 62px;
    cursor: pointer;
    border-radius: 4px;
}

.property-bar-rooftypes-container > div.active .roof-img {
    border: 2px solid #396efe;
}

.property-bar-rooftypes-container > div.active img {
    width: 60px;
    height: 60px;
    cursor: pointer;
}

.property-bar-rooftypes-container > div .roof-name {
    height: 12px;
    line-height: 12px;
    color: #60646F;
    text-align: center;
    margin-top: 4px;
    font-weight: 400;
    font-size: 12px;
}

.property-bar-rooftypes-container > div .roof-name.roof-name-mask {
    color: #A8A9AC;
}

.property-bar-rooftypes-container > div .text-ellipsis {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.property-bar-rooftypes-container > div .mask {
    position: absolute;
    width: 64px;
    height: 64px;
    box-sizing: border-box;
    border-radius: 4px;
    top: 0;
    left: 0;
    cursor: no-drop;
    background: rgba(248, 248, 248, 0.7);
}

.property-bar-rooftypes-container > div .roof-vip {
    position: absolute;
    top: -5px;
    left: 44px;
}

.property-bar-rooftypes-container > div .roof-vip img {
    width: 23px;
    height: 18px;
}

.roof-type-tip-txt-warp-2 {
    max-width: 220px;
}

.roof-type-tip-txt-warp-0 {
    max-width: 130px;
}
`;

export default styles;