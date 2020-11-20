window.modalHelper = {
    scrollTop: null,
    scrollLeft: null,
    lockBodyScrolling: function () {        
        this.scrollTop = document.documentElement.scrollTop;
        this.scrollLeft = document.documentElement.scrollLeft;
        document.getElementsByTagName('html')[0].style.overflowY = 'scroll';
        document.getElementsByTagName('body')[0].style.top = -(document.documentElement.scrollTop) + 'px';        
        document.getElementsByTagName('body')[0].style.position = 'fixed';
        document.getElementsByTagName('body')[0].style.width = '100%';
        document.getElementsByClassName('modal')[0].style.top = -(document.documentElement.scrollTop) + 'px';
        
    },

    unlockBodyScrolling: function () {
        document.getElementsByTagName('html')[0].style.overflowY = 'auto';
        document.getElementsByTagName('body')[0].style.top = 'auto';
        document.getElementsByTagName('body')[0].style.width = 'auto'; // the default for the css property
        document.getElementsByTagName('body')[0].style.position = 'static'; // the default for the css property
        window.scrollTo(this.scrollLeft, this.scrollTop);
    },

    setModalPosition: function () {
    }
}
