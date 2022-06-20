// @ts-ignore
Blazor.registerCustomEventType('aeselectselected', {
    browserEventName: 'bx-select-selected',
    createEventArgs: (event:any) => {
        return {
            value: event.detail.value
        };
    }
});