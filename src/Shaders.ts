import { OutputBuffer } from './Root';

/**
 * The type of output buffer pixels
 */
export type BufferPixel = string | null | undefined;
/** dts2md break */
/**
 * A shader returns the pixel result
 * to be put at a given position
 * @param x the x position of the pixel
 * @param y the y position of the pixel
 * @param current current pixel in the buffer
 * @param buffer current buffer
 * @returns the result pixel
 */
export type Shader = (
    x: number,
    y: number,
    current: BufferPixel,
    buffer: OutputBuffer
) => BufferPixel;
/** dts2md break */
/**
 * This namespace contains the built-in shader generators
 * which help you easily create common shaders
 */
export namespace Shaders {
    /** dts2md break */
    /**
     * Create a shader that always returns the given string
     */
    export const Pure = (charactor: string): Shader => (
        () => charactor
    );
    /** dts2md break */
    /**
     * The type of the options for `Shaders.Pattern`
     */
    export type PatternOptions = Partial<{
        /**
         * Whether to repeat the pattern horizontally
         * @default true
         */
        repeatX: boolean;
        /**
         * Whether to repeat the pattern vertically
         * @default true
         */
        repeatY: boolean;
    }>;
    /** dts2md break */
    /**
     * Create a shader that shades the given pattern
     * @param pattern an array of strings or string arrays describing the pattern
     * @param options optional options
     * @example
     * ```js
     * // expect:
     * // 01010101...
     * // 01010101...
     * // 01010101...
     * // ...
     * const patternA = Shaders.Pattern(['01']);
     *
     * // expect:
     * // 01010101...
     * // 10101010...
     * // 01010101...
     * // ...
     * const patternB = Shaders.Pattern(['01', '10']);
     *
     * // expect:
     * // \/\/\/\/...
     * // /\/\/\/\...
     * // \/\/\/\/...
     * // ...
     * const patternC = Shaders.Pattern([
     *     ['\\', '/'],
     *     ['/', '\\'],
     * ]);
     * ```
     */
    export const Pattern = (
        pattern: (string | string[])[],
        options?: PatternOptions
    ): Shader => {
        const _options = { ...patternDefaults, ...options },
            patternHeight = pattern.length;
        let patternWidth = 1;
        pattern.forEach(patternLine => {
            if (patternLine.length > patternWidth) {
                patternWidth = patternLine.length;
            }
        });
        return (x: number, y: number) => {
            let result;
            if (y < patternHeight) {
                if (x < patternWidth) {
                    result = pattern[y][x];
                } else if (_options.repeatX) {
                    result = pattern[y][x % patternWidth];
                }
            } else if (_options.repeatY) {
                const j = y % patternHeight;
                if (x < patternWidth) {
                    result = pattern[j][x];
                } else if (_options.repeatX) {
                    result = pattern[j][x % patternWidth];
                }
            }
            return result;
        };
    };
    /** dts2md break */
    /**
     * Defaults of the options for `Shaders.Pattern`
     */
    export const patternDefaults: Required<PatternOptions> = {
        repeatX: true,
        repeatY: true,
    };

}
