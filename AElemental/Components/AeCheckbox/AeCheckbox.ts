import {css, customElement} from 'lit-element';
import BXCheckbox from 'carbon-web-components/es/components/checkbox/checkbox';


@customElement('ae-checkbox')
class AeCheckbox extends BXCheckbox {
    static get styles() {
        return [
            super.styles,
            css`
                .bx--checkbox-label::before {
                    border-radius: var(--ae-corner-radius, 0);
                    border-color: var(--ae-primary, #161616);
                }
                
                .bx--checkbox-label::after {
                    border-color: var(--ae-text-button, #fff);
                }
                
                .bx--checkbox-label[data-contained-checkbox-state="mixed"]::before, 
                .bx--checkbox-label[data-contained-checkbox-state="true"]::before, 
                .bx--checkbox:checked + .bx--checkbox-label::before, 
                .bx--checkbox:indeterminate + .bx--checkbox-label::before {
                    border-color: var(--ae-primary, #161616);
                    background-color: var(--ae-primary, #161616);
                }
 
            `
        ];
    }
}