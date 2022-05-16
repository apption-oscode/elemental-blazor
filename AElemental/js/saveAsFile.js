window.saveAsFile = (filename, bytesBase64) => {
    if (navigator.msSaveBlob) {
        //Download document in Edge
        var _blazorDownloadFileData = atob(bytesBase64);
        var _blazorDownloadFileBytes = new Uint8Array(_blazorDownloadFileData.length);
        for (var i = 0; i < _blazorDownloadFileData.length; i++) {
            {
                _blazorDownloadFileBytes[i] = _blazorDownloadFileData.charCodeAt(i);
            }
        }
        _blazorDownloadFileData = null;
        var _blazorDownloadFileBlob = new Blob([_blazorDownloadFileBytes.buffer], { type: "application/octet-stream" });
        _blazorDownloadFileBytes = null;
        navigator.msSaveBlob(_blazorDownloadFileBlob, filename);
        _blazorDownloadFileBlob = null;
    }
    else {
        //Download document in other browsers
        var link = document.createElement('a');
        link.download = filename;
        link.href = "data:application/octet-stream;base64," + bytesBase64;
        document.body.appendChild(link); // Needed for Firefox
        link.click();
        document.body.removeChild(link);
    }

}