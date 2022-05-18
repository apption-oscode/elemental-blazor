import {
    fastButton,
    fastCheckbox,

    provideFASTDesignSystem,
    neutralPalette,
    accentPalette,
    PaletteRGB,
    controlCornerRadius,
    bodyFont,
    strokeWidth,
    baseHeightMultiplier,
    baseHorizontalSpacingMultiplier,
    disabledOpacity,
    baseLayerLuminance,
    SwatchRGB,
    density,
} from "@microsoft/fast-components";

import {parseColorHexRGB} from "@microsoft/fast-colors";


provideFASTDesignSystem()
    .withPrefix("ae")
    .register(
        fastCheckbox(),
        fastButton()
    );


let datahunterOptions = {
    // The size of the corners in px
    cornerRadius: 3,

    // The brightness of the base layer (0 dark to 1 light)
    baseLayerLuminance: 1,

    // The opacity of the disabled state (0 transparent to 1 opaque)
    disabledOpacity: .3,

    // The base accent color
    accentColor: "#075985",
    
    // The base neutral color
    neutralColor: "#334155",

    bodyFont: "'Ropa Sans', Roboto, sans-serif",
    
    designUnit: 4,
    density: 1,
    baseHeightMultiplier: 8,
    baseHorizontalSpacingMultiplier: 6,
    outlineWidth: 1
};


window.aelemental = {
    ...window.aelemental,
    ...{
        accentPalette: accentPalette,
        parseColorHexRGB: parseColorHexRGB,
        SwatchRGB: SwatchRGB,
        PaletteRGB: PaletteRGB,
        themeOptions: datahunterOptions,
    }
};

setAElementalThemeOptions(window.aelemental.themeOptions);

// setRandomOptions();

function setAElementalThemeOptions(options) {
    baseLayerLuminance.withDefault(options.baseLayerLuminance);

    neutralPalette.withDefault(PaletteRGB.create(SwatchRGB.from(parseColorHexRGB(options.neutralColor))));
    accentPalette.withDefault(PaletteRGB.create(SwatchRGB.from(parseColorHexRGB(options.accentColor))));
    strokeWidth.withDefault(options.outlineWidth);
    
    controlCornerRadius.withDefault(options.cornerRadius);
    density.withDefault(options.density);
    baseHeightMultiplier.withDefault(options.baseHeightMultiplier);
    baseHorizontalSpacingMultiplier.withDefault(options.baseHorizontalSpacingMultiplier);
    disabledOpacity.withDefault(options.disabledOpacity);
    bodyFont.withDefault(options.bodyFont);
}

function setRandomOptions() {
    setInterval(() => controlCornerRadius.withDefault(randomIntFromInterval(0, 12)), 7);
    setInterval(() => baseLayerLuminance.withDefault(randomFloatTwoDecimal(0, 1)), 13);
    setInterval(() => density.withDefault(randomIntFromInterval(0, 4)), 17);
    setInterval(() => neutralPalette.withDefault(PaletteRGB.create(SwatchRGB.from(parseColorHexRGB(randomColor())))), 23);
    setInterval(() => accentPalette.withDefault(PaletteRGB.create(SwatchRGB.from(parseColorHexRGB(randomColor())))), 31);
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomFloatTwoDecimal(min, max){
    return randomIntFromInterval(min +10, max +10) / 100;
}

function randomColor(){
    return `#${Math.floor(Math.random()*16777215).toString(16)}`;
}
