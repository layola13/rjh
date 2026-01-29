const cssContent = `.switch-language {
    position: relative;
    display: block;
}
.switch-language svg {
    width: 1em;
    height: 1em;
    vertical-align: middle;
}
.switch-language > span {
    display: inline-block;
    vertical-align: middle;
    margin-left: 0.7em;
}
.switch-language .pointer {
    cursor: pointer;
}
.switch-language .pointer:hover {
    background-color: #e1eff9;
}
.switch-language li {
    border-left: #efefef solid 1px;
    border-right: #efefef solid 1px;
    background-color: white;
    height: 2.35714em;
    padding-left: 1em;
    color: #333333;
    fill: #333333;
    padding-top: 0.5em;
}
.switch-language li:first-child {
    border-top: #efefef solid 1px;
}
.switch-language li:last-child {
    border-bottom: #efefef solid 1px;
}
.switch-language li span {
    display: block;
    height: 1em;
    line-height: 1em;
    padding-top: 0.5em;
}
.switch-language .region-list {
    position: absolute;
    top: 100%;
    left: 0px;
    z-index: 1000;
}
.switch-language .region-item {
    min-width: 10em;
    width: 100%;
    position: relative;
}
.switch-language .region-item > span {
    clear: none;
    float: left;
}
.switch-language .region-item > svg {
    float: right;
    clear: none;
    width: 0.6em;
    height: 0.6em;
    padding-top: 0.7em;
    margin-right: 1em;
}
.switch-language .region-item.selected > svg * {
    fill: white;
}
.switch-language .region-item.selected > span {
    color: white;
}
.switch-language .hide-region-list .region-item {
    width: 0px;
    visibility: hidden;
    border: 0;
}
.switch-language .hide-region-list .region-item > UL.lang-list {
    left: 0px;
}
.switch-language li.selected {
    background-color: #55acee;
    cursor: default;
}
.switch-language .lang-list {
    position: absolute;
    top: -1px;
    left: 100%;
    min-width: 8em;
    visibility: visible;
}`;

export default cssContent;