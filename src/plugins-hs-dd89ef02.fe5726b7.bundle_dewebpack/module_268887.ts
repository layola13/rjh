const cssContent = `.carousel-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.carousel-wrap .carousel-imgs-slider {
    flex-grow: 1;
    display: flex;
    width: 100%;
}

.carousel-wrap .carousel-imgs-slider .carousel-prev, 
.carousel-wrap .carousel-imgs-slider .carousel-next {
    height: 100%;
    width: 50px;
    color: #1C1C1C;
    font-size: 20px;
    display: flex;
    align-items: center;
    margin-left: 10px;
    cursor: pointer;
    position: relative;
    z-index: 1;
}

.carousel-wrap .carousel-imgs-slider .carousel-prev {
    margin-right: 10px;
    margin-left: 0px;
    justify-content: flex-start;
}

.carousel-wrap .carousel-imgs-slider .carousel-next {
    justify-content: flex-end;
}

.carousel-wrap .carousel-imgs-slider .carousel-imgs-list {
    width: 782px;
    height: 100%;
    overflow: hidden;
    border-radius: 8px;
    height: 423px !important;
}

.carousel-wrap .carousel-imgs-slider .carousel-imgs-list .carousel-imgs-track {
    height: 100%;
    width: 100%;
    display: flex;
}

.carousel-wrap .carousel-imgs-slider .carousel-imgs-list .carousel-imgs-track > .carousel-img-wrapper {
    position: relative;
}

.carousel-wrap .carousel-imgs-slider .carousel-imgs-list .carousel-imgs-track > .carousel-img-wrapper > img {
    height: 423px !important;
    max-height: 100%;
    position: absolute;
    margin: auto;
    width: auto;
    border-radius: 8px;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
}

.carousel-wrap .carousel-navigation {
    height: 18px;
    flex-shrink: 0;
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    position: absolute;
    bottom: 66px;
}

.carousel-wrap .carousel-navigation > ul {
    height: 6px;
    display: flex;
}

.carousel-wrap .carousel-navigation > ul > li {
    margin: 4px;
    height: 100%;
    width: 6px;
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.2);
    transition: width 0.3s;
    cursor: pointer;
}

.carousel-wrap .carousel-navigation > ul > li.active {
    background: #FFFFFF;
    width: 20px;
}`;

export default cssContent;