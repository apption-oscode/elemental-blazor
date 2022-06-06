import {css, customElement} from 'lit-element';
import BXButton from 'carbon-web-components/es/components/button/button';

@customElement('ae-btn')
class AeButton extends BXButton {
    static get styles() {
        return [
            super.styles,
            css`
                .bx--btn {
                    border-radius: var(--ae-corner-radius, 0);
                }
                .bx--btn--primary {
                    background-color: var(--ae-primary, #0f62fe);
                    color: var(--ae-text-button, #fff);
                }
                .bx--btn--primary:hover {
                    background-color: var(--ae-hover-primary, #0353e9);
                    color: var(--ae-text-button,#fff);
                }
                
                .bx--btn--secondary {
                    background-color: var(--ae-secondary, #39393);
                    color: var(--ae-text-button, #fff);
                }
                .bx--btn--secondary:hover {
                    background-color: var(--ae-hover-secondary, #4c4c4c);
                    color: var(--ae-text-button,#fff);
                }
                
                .bx--btn--tertiary {
                    border-color: var(--ae-tertiary, #0f62fe);
                    color: var(--ae-tertiary, #0f62fe);
                }
                .bx--btn--tertiary:hover {
                    background-color: var(--ae-hover-tertiary, #4c4c4c);
                    color: var(--ae-text-button,#fff);
                }
                
                .bx--btn--ghost {
                    border-color: var(--ae-ghost, #0f62fe);
                    color: var(--ae-tertiary, #0f62fe);
                }
                .bx--btn--ghost:hover {
                    background-color: var(--ae-hover-ghost, #4c4c4c);
                    color: var(--ae-text-button,#fff);
                }
            `
        ];
    }
}