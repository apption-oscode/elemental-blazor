import {css, customElement} from 'lit-element';
import BXButton from 'carbon-web-components/es/components/button/button';

@customElement('ae-btn')
class AEButton extends BXButton {
    static get styles() {
        return [
            super.styles,
            css`
                .bx--btn {
                    border-radius: var(--ae-corner-radius, 0);
                }
            `
        ];
    }
}

customElements.define('ae-btn', AEButton);
