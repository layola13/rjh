function getCroppingWindow(aspectRatio: number): [number, number, number, number] {
    const windowHeight = $(window).height() - 82;
    const cropHeight = 0.7 * windowHeight;
    const cropWidth = cropHeight * aspectRatio;
    const offsetX = $(window).width() / 2 - cropWidth / 2;
    const offsetY = windowHeight / 2 - cropHeight / 2;
    
    return [cropWidth, cropHeight, offsetX, offsetY];
}