import {
    fastButton,
    fastCheckbox,

    provideFASTDesignSystem,
    neutralPalette,
    accentPalette,
    PaletteRGB,
    StandardLuminance,
    controlCornerRadius,
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
    cornerRadius: 8,

    // The brightness of the base layer (0 dark to 1 light)
    baseLayerLuminance: 1,

    disabledOpacity: "30%",

    accentColor: "#2563eb",

    designUnit: 4,
    density: 4,
    baseHeightMultiplier: 10,
    baseHorizontalSpacingMultiplier: 3,
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

// setAElementalThemeOptions(window.aelemental.themeOptions);

setRandomOptions();

function setAElementalThemeOptions(options) {

    controlCornerRadius.withDefault(options.cornerRadius);
    baseLayerLuminance.withDefault(options.baseLayerLuminance);

    density.withDefault(options.density);
    neutralPalette.withDefault(PaletteRGB.create(SwatchRGB.from(parseColorHexRGB("#0078D4"))));
    accentPalette.withDefault(PaletteRGB.create(SwatchRGB.from(parseColorHexRGB(options.accentColor))));

    // let value = 0;
    // baseLayerLuminance.withDefault(value);
    // setInterval(() => baseLayerLuminance.withDefault(value += .1), 1000);

    // baseLayerLuminance.withDefault(StandardLuminance.LightMode);
}

function setRandomOptions() {
    setInterval(() => controlCornerRadius.withDefault(randomIntFromInterval(0, 12)), 1000);
    setInterval(() => baseLayerLuminance.withDefault(randomFloatTwoDecimal(0, 1)), 1000);
    setInterval(() => density.withDefault(randomIntFromInterval(0, 4)), 1000);
    setInterval(() => neutralPalette.withDefault(PaletteRGB.create(SwatchRGB.from(parseColorHexRGB(randomColor())))), 1000);
    setInterval(() => accentPalette.withDefault(PaletteRGB.create(SwatchRGB.from(parseColorHexRGB(randomColor())))), 1000);
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
