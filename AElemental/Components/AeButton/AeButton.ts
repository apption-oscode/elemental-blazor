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
                    background-color: var(--ae-primary-accent, #0353e9);
                    color: var(--ae-text-button, #fff);
                }
                
                .bx--btn--secondary {
                    background-color: var(--ae-secondary, #39393);
                    color: var(--ae-text-button, #fff);
                }
                .bx--btn--secondary:hover {
                    background-color: var(--ae-secondary-accent, #4c4c4c);
                    color: var(--ae-text-button, #fff);
                }
                
                .bx--btn--tertiary {
                    border-color: var(--ae-tertiary, #0f62fe);
                    color: var(--ae-tertiary, #0f62fe);
                }
                .bx--btn--tertiary:hover {
                    background-color: var(--ae-tertiary-accent, #4c4c4c);
                    color: var(--ae-text-button, #fff);
                }
                
                .bx--btn--ghost {
                    color: var(--ae-text-link, #0f62fe);
                }
                .bx--btn--ghost:hover {
                    background-color: var(--ae-hover-ui, #4c4c4c);
                    color: var(--ae-hover-text-link, #fff); 
                }
                
                .bx--btn--danger {
                    background-color: var(--ae-danger, #39393);
                    color: var(--ae-text-button, #fff);
                }
                .bx--btn--danger:hover {
                    background-color: var(--ae-danger-accent, #4c4c4c);
                    color: var(--ae-text-button, #fff);
                }
                .bx--btn--danger--ghost {
                    color: var(--ae-danger, #fff);
                }
                .bx--btn--danger--ghost:hover {
                    background-color: var(--ae-danger-accent, #4c4c4c);
                    color: var(--ae-text-button, #fff);
                }
                .bx--btn--danger--tertiary {
                    border-color: var(--ae-danger, #4c4c4c);
                    color: var(--ae-danger, #fff);
                }
                .bx--btn--danger--tertiary:hover {
                    background-color: var(--ae-danger-accent, #4c4c4c);
                    color: var(--ae-text-button, #fff);
                }
                
            `
        ];
    }
}