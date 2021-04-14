//simple script that checks if current browser is internet explorer
window.isInternetExplorer = () => {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    return (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))
};