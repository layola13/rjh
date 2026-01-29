const styles = `.select-channel-wrapper {
    position: relative;
}

.select-channel-wrapper .select-node {
    display: flex;
    align-items: center;
    background: #F7F7F7;
    border: 0.5px solid #c3c6d1;
    box-sizing: border-box;
    height: 60px;
    border-radius: 8px;
    transition: all 0.25s linear;
}

.select-channel-wrapper .select-node:hover {
    background-color: #FFFFFF;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
}

.select-channel-wrapper .select-node .channel-item {
    flex: auto;
}

.select-channel-wrapper .select-node .jiantou {
    height: -moz-max-content;
    height: max-content;
    width: 40px;
    padding-left: 10px;
    flex: none;
}

.select-channel-wrapper.visible .select-node {
    background-color: #fff;
}

.select-channel-overlay {
    z-index: 99999999 !important;
}

.select-items {
    background: #FFFFFF;
    border-radius: 8px;
    border: 1px solid #c3c6d1;
    box-shadow: 0px 5px 50px 0px rgba(0, 0, 0, 0.1);
    max-height: 180px;
    overflow: auto;
    width: 350px;
}

.select-items .select-channel-item-wrapper {
    padding-right: 40px;
    background: #fff;
    height: 60px;
    box-sizing: border-box;
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    transition: all 0.25s linear;
}

.select-items .select-channel-item-wrapper:not(:last-of-type) {
    border-bottom: 0.5px solid #E8EBF2;
}

.select-items .select-channel-item-wrapper:hover {
    background: #F7F7F7;
}

.channel-item {
    padding-left: 6px;
    display: flex;
    align-items: center;
    font-size: 1;
    overflow: hidden;
    flex: auto;
}

.channel-item .channel-image {
    width: 48px;
    height: 48px;
    -o-object-fit: cover;
    object-fit: cover;
    border-radius: 8px;
    flex: none;
    margin-right: 10px;
    background-color: #DEDEDE;
}

.channel-item .channel-info {
    flex: auto;
    overflow: hidden;
}

.channel-item .channel-info .channel-title {
    color: #33353B;
    font-size: 14px;
    line-height: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 8px;
}

.channel-item .channel-info .channel-shop {
    display: flex;
    justify-content: space-between;
}

.channel-item .channel-info .channel-shop .channel-site {
    flex-grow: 0;
    flex-shrink: 1;
    display: flex;
    align-items: flex-end;
}

.channel-item .channel-info .channel-shop .channel-site .site-icon {
    width: 20px;
    height: 20px;
    border-radius: 10px;
    vertical-align: middle;
    background-color: #DEDEDE;
}

.channel-item .channel-info .channel-shop .channel-site .size-name {
    margin-left: 4px;
    font-size: 14px;
    line-height: 20px;
    vertical-align: middle;
}

.channel-item .channel-info .channel-shop .channel-price {
    font-size: 14px;
    color: #33353B;
}`;

export default styles;