function BlazorScrollToId(id) {
    const element = document.getElementById(id);
    if (element instanceof HTMLElement) {
    element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
    });
    }
}

ScrollPos = function (element) {
    if (element instanceof HTMLElement) {
        var pos = window.getPositionOnDoc(element);
        window.scrollTo(0, pos.top);
    }
}

