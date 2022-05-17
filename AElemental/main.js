import {
    fastButton,
    fastCheckbox,
    provideFASTDesignSystem,
    accentPalette,
    PaletteRGB,
    SwatchRGB,
} from "@microsoft/fast-components";

import { parseColorHexRGB } from "@microsoft/fast-colors";


provideFASTDesignSystem()
    .withPrefix("ae")
    .register(fastCheckbox())
    .register(fastButton());


        
window.aelemental = {
    accentPalette: accentPalette,
    parseColorHexRGB: parseColorHexRGB,
    SwatchRGB: SwatchRGB,
    PaletteRGB: PaletteRGB,
};