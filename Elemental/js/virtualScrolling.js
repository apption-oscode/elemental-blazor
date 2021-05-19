window.virtualScrolling = {    
    getScrollView(ref) {
        return { scrollTop: parseInt(ref.scrollTop), clientHeight: ref.clientHeight };

    }

};