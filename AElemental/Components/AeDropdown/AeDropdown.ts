// @ts-ignore
Blazor.registerCustomEventType('aedropdownselected', {
    browserEventName: 'bx-dropdown-selected',
    createEventArgs: (event:any) => {
        return {
            value: event.detail.item.__value
        };
    }
});