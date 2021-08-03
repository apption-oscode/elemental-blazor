//simple script for use with GetDimensionsService.cs
window.getDimensions = function (element) {
  return {
    width: element.clientWidth,
    height: element.clientHeight
  };
};

window.getPosition = function (element) {    
    var rect = element.getBoundingClientRect();
    return {
        top: Math.floor(rect.top),
        left: Math.floor(rect.left),
        bottom: Math.floor(rect.bottom),
        right: Math.floor(rect.right)
    };
};

window.getPositionOnDoc = function (element) {
    var rect = window.getPosition(element)
    return {
        top: Math.floor(rect.top + window.pageYOffset),
        left: Math.floor(rect.left + window.pageXOffset),
        bottom: Math.floor(rect.bottom + window.pageYOffset),
        right: Math.floor(rect.right + window.pageXOffset)
    };
};

window.setZIndex = function (element, zIndex) {
    element.style.zIndex = zIndex;
}
