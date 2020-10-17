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
    },

    unlockBodyScrolling: function () {
        document.getElementsByTagName('body')[0].style.position = 'static' // the default for the css property
        document.getElementsByTagName('html')[0].style.overflowY = 'auto';
        window.scrollTo(this.scrollLeft, this.scrollTop);
    },

    setModalPosition: function () {
        document.getElementsByClassName('modal')[0].style.top = -(document.documentElement.scrollTop) + 'px';
    }
}
