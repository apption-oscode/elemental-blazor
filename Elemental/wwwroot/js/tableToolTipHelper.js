window.initializeToolTip = (element, dotnetHelper) => {
    element.addEventListener('mouseout', () => {
        dotnetHelper.invokeMethodAsync('OnMouseOutHideToolTip');
    });
}