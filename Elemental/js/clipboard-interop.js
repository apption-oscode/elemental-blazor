window.BlazorClipboadInterop = window.BlazorClipboadInterop || {};

window.BlazorClipboadInterop.ListeningForPasteEvents = function (element, dotNetObject) {
    element.addEventListener('paste', function (e) { BlazorClipboadInterop.pasteEvent(e, dotNetObject) });
};

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

window.BlazorClipboadInterop.pasteEvent =
    async function (e, dotNetObject) {

        var data = await navigator.clipboard.read();
        var items = []; //is passed to C#

        for (let i = 0; i < data.length; i++) {
            var item = {};
            items.push(item);
            for (let j = 0; j < data[i].types.length; j++) {

                const type = data[i].types[j];

                const blob = await data[i].getType(type);
                if (blob) {

                    if (type.startsWith("text") == true) {
                        const content = await blob.text();
                        item[type] = content;
                    }
                    else {
                        item[type] = await toBase64(blob);
                    }
                }
            }
        }

        await dotNetObject.invokeMethodAsync('Pasted', items);
        e.preventDefault();
    }
