

export function setAccentColor(accentColor) {
    if(window.aelemental){
        let { accentPalette, PaletteRGB, SwatchRGB, parseColorHexRGB } = window.aelemental;
        accentPalette.withDefault(PaletteRGB.create(SwatchRGB.from(parseColorHexRGB(accentColor))));
    }
}