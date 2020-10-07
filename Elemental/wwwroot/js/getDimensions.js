//simple script for use with GetDimensionsService.cs
window.getDimensions = function (element) {
  return {
    width: element.clientWidth,
    height: element.clientHeight
  };
};