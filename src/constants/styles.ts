import { FONTS } from "./assets";

export const COLORS = {
    WHITE: '#FFFFFF',
    BLACK: '#000000',
    BLACK_025: '#00000040',
    GRAY_DEFAULT: '#46484B',
    GRAY_DEFAULT_DARKER: '#646565',
    GRAY_MEDIUM: '#9DA5B9',
    GRAY_LIGHT: '#F6F8FF',
    GRAY_LIGHT_DARKER: '#DDDDDD',
    DISABLED_DEFAULT: '#DFE6ED',
    OPYA_BLUE: '#2162E3',
    OPYA_VIOLET: '#1745D5',
    MAIN_DEFAULT: '#313342',
    SECONDARY_LIGHT: '#62698B',
    ALERT_DEFAULT: '#D15686',
    ALERT_LIGHT: '#FFD0E2',
  };

  const FONTS_TYPES = {
    BLACK: 'Black',
    BLACK_ITALIC: 'BlackItalic',
    BOLD: 'Bold',
    BOLD_ITALIC: 'BoldItalic',
    HAIR_LINE: 'HairLine',
    HAIR_LINE_ITALIC: 'HairLineItalic',
    HEAVY: 'Heavy',
    HEAVY_ITALIC: 'HeavyItalic',
    ITALIC: 'Italic',
    LIGHT: 'Light',
    LIGHT_ITALIC: 'LightItalic',
    MEDIUM: 'Medium',
    MEDIUM_ITALIC: 'MediumItalic',
    REGULAR: 'Regular',
    SEMI_BOLD: 'SemiBold',
    SEMI_BOLD_ITALIC: 'SemiBoldItalic',
    THIN: 'Thin',
    THIN_ITALIC: 'ThinItalic',
  };


  export const STYLES = {
    FONT_FAMILY: {
      LATO_REGULAR: `${FONTS.LATO}-${FONTS_TYPES.REGULAR}`,
      LATO_BOLD: `${FONTS.LATO}-${FONTS_TYPES.BOLD}`,
    },
    FONT_SIZE: {
      PARAGRAPH: 14,
      SMALL_PARAGRAPH: 12,
      MEDIUM_PARAGRAPH: 16,
      INTERMEDIUM_PARAGRAPH: 18,
      LARGE_PARAGRAPH: 20,
    },
  };
  

