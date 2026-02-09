/**
 * Maps ISO 639-3 (3-letter) codes from our languages record
 * to ConvertAPI's OCR language codes.
 * 
 * ConvertAPI supported values:
 * ar ca zh-cn zh-tw da nl en fi fa de el he it ja ko lt no pl pt ro ru sl es sv tr ua th
 */
export const CONVERTAPI_LANGUAGE_MAP: Record<string, string> = {
    ara: 'ar',      // Arabic
    cat: 'ca',      // Catalan
    zho: 'zh-cn',   // Chinese (Simplified) — default mapping
    dan: 'da',      // Danish
    nld: 'nl',      // Dutch
    eng: 'en',      // English
    fin: 'fi',      // Finnish
    fas: 'fa',      // Persian/Farsi
    deu: 'de',      // German
    ell: 'el',      // Greek
    heb: 'he',      // Hebrew
    ita: 'it',      // Italian
    jpn: 'ja',      // Japanese
    kor: 'ko',      // Korean
    lit: 'lt',      // Lithuanian
    nor: 'no',      // Norwegian
    pol: 'pl',      // Polish
    por: 'pt',      // Portuguese
    ron: 'ro',      // Romanian
    rus: 'ru',      // Russian
    slv: 'sl',      // Slovenian
    spa: 'es',      // Spanish
    swe: 'sv',      // Swedish
    tur: 'tr',      // Turkish
    ukr: 'ua',      // Ukrainian
    tha: 'th',      // Thai
};

/** Set of all supported 3-letter codes */
export const SUPPORTED_OCR_LANGUAGES = new Set(Object.keys(CONVERTAPI_LANGUAGE_MAP));

/** Validate and convert 3-letter codes to ConvertAPI codes */
export function mapToConvertApiLangs(iso3Codes: string[]): {
    valid: boolean;
    convertApiCodes: string[];
    unsupportedCodes: string[];
} {
    const convertApiCodes: string[] = [];
    const unsupportedCodes: string[] = [];

    for (const code of iso3Codes) {
        const mapped = CONVERTAPI_LANGUAGE_MAP[code];
        if (mapped) {
            convertApiCodes.push(mapped);
        } else {
            unsupportedCodes.push(code);
        }
    }

    return {
        valid: unsupportedCodes.length === 0,
        convertApiCodes,
        unsupportedCodes,
    };
}