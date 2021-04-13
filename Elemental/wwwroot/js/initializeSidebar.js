window.initializeSidebar = {
    
    initialize: (ref) => {
        ref.addEventListener('mouseover', function () {
            if (document.querySelector('.ae.side-nav').clientWidth <= 56) {
                var rect = ref.getBoundingClientRect();
                ref.querySelector('span').style.top = Math.floor(rect.top) + 'px';
                ref.querySelector('span').classList.add("show");
            }
        }); 
        ref.addEventListener('mouseout', function () {
            if (document.querySelector('.ae.side-nav').clientWidth <= 56) {
                ref.querySelector('span').classList.remove("show");
            }
        }); 
    },

    getInnerHeight: function () {
        return window.innerHeight;
    },
    getInnerWidth: function () {
        return window.innerWidth;
    },
    registerResizeCallback: function () {
        window.addEventListener("resize", initializeSidebar.resized);
    },
    resized: function () {
        //DotNet.invokeMethod("BrowserResize", 'OnBrowserResize');
        DotNet.invokeMethodAsync("Elemental", 'OnBrowserResize').then(data => data);
    }
   
}


