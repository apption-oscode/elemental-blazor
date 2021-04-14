window.initHighlight = () => {
    document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
    });
}