window.walkThroughHelper = {
    walkThrough: function (props) {
        var DotNetReference = props.dotNetReference;

        var steps = props.steps.sort((a, b) => a.order - b.order);

        var popperModifiers = {
            modifiers: [{
                name: 'offset', options: { offset: [0, 3] }
            }, {
                name: 'flip',
                options: {
                    allowedAutoPlacements: ['top', 'bottom', 'right', 'left'],
                }
            }, {
                name: 'eventListeners',
                options: {
                    resize: true,
                    vfdvd:true,
                }
            }]
        }

        const tour = new Shepherd.Tour({
            defaultStepOptions: {
                cancelIcon: {
                    enabled: true
                },
                scrollTo: { behavior: 'smooth', block: 'center' },
                canClickTarget: props.clickable ? true : false,
                popperOptions: popperModifiers
            },
            useModalOverlay: props.overlay ? true : false
        });

        steps.forEach(step => {
            tour.addStep({
                title: step.title,
                text: step.content,
                attachTo: {
                    element: step.id,
                    on: step.position
                },
                buttons: this.getButtons(step.order, steps.length),
                scrollTo: !step.scrollTo ? false : true,
                popperOptions: !step.overlap ? { modifiers: [{ name: 'preventOverflow', options: { altAxis: false } }] } : popperModifiers,
                id: step.id,
                arrow: !step.arrow ? false : true
            })
        });

        tour.on('complete', () => {
            DotNetReference.invokeMethodAsync('WalkthroughCompleted')
        });

        tour.start();
    },
    getButtons: function (stepOrder, numOfSteps) {
        var buttonSet = [];
        if (stepOrder !== 1)
            buttonSet.push({
                action() {
                    return this.back();
                },
                classes: 'shepherd-button-secondary',
                text: 'Back'
            });

        buttonSet.push({
            action() {
                return this.next();
            },
            text: stepOrder == numOfSteps ? "Exit" : "Next"
        })

        return buttonSet;
    }

}